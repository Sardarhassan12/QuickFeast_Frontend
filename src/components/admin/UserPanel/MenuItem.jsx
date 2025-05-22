import React, { useState } from 'react';
import QuantityCounter from './QuantityCounter';

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log('Add to Cart clicked for:', item); // Debug log
    if (item._id && item.itemName && item.price) {
      onAddToCart({ ...item, quantity });
    } else {
      console.error('Invalid item data:', item);
    }
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-all duration-200">
      <img
        src={`${process.env.REACT_APP_API_URL}${item.imagePath}`}
        alt={item.itemName}
        className="w-full h-32 object-cover rounded-lg border border-gray-100"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-800">{item.itemName}</h3>
        <span className="text-indigo-600 font-medium">Rs {item.price}</span>
      </div>
      <div className="flex items-center gap-3">
        <QuantityCounter quantity={quantity} onChange={setQuantity} />
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;

// import React, { useState } from 'react';
// import QuantityCounter from './QuantityCounter';

// const MenuItem = ({ item, onAddToCart }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     console.log('Add to Cart clicked for:', item); // Debug log
//     if (item._id && item.itemName && item.price) {
//       onAddToCart({ ...item, quantity });
//     } else {
//       console.error('Invalid item data:', item);
//     }
//     setQuantity(1); // Reset quantity after adding
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
//       <img
//         src={`http://localhost:3000${item.imagePath}`}
//         alt={item.itemName}
//         className="w-24 h-24 object-cover rounded-xl border border-indigo-100"
//       />
//       <div className="flex-1">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-semibold text-gray-800">{item.itemName}</h3>
//           <span className="text-indigo-600 font-bold">Rs {item.price}</span>
//         </div>
//         <div className="flex items-center gap-4">
//           <QuantityCounter quantity={quantity} onChange={setQuantity} />
//           <button
//             onClick={handleAddToCart}
//             className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 text-sm font-medium shadow-sm"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuItem;