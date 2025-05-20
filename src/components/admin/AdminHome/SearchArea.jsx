import React, { useState } from 'react';

const SearchArea = ({ setIsModal, searchText, setSearchText }) => {
  const [notification, setNotification] = useState(null);

  const checkText = () => {
    if (searchText.trim() === '') {
      setNotification({ type: 'error', message: 'Search field is empty' });
    } else {
      setNotification({ type: 'success', message: 'Search successful' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full p-6 flex justify-between items-center bg-white shadow-sm text-black">
      <div className="relative flex items-center w-1/2">
        <input
          type="text"
          className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          placeholder="Search items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={checkText}
          className="absolute right-0 top-0 h-full px-4 text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => setIsModal(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Item
      </button>

      {notification && (
        <div
          className={`absolute top-20 right-6 px-4 py-2 rounded-md text-white ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default SearchArea;





















// import React from 'react'

// const SearchArea = ({setIsModal, searchText, setSearchText}) => {

//   const checkText=()=>{
//     if(searchText == ''){
//       alert("Search Field is empty");
//     }
//     else{
//       alert("Search successful");
//     }
//   }
//   return (
//     <div className=' w-full h-20 flex justify-between align-middle pl-10 pr-20 text-blue-900 '>
//         <div className='h-12 border-2 w-110 rounded-md mt-5'>
//             <input 
//               type="text" 
//               className='h-10 w-80 border-none focus:outline-none p-5'
//               value={searchText}
//               onChange={(e)=>setSearchText(e.target.value)}
//             />
//             <button className='ml-5 border-l-2 h-10 cursor-pointer pl-5' onClick={()=>checkText()}>Search</button>
//         </div>

//         <button className='border-2 h-10 w-30 cursor-pointer mt-5 rounded-md' onClick={()=>{setIsModal(true)}}> + Add Item</button>
//     </div>
//   )
// }

// export default SearchArea
