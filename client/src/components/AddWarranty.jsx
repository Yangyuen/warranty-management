import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddWarranty = ({ warrantyToEdit }) => {
    const { addWarranty, updateWarranty } = useStore();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [vendor, setVendor] = useState('');
    const [price, setPrice] = useState('');
    const [pr, setPr] = useState('');
    const [po, setPo] = useState('');
    const [prFile, setPrFile] = useState(null);
    const [poFile, setPoFile] = useState(null);
    const [expireDate, setExpireDate] = useState('');

    useEffect(() => {
        if (warrantyToEdit) {
            setProductName(warrantyToEdit.productName);
            setVendor(warrantyToEdit.vendor);
            setPrice(warrantyToEdit.price);
            setPr(warrantyToEdit.pr);
            setPo(warrantyToEdit.po);
            setExpireDate(new Date(warrantyToEdit.expireDate).toISOString().split('T')[0]);
        }
    }, [warrantyToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !vendor || !price || !pr || !po || !expireDate) {
            alert("Please fill out all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('vendor', vendor);
        formData.append('price', price);
        formData.append('pr', pr);
        formData.append('po', po);
        formData.append('expireDate', expireDate);

        if (prFile) {
            formData.append('prFile', prFile);
        } else if (warrantyToEdit && warrantyToEdit.prFile) {
            formData.append('prFile', warrantyToEdit.prFile);
        }

        if (poFile) {
            formData.append('poFile', poFile);
        } else if (warrantyToEdit && warrantyToEdit.poFile) {
            formData.append('poFile', warrantyToEdit.poFile);
        }

        try {
            if (warrantyToEdit) {
                await updateWarranty(warrantyToEdit._id, formData);
                toast.success('Warranty updated successfully!')
            } else {
                await addWarranty(formData);
                toast.success('Warranty added successfully!');
            }
            setProductName('');
            setVendor('');
            setPrice('');
            setPr('');
            setPo('');
            setPrFile(null);
            setPoFile(null);
            setExpireDate('');

            navigate('/');
        } catch (error) {
            toast.error('Error adding/updating warranty:', error);
            alert("Failed to add/update warranty. Please try again.");
        }
    };

    const handleImport =()=>{
        navigate('/import-warranty')
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow ">
            <button 
            type="button"
            className='  float-right p-2 mb-10 bg-blue-600 hover:bg-blue-700 text-white rounded'
            onClick={handleImport}>
             Import Data
            </button>
            <h1 className="text-2xl font-bold mb-4 text-center">{warrantyToEdit ? 'Edit Warranty' : 'Add Warranty'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Vendor</label>
                    <input
                        type="text"
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">PR</label>
                    <input
                        type="text"
                        value={pr}
                        onChange={(e) => setPr(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => setPrFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                        required={!warrantyToEdit || !warrantyToEdit.prFile}
                    />
                    {warrantyToEdit && warrantyToEdit.prFile && !prFile && (
                        <p>Previous PR File: {warrantyToEdit.prFile}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-2">PO</label>
                    <input
                        type="text"
                        value={po}
                        onChange={(e) => setPo(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => setPoFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                        required={!warrantyToEdit || !warrantyToEdit.poFile}
                    />
                    {warrantyToEdit && warrantyToEdit.poFile && !poFile && (
                        <p>Previous PO File: {warrantyToEdit.poFile}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-2">Expire Date</label>
                    <input
                        type="date"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                    {warrantyToEdit ? 'Update' : 'Submit'}
                </button>
            </form>
            
        </div>
    );
};

export default AddWarranty;
