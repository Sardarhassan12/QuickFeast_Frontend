import React from 'react';

// Optional PropTypes for type checking
// import PropTypes from 'prop-types';

function ItemCard({ setIsUpdateModal, setItemData, items }) {
  const itemUpdateManage = () => {
    setItemData(items);
    setIsUpdateModal(true);
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        {items.imagePath ? (
          <img
            src={`${process.env.REACT_APP_API_URL}${items.imagePath}`}
            alt={items.itemName}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Item Name and Price */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800 text-lg truncate">{items.itemName}</h3>
          <span className="text-blue-0 text-blue-600 font-medium">${items.price}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{items.description}</p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={itemUpdateManage}
            className="flex-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
          <button
            className="flex-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


export default ItemCard;
















// import React from 'react';
// import UpdateItem from './UpdateItem';

// function ItemCard({setIsUpdateModal, setItemData, items}) {
//   const itemUpdateManage = ()=>{
//     setItemData(items);
//     setIsUpdateModal(true);
//   }

//   return (
    
//     <div className="w-[232px] h-[271px] bg-gray-300 rounded-xl p-4 flex flex-col items-center shadow-md ml-2 mt-5">
//       {/* Image Placeholder */}
//       <div className="w-full h-32 bg-gray-400 flex items-center justify-center rounded-md mb-4">
//         {items.imagePath ? (
//             <img src={`http://localhost:3000${items.imagePath}`} alt={items.itemName} className="w-full h-full object-cover rounded-md" />
//         ) : (
//             <svg className="w-20 h-20 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 19h18M5 5v14h14V5H5z" />
//             </svg>
//         )}
//       </div>

//       {/* Item Name and Price */}
//       <div className="w-full flex justify-between items-center mb-2">
//         <span className="font-semibold text-gray-800">{items.itemName}</span>
//         <span className="text-gray-700">{items.price}</span>
//       </div>

//       {/* Description */}
//       <p className="text-sm text-gray-700 mb-4 text-left w-full">
//         {items.description}
//       </p>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-auto">
//         <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600" onClick={itemUpdateManage}>Update</button>
//         <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">Delete</button>
//       </div>

//     </div>
//   );
// }

// export default ItemCard;
