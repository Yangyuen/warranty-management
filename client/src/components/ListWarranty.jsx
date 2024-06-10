import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';



const ListWarranty = ({ onEdit }) => {
    const { listWarranty, deleteWarranty, searchWarranty, url } = useStore();
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
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Warranty List</h1>
            <div className='mb-4'>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    placeholder='Search warranties...'
                    className='w-full p-2 border rounded'
                />
                <button onClick={handleSearch} className='w-full p-2 bg-blue-600 text-white rounded mt-2'>Search</button>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product Name</th>
                        <th className="py-2 px-4 border-b">Vendor</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">PR</th>
                        <th className="py-2 px-4 border-b">PO</th>
                        <th className="py-2 px-4 border-b">Expire Date</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warranties.map((item, index) => (
                        <tr key={index} className="text-center">
                            <td className="py-2 px-4 border-b">{item.productName}</td>
                            <td className="py-2 px-4 border-b">{item.vendor}</td>
                            <td className="py-2 px-4 border-b">{item.price}</td>
                            <td className="py-2 px-4 border-b" onClick={() => handlePrClick(item.prFile)}>
                            {item.pr}
                                {showPrFile === item.prFile && (
                                    <a href={`${url}/${item.prFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">View PR</a>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b" onClick={() => handlePoClick(item.poFile)}>
                            {item.po}
                                {showPoFile === item.poFile && (
                                    <a href={`${url}/${item.poFile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">View PO</a>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">{new Date(item.expireDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleDelete(item._id)} className="text-red-600">Delete</button>
                                <button onClick={() => handleEdit(item)} className="text-yellow-600 ml-2">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListWarranty;
