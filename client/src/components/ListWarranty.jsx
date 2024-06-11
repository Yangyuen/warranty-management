import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';



const ListWarranty = ({ onEdit }) => {
    const { listWarranty, deleteWarranty, searchWarranty, url, calculateRemainingDays } = useStore();
    const [warranties, setWarranties] = useState([]);
    const [showPrFile, setShowPrFile] = useState(false);
    const [showPoFile, setShowPoFile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handlePrClick = (url) => {
        setShowPrFile(showPrFile === url ? '' : url);
    };

    const handlePoClick = (url) => {
        setShowPoFile(showPoFile === url ? '' : url);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listWarranty();
                setWarranties(data || []); // ตรวจสอบและตั้งค่าให้เป็นอาร์เรย์ว่างถ้า data เป็น undefined หรือ null
            } catch (error) {
                console.error('Error fetching warranties:', error);
                setWarranties([]); // ตั้งค่าเป็นอาร์เรย์ว่างในกรณีเกิดข้อผิดพลาด
            }
        };

        fetchData();
    }, [listWarranty]);

    // Delete
    const handleDelete = async (id) =>{
        try {
            await deleteWarranty(id);
            setWarranties(warranties.filter(warranty => warranty._id !== id));
        } catch (error) {
            console.error('Error deleting warranty',error);
        }
    }

    // Search
    const handleSearch = async () =>{
        try {
            const data = await searchWarranty(searchQuery);
            setWarranties(data || []);
        } catch (error) {
            console.error('Error searching warranty:',error);
            setWarranties([]);
        }
    }
    const handleEdit = (warranty) => {
        onEdit(warranty);
        navigate('/add-warranty');
    }
    return (
        <div className=" max-w-full mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Warranty List</h1>
            <div className='mb-4'>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch(e.target.value)
                    }}
                    placeholder='Search warranties...'
                    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button onClick={handleSearch} className='w-full p-2 bg-blue-600 text-white rounded-lg mt-2 hover:bg-blue-700 transition duration-300'>Search</button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 border-b text-center text-gray-700">Product Name</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">Vendor</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">Price</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">PR</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">PO</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">Expire Date</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">Remaining Days</th>
                        <th className="py-3 px-4 border-b text-center text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warranties.map((item, index) => (
                        <tr key={index} className="text-center even:bg-gray-50">
                            <td className="py-3 px-4 border-b text-left">{item.productName}</td>
                            <td className="py-3 px-4 border-b">{item.vendor}</td>
                            <td className="py-3 px-4 border-b">{item.price}</td>
                            <td className="py-3 px-4 border-b" onClick={() => handlePrClick(item.prFile)}>
                                {item.pr}
                                {showPrFile === item.prFile && (
                                    <a href={`${url}/${item.prFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">View PR</a>
                                )}
                            </td>
                            <td className="py-3 px-4 border-b" onClick={() => handlePoClick(item.poFile)}>
                                {item.po}
                                {showPoFile === item.poFile && (
                                    <a href={`${url}/${item.poFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">View PO</a>
                                )}
                            </td>
                            <td className="py-3 px-4 border-b">{new Date(item.expireDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-gray-500 border-b">{calculateRemainingDays(item.expireDate)} Days</td>
                            <td className="py-3 px-4 border-b flex justify-center space-x-2">
                                <button 
                                    onClick={() => handleDelete(item._id)} 
                                    className="text-white bg-red-600 hover:bg-red-700 font-semibold py-2 px-4 w-24 rounded-lg transition duration-300"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => handleEdit(item)} 
                                    className="text-white bg-yellow-600 hover:bg-yellow-700 font-semibold py-2 px-4 w-24 rounded-lg transition duration-300"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ListWarranty;
