import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-around list-none">
                <li className="mx-4">
                    <Link to="/" className="text-white no-underline">Home</Link>
                </li>
                <li className="mx-4">
                    <Link to="/add-warranty" className="text-white no-underline">Add Warranty</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
