import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (handleLogout) {
      handleLogout();
    }
    navigate('/');
  };

  return (
    <div className="w-full bg-navy text-white flex items-center justify-between py-4 px-6">
      <div className="text-yellow-500 font-bold text-4xl tracking-widest transform hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'Brush Script MT, cursive' }}>
   Admin Dashboard</div>
      <nav className="flex space-x-4">
        <button
          className="py-2 px-4 hover:bg-yellow-500 rounded"
          onClick={() => navigate('/userdetails')}
        >
          User Details
        </button>
        <button
          className="py-2 px-4 hover:bg-yellow-500 rounded"
          onClick={() => navigate('/addbookform')}
        >
          Add Book
        </button>
        <button
          className="py-2 px-4 hover:bg-yellow-500 rounded"
          onClick={() => navigate('/bookdetails')}
        >
          Book Details
        </button>
        <button
          className="py-2 px-4 hover:bg-yellow-500 rounded"
          onClick={() => navigate('/inquirytable')}
        >
          Inquiry Details
        </button>
        {/* <button
          className="py-2 px-4 hover:bg-yellow-500 rounded"
          onClick={() => navigate('/purchasedetails')}
        >
          Purchased Details
        </button> */}
      </nav>
      <button
        className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded"
        onClick={handleLogoutClick}
      >
        Log Out
      </button>
    </div>
  );
};

export default AdminNavbar;
