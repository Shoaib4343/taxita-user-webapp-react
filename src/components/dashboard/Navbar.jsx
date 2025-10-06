// src/components/navbar/Navbar.jsx
import { Link } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import AccountToggle from "../sidebar/AccountToggle";
import { Search } from "../sidebar/Search";
import PreviousTradingYear from "../../pages/PreviousTradingYear";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
     
      
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sticky top-0 z-40 border-b border-gray-100">
      {/* Left section: toggle + logo */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex-shrink-0 cursor-pointer"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FiMenu size={18} className="text-gray-600" />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Taxita Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-lg"
            />
          </div>
          <div className="min-w-0 block xs:block">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              Taxita
            </h1>
            <p className="text-xs text-gray-500 truncate hidden sm:block">
              Accountant on your driving seat
            </p>
          </div>
        </Link>
      </div>

      {/* Middle section: Search - Hidden on mobile */}
      <div className="flex-1 max-w-2xl mx-6 hidden md:block">
        <Search noMargin />
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
        {/* Mobile search button */}
        <div className="md:hidden">
          <Search isMobile />
        </div>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex-shrink-0 cursor-pointer">
          <FiBell size={18} className="text-gray-600" />
          <span className="absolute top-2 right-2 block h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Trading year dropdown - Hidden on small mobile */}
        <div className="block ">
          <PreviousTradingYear />
        </div>

        {/* Account Toggle */}
        <div className="flex items-center h-10 ml-1">
          <AccountToggle variant="navbar" />
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;