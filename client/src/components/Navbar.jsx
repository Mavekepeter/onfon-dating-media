import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const imageUrl = user?.image_filename
    ? `${process.env.REACT_APP_API_BASE_URL || ''}/uploads/${user.image_filename}`
    : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img className="h-9" src={assets.onfonlogo} alt='logo' />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/chatlayout'>Start chat</NavLink>
        <NavLink to='/match'>Find match</NavLink>
        <NavLink to='/contact'>Contact us</NavLink>

        <div className='hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full'>
          <input
            type="text"
            className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
            placeholder='Search User'
          />
          <img src={assets.search_icon} alt="search_icon" />
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={imageUrl || assets.default_avatar}
              alt="user"
              className="h-9 w-9 rounded-full object-cover border"
            />
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-rose-600 hover:bg-primary-dull transition text-white rounded-full"
          >
            Register
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <img
        onClick={() => setMenuOpen(true)}
        src={assets.menu_icon}
        className="w-5 cursor-pointer sm:hidden"
        alt="menu"
      />

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full z-50 transition-all bg-white ${menuOpen ? 'w-full' : 'w-0 overflow-hidden'}`}>
        <div className="flex flex-col text-gray-700 h-full">
          <div onClick={() => setMenuOpen(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setMenuOpen(false)} className='py-4 pl-6 border-b' to='/'>Home</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} className='py-4 pl-6 border-b' to='/users'>All Users</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} className='py-4 pl-6 border-b' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
