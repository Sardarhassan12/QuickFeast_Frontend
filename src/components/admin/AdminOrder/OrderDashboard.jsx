import React, { useEffect, useState } from 'react';
import LeftNavbar from '../LeftNavbar';
import TopNavBar from '../TopNavBar';
import axios from 'axios';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [printOrder, setPrintOrder] = useState(null);
  const [printType, setPrintType] = useState(null); // 'kitchen' or 'bill'
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
        showNotification('error', 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.order.status } : order
        )
      );
      showNotification('success', 'Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('error', 'Failed to update status');
    }
  };

  const handlePrint = (order, type) => {
    setPrintOrder(order);
    setPrintType(type);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Left Navbar */}
      <LeftNavbar />

      {/* Main Area */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Orders Table */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Dashboard</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
              <svg
                className="animate-spin h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-red-600">
              <p>{error}</p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setError(null);
                  fetchOrders();
                }}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100vh-12rem)] text-gray-600">
              <p>No orders available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <th className="py-3 px-6 text-left font-semibold">Order ID</th>
                    <th className="py-3 px-6 text-left font-semibold">Table Number</th>
                    <th className="py-3 px-6 text-left font-semibold">Items</th>
                    <th className="py-3 px-6 text-left font-semibold">Total Amount</th>
                    <th className="py-3 px-6 text-left font-semibold">Status</th>
                    <th className="py-3 px-6 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >
                      <td className="py-4 px-6  text-black">{order._id.slice(-6)}</td>
                      <td className="py-4 px-6  text-black">{order.tableNumber}</td>
                      <td className="py-4 px-6">
                        {order.items.map((item) => (
                          <div key={item.itemId} className="text-gray-700">
                            {item.itemName} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="py-4 px-6">Rs {order.totalAmount}</td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className={`p-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                            order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                              : order.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-green-100 text-green-700 border-green-300'
                          }`}
                          aria-label={`Update status for order ${order._id.slice(-6)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 flex gap-3">
                        <button
                          onClick={() => handlePrint(order, 'kitchen')}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                          aria-label={`Print kitchen slip for order ${order._id.slice(-6)}`}
                        >
                          Kitchen Slip
                        </button>
                        <button
                          onClick={() => handlePrint(order, 'bill')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                          aria-label={`Print bill for order ${order._id.slice(-6)}`}
                        >
                          User Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Printable Slips */}
        {printOrder && printType === 'kitchen' && (
          <div className="print-only">
            <div className="p-6 max-w-sm mx-auto bg-white border border-gray-200 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Kitchen Slip</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Order ID:</strong> {printOrder._id.slice(-6)}
                </p>
                <p>
                  <strong>Table Number:</strong> {printOrder.tableNumber}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(printOrder.createdAt).toLocaleString()}
                </p>
                <h3 className="font-semibold mt-4">Items:</h3>
                <ul className="list-disc pl-5">
                  {printOrder.items.map((item) => (
                    <li key={item.itemId}>
                      {item.itemName} - Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {printOrder && printType === 'bill' && (
          <div className="print-only">
            <div className="p-6 max-w-sm mx-auto bg-white border border-gray-200 shadow-md">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">QuickFeast Bill</h2>
                <p className="text-gray-600">123 Restaurant Lane, Food City</p>
                <p className="text-gray-600">Phone: (123) 456-7890</p>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Order ID:</strong> {printOrder._id.slice(-6)}
                </p>
                <p>
                  <strong>Table Number:</strong> {printOrder.tableNumber}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(printOrder.createdAt).toLocaleString()}
                </p>
                <h3 className="font-semibold mt-4">Items:</h3>
                <table className="w-full mb-4">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2">Item</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printOrder.items.map((item) => (
                      <tr key={item.itemId} className="border-t">
                        <td className="py-2">{item.itemName}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">Rs {item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="my-4 border-gray-300" />
                <p className="text-right font-bold text-gray-800">
                  Total: Rs {printOrder.totalAmount}
                </p>
                <p className="text-center mt-4 text-gray-600">
                  Thank you for dining with us!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div
            className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-white ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } animate-fade-in`}
          >
            {notification.message}
          </div>
        )}

        {/* Print-Specific CSS */}
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              .print-only, .print-only * {
                visibility: visible;
              }
              .print-only {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                font-size: 12pt;
              }
              .print-only table {
                font-size: 10pt;
              }
            }
            @media screen {
              .print-only {
                display: none;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default OrderDashboard;






// import React, { useEffect, useState, useRef } from 'react';
// import LeftNavbar from '../LeftNavbar';
// import TopNavBar from '../TopNavBar';
// import axios from 'axios';

// const OrderDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [printOrder, setPrintOrder] = useState(null);
//   const [printType, setPrintType] = useState(null); // 'kitchen' or 'bill'

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('http://localhost:3000/api/orders');
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/api/orders/${orderId}`, { status: newStatus });
//       setOrders(orders.map(order => 
//         order._id === orderId ? { ...order, status: response.data.order.status } : order
//       ));
//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert('Failed to update status. Please try again.');
//     }
//   };

//   const handlePrint = (order, type) => {
//     setPrintOrder(order);
//     setPrintType(type);
//     setTimeout(() => {
//       window.print();
//     }, 100);
//   };

//   return (
//     <div className="h-screen w-full flex">
//       {/* Left Navbar */}
//       <LeftNavbar />

//       {/* Main Area */}
//       <div className="h-svh w-full ml-50">
//         {/* Top Navbar */}
//         <TopNavBar />

//         {/* Orders Table */}
//         <div className="p-6 text-black">
//           <h2 className="text-2xl font-bold mb-4">Order Dashboard</h2>
//           {isLoading ? (
//             <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
//             </div>
//           ) : orders.length === 0 ? (
//             <p className="text-gray-500">No orders available.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white rounded-lg shadow-md">
//                 <thead>
//                   <tr className="bg-indigo-100 text-left">
//                     <th className="py-3 px-4 font-semibold">Order ID</th>
//                     <th className="py-3 px-4 font-semibold">Table Number</th>
//                     <th className="py-3 px-4 font-semibold">Items</th>
//                     <th className="py-3 px-4 font-semibold">Total Amount</th>
//                     <th className="py-3 px-4 font-semibold">Status</th>
//                     <th className="py-3 px-4 font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <tr key={order._id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-4">{order._id.slice(-6)}</td>
//                       <td className="py-3 px-4">{order.tableNumber}</td>
//                       <td className="py-3 px-4">
//                         {order.items.map(item => (
//                           <div key={item.itemId}>
//                             {item.itemName} (x{item.quantity})
//                           </div>
//                         ))}
//                       </td>
//                       <td className="py-3 px-4">Rs {order.totalAmount}</td>
//                       <td className="py-3 px-4">
//                         <select
//                           value={order.status}
//                           onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
//                           className={`p-1 rounded ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="In Progress">In Progress</option>
//                           <option value="Completed">Completed</option>
//                         </select>
//                       </td>
//                       <td className="py-3 px-4 flex gap-2">
//                         <button
//                           onClick={() => handlePrint(order, 'kitchen')}
//                           className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
//                         >
//                           Print Kitchen Slip
//                         </button>
//                         <button
//                           onClick={() => handlePrint(order, 'bill')}
//                           className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         >
//                           Print User Bill
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Printable Slips */}
//         {printOrder && printType === 'kitchen' && (
//           <div className="print-only">
//             <div className="p-6 max-w-md mx-auto border border-gray-300">
//               <h2 className="text-xl font-bold mb-4">Kitchen Slip</h2>
//               <p><strong>Order ID:</strong> {printOrder._id.slice(-6)}</p>
//               <p><strong>Table Number:</strong> {printOrder.tableNumber}</p>
//               <p><strong>Time:</strong> {new Date(printOrder.createdAt).toLocaleString()}</p>
//               <h3 className="font-semibold mt-4">Items:</h3>
//               <ul className="list-disc pl-5">
//                 {printOrder.items.map(item => (
//                   <li key={item.itemId}>
//                     {item.itemName} - Qty: {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {printOrder && printType === 'bill' && (
//           <div className="print-only">
//             <div className="p-6 max-w-md mx-auto border border-gray-300">
//               <h2 className="text-2xl font-bold mb-4 text-center">QuickFeast Bill</h2>
//               <p className="text-center">123 Restaurant Lane, Food City</p>
//               <p className="text-center mb-4">Phone: (123) 456-7890</p>
//               <hr className="mb-4" />
//               <p><strong>Order ID:</strong> {printOrder._id.slice(-6)}</p>
//               <p><strong>Table Number:</strong> {printOrder.tableNumber}</p>
//               <p><strong>Time:</strong> {new Date(printOrder.createdAt).toLocaleString()}</p>
//               <h3 className="font-semibold mt-4">Items:</h3>
//               <table className="w-full mb-4">
//                 <thead>
//                   <tr>
//                     <th className="text-left">Item</th>
//                     <th className="text-right">Qty</th>
//                     <th className="text-right">Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {printOrder.items.map(item => (
//                     <tr key={item.itemId}>
//                       <td>{item.itemName}</td>
//                       <td className="text-right">{item.quantity}</td>
//                       <td className="text-right">Rs {item.price * item.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <hr className="mb-4" />
//               <p className="text-right font-bold">Total: Rs {printOrder.totalAmount}</p>
//               <p className="text-center mt-4">Thank you for dining with us!</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Print-Specific CSS */}
//       <style>
//         {`
//           @media print {
//             body * {
//               visibility: hidden;
//             }
//             .print-only, .print-only * {
//               visibility: visible;
//             }
//             .print-only {
//               position: absolute;
//               top: 0;
//               left: 0;
//               width: 100%;
//             }
//           }
//           @media screen {
//             .print-only {
//               display: none;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default OrderDashboard;