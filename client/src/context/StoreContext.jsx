import axios from "axios";
import React, { createContext, useContext } from "react";

const ApiContext = createContext();
const url = 'http://localhost:5000'; // ใช้ http แทน https

const calculateRemainingDays = (expireDate) => {
  const today = new Date();
  const expiry = new Date(expireDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) {
      return <span className="text-red-500 text">Warranty expired {Math.abs(diffDays)} days ago.</span>;
  } else {
      return diffDays;
  }
};


export const StoreContextProvider = ({ children }) => {
  
  // List Warranty
  const listWarranty = async () => {
    try {
      const response = await axios.get(`${url}/api/warrantys/list`);
      return response.data;
    } catch (error) {
      console.error("Error fetching warranties:", error);
    }
  };

  // Add Warranty
  const addWarranty = async (formData) => {
    try {
      const response = await axios.post(`${url}/api/warrantys/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // แก้จาก "Context-type" เป็น "Content-Type"
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding warranty:", error);
      throw error;
    }
  };

  // Delete Warranty
  const deleteWarranty = async(id)=>{
    try {
      const response = await axios.delete(`${url}/api/warrantys/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting warranty',error);
      throw error;
    }
  }

  // Update Warranty
  const updateWarranty = async (id, formData) =>{
    try {
      const response = await axios.put(`${url}/api/warrantys/${id}`,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating warranty:',error);
      throw error;
    }
  }

  // Search Warranty
  const searchWarranty = async(query)=>{
    try {
      const response = await axios.get(`${url}/api/warrantys/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching warranties:',error);
      throw error;      
    }
  }

  // importWarranty
  const importWarranty = async (formData) => {
    try {
      const response = await axios.post(`${url}/api/warrantys/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error importing warranties:", error.response || error.message);
      throw error;
    }
  };

 // Export Warranty
 const exportWarranty = async () => {
  try {
    const response = await axios.get(`${url}/api/warrantys/export`, {
      responseType: 'blob', // important for file download
    });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'warranties.xlsx';
    link.click();
  } catch (error) {
    console.error("Error exporting warranties:", error);
    throw error;
  }
};


  return (
    <ApiContext.Provider value={{ addWarranty, listWarranty,deleteWarranty,updateWarranty,searchWarranty, url, calculateRemainingDays, importWarranty, exportWarranty }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useStore = () => {
  return useContext(ApiContext);
};
