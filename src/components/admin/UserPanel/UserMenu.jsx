import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import MenuItem from './MenuItem';
import Cart from './Cart';

const UserMenu = () => {
  const { menuId, tableNumber } = useParams();
  const [groupedItems, setGroupedItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tableNumber', tableNumber);

    const fetchMenuItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/items?menuId=${menuId}`);
        const availableItems = response.data.filter(item => item.availability === 'available');

        const grouped = availableItems.reduce((acc, item) => {
          const cat = item.category || 'Uncategorized';
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});

        setGroupedItems(grouped);
        const categoryList = Object.keys(grouped);
        setCategories(categoryList);
        setSelectedCategory(categoryList[0] || '');
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [menuId]);

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item); // Debug log
    const quantityToAdd = item.quantity || 1;
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + quantityToAdd }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: quantityToAdd }];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-900">QuickFeast</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300"
        >
          <FaShoppingCart className="text-xl text-indigo-900" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
              {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </span>
          )}
        </button>
      </div>

      {/* Horizontal Category Scroll */}
      <div className="fixed top-16 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm pt-2 pb-2 px-4">
        <div className="flex overflow-x-auto scrollbar-hidden space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Item Scroll */}
      <div className="pt-28 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600"></div>
          </div>
        ) : selectedCategory && groupedItems[selectedCategory] ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50">
            {groupedItems[selectedCategory].map((item) => (
              <MenuItem key={item._id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 font-medium">No items available</p>
        )}
      </div>

      {/* Fixed Cart Button for Mobile */}
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2"
        >
          <FaShoppingCart className="text-lg" />
          <span className="text-sm font-medium">
            Cart ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0})
          </span>
        </button>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onClearCart={handleClearCart}
          menuId={menuId}
          tableNumber={tableNumber}
        />
      )}
    </div>
  );
};

export default UserMenu;











// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { FaShoppingCart } from 'react-icons/fa';
// import MenuItem from './MenuItem';
// import Cart from './Cart';

// const UserMenu = () => {
//   const { menuId, tableNumber } = useParams();
//   const [groupedItems, setGroupedItems] = useState({});
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('tableNumber', tableNumber);

//     const fetchMenuItems = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:3000/api/items?menuId=${menuId}`);
//         const availableItems = response.data.filter(item => item.availability === 'available');

//         const grouped = availableItems.reduce((acc, item) => {
//           const cat = item.category || 'Uncategorized';
//           acc[cat] = acc[cat] || [];
//           acc[cat].push(item);
//           return acc;
//         }, {});

//         setGroupedItems(grouped);
//         const categoryList = Object.keys(grouped);
//         setCategories(categoryList);
//         setSelectedCategory(categoryList[0] || '');
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [menuId]);

//   const handleAddToCart = (item) => {
//     console.log('Adding to cart:', item); // Debug log
//     const quantityToAdd = item.quantity || 1; // fallback
//     setCartItems(prev => {
//       const existingItem = prev.find(cartItem => cartItem._id === item._id);
//       if (existingItem) {
//         return prev.map(cartItem =>
//           cartItem._id === item._id
//             ? { ...cartItem, quantity: (cartItem.quantity || 1) + quantityToAdd }
//             : cartItem
//         );
//       }
//       return [...prev, { ...item, quantity: quantityToAdd }];
//     });
//   };

//   const handleClearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans">
//       {/* Header */}
//       <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-indigo-900 tracking-tight bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
//           QuickFeast
//         </h1>
//         <button
//           onClick={() => setIsCartOpen(true)}
//           className="relative p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors duration-300"
//         >
//           <FaShoppingCart className="text-2xl text-indigo-900" />
//           {cartItems.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 animate-pulse">
//               {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Horizontal Category Scroll */}
//       <div className="fixed top-16 left-0 right-0 z-10 bg-white/70 backdrop-blur-sm shadow-sm pt-3 pb-2 px-4">
//         <div className="flex overflow-x-auto scrollbar-hidden space-x-3">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
//                 selectedCategory === category
//                   ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
//                   : 'bg-white text-gray-700 hover:bg-indigo-50'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Vertical Item Scroll */}
//       <div className="pt-32 pb-20 px-4 max-w-md mx-auto">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
//           </div>
//         ) : selectedCategory && groupedItems[selectedCategory] ? (
//           <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50">
//             {groupedItems[selectedCategory].map((item) => (
//               <MenuItem key={item._id} item={item} onAddToCart={handleAddToCart} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500 mt-8 font-medium">No items available</p>
//         )}
//       </div>

//       {/* Fixed Cart Button for Mobile */}
//       <div className="fixed bottom-6 right-6 z-10">
//         <button
//           onClick={() => setIsCartOpen(true)}
//           className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-full shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
//         >
//           <FaShoppingCart className="text-xl" />
//           <span className="text-sm font-semibold">
//             View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0})
//           </span>
//         </button>
//       </div>

//       {/* Cart Modal */}
//       {isCartOpen && (
//         <Cart
//           cartItems={cartItems}
//           onClose={() => setIsCartOpen(false)}
//           onClearCart={handleClearCart}
//           menuId={menuId}
//           tableNumber={tableNumber}
//         />
//       )}
//     </div>
//   );
// };

// export default UserMenu;