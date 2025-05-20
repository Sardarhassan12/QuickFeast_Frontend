import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-800 h-16 flex items-center justify-end px-6 sticky top-0 z-20 shadow-md">
      <button
        onClick={handleLogout}
        className="bg-white text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-100 hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Logout
      </button>
    </nav>
  );
};

export default TopNavBar;









// import React from 'react'

// const TopNavBar = () => {
//   return (
//     <>
//       <nav className='w-full bg-blue-500 h-15 pt-2 pr-20'>
//           <button className='border-2 rounded-md w-30 h-10 float-right cursor-pointer'>Logout</button>
//        </nav>
//     </>
//   )
// }

// export default TopNavBar
