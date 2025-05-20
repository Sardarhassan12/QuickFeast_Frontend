import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const MenuModal = ({ isModal, setIsModal }) => {
  const [groupedItems, setGroupedItems] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [allItems, setAllItems] = useState([]);

  const generateMenu = async () => {
    try {
      const itemIds = allItems.map(item => item._id);
      const response = await axios.post('http://localhost:3000/api/menu', {
        title: 'Main Menu - ' + new Date().toLocaleString(),
        itemIds,
      });

      if (response.data.success) {
        alert('Menu generated successfully!');
        setIsModal(false);
      } else {
        alert('Error generating menu.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the menu.');
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        const allItems = response.data;
        setAllItems(allItems);

        const grouped = allItems.reduce((acc, item) => {
          const cat = item.category || 'Uncategorized';
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});

        setGroupedItems(grouped);
        setCategoryNames(Object.keys(grouped));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (isModal) fetchItems();
  }, [isModal]);

  const nextCategory = () => {
    if (currentCategoryIndex < categoryNames.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    }
  };

  const prevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const currentCategory = categoryNames[currentCategoryIndex];
  const items = groupedItems[currentCategory] || [];

  return (
    isModal && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-5xl h-[90%] mx-4 md:mx-8 overflow-y-auto p-6 flex flex-col relative">
          {/* Header with Category and Buttons */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-blue-950">{currentCategory}</h1>
            <div className="flex space-x-4">
              <button
                onClick={generateMenu}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Generate
              </button>
              <button
                onClick={() => setIsModal(false)}
                className="px-4 py-2 bg-gray-300 text-blue-950 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Back
              </button>
            </div>
          </div>

          {/* Navigation Buttons and Items */}
          <div className="flex items-start flex-1">
            {/* Previous Button */}
            <button
              className={`p-2 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition duration-200 ${
                currentCategoryIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={prevCategory}
              disabled={currentCategoryIndex === 0}
            >
              <FaArrowLeft className="text-blue-950 h-5 w-5" />
            </button>

            {/* Menu Items */}
            <div className="flex-1 mx-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <MenuItem key={item._id} item={item} />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              className={`p-2 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition duration-200 ${
                currentCategoryIndex === categoryNames.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={nextCategory}
              disabled={currentCategoryIndex === categoryNames.length - 1}
            >
              <FaArrowRight className="text-blue-950 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MenuModal;


// import React, { useEffect, useState } from 'react';
// import MenuItem from './MenuItem';
// import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';

// const MenuModal = ({ isModal, setIsModal }) => {
//   const [groupedItems, setGroupedItems] = useState({});
//   const [categoryNames, setCategoryNames] = useState([]);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const [allItems, setAllItems] = useState([]);

//   const generateMenu = async () => {
//     try {
//       const itemIds = allItems.map(item => item._id); // use all items
  
//       const response = await axios.post('http://localhost:3000/api/menu', {
//         title: 'Main Menu - ' + new Date().toLocaleString(),
//         itemIds
//       });
  
//       if (response.data.success) {
//         alert('Menu generated successfully!');
//         setIsModal(false); // optionally close modal
//       } else {
//         alert('Error generating menu.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while generating the menu.');
//     }
//   };
  
  
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/items');
//         const allItems = response.data;
//         setAllItems(allItems); // save all items
    
//         const grouped = allItems.reduce((acc, item) => {
//           const cat = item.category || 'Uncategorized';
//           acc[cat] = acc[cat] || [];
//           acc[cat].push(item);
//           return acc;
//         }, {});
    
//         setGroupedItems(grouped);
//         setCategoryNames(Object.keys(grouped));
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     };
    
//     if (isModal) fetchItems();
//   }, [isModal]);

//   const nextCategory = () => {
//     if (currentCategoryIndex < categoryNames.length - 1) {
//       setCurrentCategoryIndex((prev) => prev + 1);
//     }
//   };

//   const prevCategory = () => {
//     if (currentCategoryIndex > 0) {
//       setCurrentCategoryIndex((prev) => prev - 1);
//     }
//   };

//   const currentCategory = categoryNames[currentCategoryIndex];
//   const items = groupedItems[currentCategory] || [];

//   return (
//     isModal && (
//       <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center pl-40">
//         <div className="ml-10 w-[90%] h-[90%] overflow-y-scroll scrollbar-hide bg-gray-400 rounded-2xl text-blue-950 p-5 flex items-start">
//           <div className="min-h-svh w-10 mr-5 flex items-center">
//             <button className="h-10 w-10 rounded-2xl border-2 pl-3 cursor-pointer" onClick={prevCategory}>
//               <FaArrowLeft className="text-black" />
//             </button>
//           </div>

//           <div className="ml-10">
//             <div className='flex w-[970px] justify-between'>
//               <h1 className="text-lg font-bold mb-3">{currentCategory}</h1>
//               <div className='flex w-[300px]'>
//                 <button onClick={generateMenu} className='border-2 w-20 rounded-2xl ml-20 bg-blue-400 text-white'>Generate</button>
//                 <button onClick={()=>setIsModal(false)} className='border-2 w-20 rounded-2xl ml-10'>Back</button>
//               </div>
//             </div>
//             <div className="text-xl flex flex-wrap">
//               {items.map((item) => (
//                 <MenuItem key={item._id} item={item} />
//               ))}
//             </div>
//           </div>

//           <div className="min-h-svh w-10 mr-5 flex items-center ml-auto">
//             <button className="h-10 w-10 rounded-2xl border-2 pl-3 cursor-pointer" onClick={nextCategory}>
//               <FaArrowRight className="text-black" />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default MenuModal;
