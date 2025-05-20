import React from 'react';

const QuantityCounter = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full disabled:opacity-50 hover:bg-gray-200 transition duration-200"
      >
        -
      </button>
      <span className="text-sm font-medium text-gray-800 w-6 text-center">{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition duration-200"
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;









// import React from 'react';

// const QuantityCounter = ({ quantity, onChange }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={() => onChange(quantity - 1)}
//         disabled={quantity <= 1}
//         className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-900 rounded-full disabled:opacity-50"
//       >
//         -
//       </button>
//       <span className="text-sm font-semibold text-indigo-900 w-8 text-center">{quantity}</span>
//       <button
//         onClick={() => onChange(quantity + 1)}
//         className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-900 rounded-full"
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default QuantityCounter;