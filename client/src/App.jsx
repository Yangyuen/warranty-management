import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddWarranty from './components/AddWarranty';
import ListWarranty from './components/ListWarranty';
import ImportWarranty from './components/ImportWarranty';
import { StoreContextProvider } from './context/StoreContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [warrantyToEdit, setWarrantyToEdit] = useState(null);

  return (
      <StoreContextProvider>
          <Router>
              <Navbar />
              <Routes>
              <Route path="/" element={<ListWarranty onEdit={setWarrantyToEdit} />} />
              <Route path="/add-warranty" element={<AddWarranty warrantyToEdit={warrantyToEdit} />} />
              <Route path="/import-warranty" element={<ImportWarranty />} />
              </Routes>
              <ToastContainer/>
          </Router>
      </StoreContextProvider>
  );
};

export default App;