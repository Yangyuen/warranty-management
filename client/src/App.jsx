import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddWarranty from './components/AddWarranty';
import ListWarranty from './components/ListWarranty';
import { StoreContextProvider } from './context/StoreContext';
// import { ApiContext } from './context/StoreContext';

const App = () => {
  const [warranties, setWarranties] = useState([]);

  const handleAddWarranty = (newWarranty) => {
    setWarranties([...warranties, newWarranty]);
  };

  return (
    <StoreContextProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListWarranty />} />
        <Route path="/add-warranty" element={<AddWarranty onAddWarranty={handleAddWarranty} />} />
      </Routes>
    </Router>
    </StoreContextProvider>
  );
};

export default App;
