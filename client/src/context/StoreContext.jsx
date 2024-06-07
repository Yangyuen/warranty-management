import axios from "axios";
import React, { createContext, useContext } from "react";

const ApiContext = createContext();
const url = 'http://localhost:5000'; // ใช้ http แทน https

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



  return (
    <ApiContext.Provider value={{ addWarranty, listWarranty,deleteWarranty,updateWarranty,searchWarranty, url }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useStore = () => {
  return useContext(ApiContext);
};
