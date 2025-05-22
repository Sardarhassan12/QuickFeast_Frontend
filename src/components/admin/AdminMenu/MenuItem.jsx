import React from 'react'

const MenuItem = ({ item }) => {
  return (
    <div>
      <div className="w-[200px] h-auto bg-gray-300 rounded-xl p-4 flex flex-col items-center shadow-md ml-2 mt-5 relative">
        
        {/* Delete Button */}
        <button className="absolute -top-1 right-2 text-red-500 hover:text-red-700 text-lg font-bold ">
          ×
        </button>

        {/* Image */}
        <div className="w-full h-32 bg-gray-400 flex items-center justify-center rounded-md mb-4">
          {item?.imagePath ? (
            <img
              src={`https://quickfeast-backend.railway.app${item.imagePath}`}
              alt={item.itemName}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <svg className="w-20 h-20 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 19h18M5 5v14h14V5H5z" />
            </svg>
          )}
        </div>

        {/* Item Name and Price */}
        <div className="w-full flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">{item.itemName}</span>
          <span className="text-gray-700">{item.price}</span>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
