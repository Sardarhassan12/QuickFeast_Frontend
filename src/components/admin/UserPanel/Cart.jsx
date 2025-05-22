import React, { useEffect } from 'react';
import axios from 'axios';

const Cart = ({ cartItems, onClose, onClearCart, menuId, tableNumber }) => {
  useEffect(() => {
    console.log('Cart rendering with items:', cartItems); // Debug log
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1) || 0), 0);
  const tax = subtotal * 0.1; // Example: 10% tax
  const totalAmount = subtotal + tax;

  const handleProcessOrder = async () => {
    try {
      const orderData = {
        menuId,
        tableNumber: parseInt(tableNumber),
        items: cartItems.map(item => ({
          itemId: item._id,
          quantity: item.quantity,
        })),
      };
      console.log('Submitting order:', orderData); // Debug log
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, orderData);
      alert('Order placed successfully!');
      onClearCart();
      onClose();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Your Bill</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {/* Itemized Bill */}
            <div className="border-b border-gray-200 pb-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-t border-gray-100"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.itemName || 'Unnamed Item'}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1} × Rs {item.price || 0}
                    </p>
                  </div>
                  <p className="font-semibold text-indigo-600">
                    Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>Rs {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-indigo-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>Rs {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
              <button
                onClick={handleProcessOrder}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md hover:from-indigo-700 hover:to-blue-700 transition duration-200"
              >
                Process Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;







// import React, { useEffect } from 'react';
// import axios from 'axios';

// const Cart = ({ cartItems, onClose, onClearCart, menuId, tableNumber }) => {
//   useEffect(() => {
//     console.log('Cart rendering with items:', cartItems); // Debug log
//   }, [cartItems]);

//   const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1) || 0), 0);

//   const handleProcessOrder = async () => {
//     try {
//       const orderData = {
//         menuId,
//         tableNumber: parseInt(tableNumber),
//         items: cartItems.map(item => ({
//           itemId: item._id,
//           quantity: item.quantity
//         }))
//       };
//       console.log('Submitting order:', orderData); // Debug log
//       await axios.post('http://localhost:3000/api/orders', orderData);
//       alert('Order placed successfully!');
//       onClearCart();
//       onClose();
//     } catch (error) {
//       console.error('Error processing order:', error);
//       alert('Failed to process order. Please try again.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto w-full max-w-md">
//         <h2 className="text-lg font-bold mb-4">Your Cart</h2>
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item, index) => (
//               <div key={index} className="flex justify-between items-center border-b pb-2">
//                 <div>
//                   <p className="font-semibold" style={{ color: '#4b5563', display: 'block !important' }}>
//                     {item.itemName || 'Unnamed Item'}
//                   </p>
//                   <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
//                 </div>
//                 <p className="font-semibold">Rs {(item.price * (item.quantity || 1)) || 0}</p>
//               </div>
//             ))}
//             <div className="flex justify-between items-center mt-4 font-bold text-lg">
//               <span>Total:</span>
//               <span>Rs {totalAmount}</span>
//             </div>
//             <div className="flex justify-end gap-4 mt-4">
//               <button
//                 onClick={onClose}
//                 className="border-2 px-4 py-2 rounded-md"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleProcessOrder}
//                 className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-blue-700"
//               >
//                 Process Order
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;