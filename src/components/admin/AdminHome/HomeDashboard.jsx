import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import ItemCard from './ItemCard';
import SearchArea from './SearchArea';
import LeftNavbar from '../LeftNavbar';
import TopNavBar from '../TopNavBar';
import axios from 'axios';

const HomeDashboard = () => {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://quickfeast-backend.railway.app/api/items`);
      setFoodItems(response.data);
    } catch (error) {
      setError('Failed to fetch items. Please try again.');
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Left Navbar */}
      <LeftNavbar />

      {/* Main Area */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Search Area */}
        <SearchArea
          setIsModal={setIsModal}
          setSearchText={setSearchText}
          searchText={searchText}
        />

        {/* Main Content */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-600">
              <p>{error}</p>
              <button
                onClick={fetchItems}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : foodItems.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-600">
              <p>No items found. Add some items to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foodItems
                .filter((item) =>
                  item.itemName.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((items, index) => (
                  <ItemCard
                    key={items._id || index}
                    items={items}
                    setIsUpdateModal={setIsUpdateModal}
                    setItemData={setItemData}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <AddItem isModal={isModal} setIsModal={setIsModal} setFoodItems={setFoodItems} fetchItems={fetchItems} />
        <UpdateItem
          isUpdateModal={isUpdateModal}
          setIsUpdateModal={setIsUpdateModal}
          itemData={itemData}
          fetchItems={fetchItems}
        />
      </div>
    </div>
  );
};

export default HomeDashboard;



















// import React from 'react'
// import AddItem from './AddItem'
// import UpdateItem from './UpdateItem'
// import ItemCard from './ItemCard'
// import SearchArea from './SearchArea'
// import LeftNavbar from '../LeftNavbar'
// import TopNavBar from '../TopNavBar'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'

// const HomeDashboard = () => {

//     const [isUpdateModal, setIsUpdateModal] = useState(false);
//     const [itemData, setItemData] = useState();
//     const [searchText, setSearchText] = useState('');
//     const [isModal, setIsModal] = useState(false);
//     const [foodItems, setFoodItems] = useState([]); 
   
//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/items'); 
//                 setFoodItems(response.data);
//             } catch (error) {
//                 console.error('Error fetching items:', error);
//             }
//         };

//         fetchItems();
//     }, [foodItems]); 
//   return (
//     <div>
//         <div className="h-screen w-full flex">
                        
//             {/*Left Navbar */}
//             <LeftNavbar />
                
//             {/* Main Area */}
//             <div className="h-svh w-full ml-50">
//                 {/* Top Navbar */}
//                 <TopNavBar />
//                 {/* Search Area */}
//                 <SearchArea setIsModal ={setIsModal} setSearchText = {setSearchText} searchText= {searchText}/>
//                 <div className='h-full w-full flex flex-wrap justify-start px-8'>
//                     {
//                         foodItems.map((items, index) => (
//                             <ItemCard key={index} items = {items} isUpdateModal = {isUpdateModal} setIsUpdateModal = {setIsUpdateModal} setItemData={setItemData}/>
//                         ))
//                     }
//                 </div>
//                 <AddItem isModal={isModal} setIsModal={setIsModal} setFoodItems={setFoodItems}/>
//                 <UpdateItem isUpdateModal={isUpdateModal} setIsUpdateModal = {setIsUpdateModal} itemData ={itemData} />
//             </div>

//         </div>
           
        
//         </div>
//   )
// }

// export default HomeDashboard
