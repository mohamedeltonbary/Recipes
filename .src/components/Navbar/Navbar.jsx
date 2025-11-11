import React, { useContext } from 'react'
import styles from './Navbar.module.css';
import { FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { RecipeContext } from '../Context/RecipeProvider';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useContext(RecipeContext);
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-[#9A3F3F] text-white fixed w-full top-0 z-10 shadow-md">
                <Link to="/" className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-wide">Forkify</h1>
                </Link>

                <input
                    className="bg-white/90 text-gray-700 placeholder-gray-500 p-3 w-1/3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ffb703] transition-all duration-200"
                    type="text"
                    placeholder="Search over 1,000,000 recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Link to="/favorite" className="hover:scale-110 transition-transform duration-200">
                    <FaHeart size={26} color="white" />
                </Link>
            </nav>

        </div>
    )
}

export default Navbar 
