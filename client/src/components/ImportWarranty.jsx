import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImportWarranty = () => {
    const { importWarranty } = useStore();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await importWarranty(formData);
            toast.success('Warranties imported successfully!');
        } catch (error) {
            console.error('Error importing warranties:', error);
            toast.error('Failed to import warranties. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Import Warranties</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Select File</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                        accept=".xlsx, .xls"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-600 text-white rounded">
                    Import
                </button>
            </form>
        </div>
    );
};

export default ImportWarranty;
