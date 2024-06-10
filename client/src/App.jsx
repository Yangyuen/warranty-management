import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddWarranty from './components/AddWarranty';
import ListWarranty from './components/ListWarranty';
import { StoreContextProvider } from './context/StoreContext';

const App = () => {
  const [warrantyToEdit, setWarrantyToEdit] = useState(null);

  // const handleEdit = (warranty) => {
  //     setWarrantyToEdit(warranty);
  //     navigate('/add-warranty');
  // };

  return (
      <StoreContextProvider>
          <Router>
              <Navbar />
              <Routes>
              <Route path="/" element={<ListWarranty onEdit={setWarrantyToEdit} />} />
              <Route path="/add-warranty" element={<AddWarranty warrantyToEdit={warrantyToEdit} />} />
              </Routes>
          </Router>
      </StoreContextProvider>
  );
};

export default App;