import React, { useEffect, useState } from 'react';
import LeftNavbar from '../LeftNavbar';
import TopNavBar from '../TopNavBar';
import MenuModal from './MenuModal';
import axios from 'axios';
import MenuCard from './MenuCard';

const MenuDashboard = () => {
  const [isModal, setIsModal] = useState(false);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/menus`);
      setMenus(response.data);
    } catch (err) {
      setError('Failed to fetch menus. Please try again.');
      console.error('Error fetching menus', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [isModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Left Navbar */}
      <LeftNavbar />

      {/* Main Area */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Button Area */}
        <div className="p-8">
          <div className="mb-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              onClick={() => setIsModal(true)}
            >
              Generate New Menu
            </button>
          </div>

          {/* Menu Cards */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-600">
              <p>{error}</p>
              <button
                onClick={fetchMenus}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : menus.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-600">
              <p>No menus found. Add some menus to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menus.map(menu => (
                <MenuCard key={menu._id} menu={menu} onDelete={fetchMenus} />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <MenuModal isModal={isModal} setIsModal={setIsModal} />
      </div>
    </div>
  );
};

export default MenuDashboard;









// import React, { useEffect, useState } from 'react';
// import LeftNavbar from '../LeftNavbar';
// import TopNavBar from '../TopNavBar';
// import MenuModal from './MenuModal';
// import axios from 'axios';
// import MenuCard from './MenuCard';

// const MenuDashboard = () => {
//   const [isModal, setIsModal] = useState(false);
//   const [menus, setMenus] = useState([]);

//   const fetchMenus = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/menus');
//       setMenus(response.data);
//     } catch (err) {
//       console.error('Error fetching menus', err);
//     }
//   };

//   useEffect(() => {
//     fetchMenus();
//   }, [isModal]); 

//   return (
//     <div className="h-screen w-full flex ">
//       <LeftNavbar />
//       <div className="w-full h-auto ml-50">
//         <TopNavBar />
//         <div className='w-full h-20 pl-10 pr-20 text-blue-900 '>
//           <button className='border-2 h-10 w-50 cursor-pointer mt-5 rounded-md' onClick={() => setIsModal(true)}>Generate New Menu</button>
//         </div>
        
//         {/* Menu Cards */}
//         <div className="p-10 flex flex-wrap gap-6">
//           {menus.map(menu => (
//             <MenuCard key={menu._id} menu={menu} onDelete={fetchMenus} />
//           ))}
//         </div>

//         <MenuModal isModal={isModal} setIsModal={setIsModal} />
//       </div>
//     </div>
//   );
// };

// export default MenuDashboard;
