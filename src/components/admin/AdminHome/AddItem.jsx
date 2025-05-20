import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddItem = ({ isModal, setIsModal, fetchItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setNotification(null);
    try {
      const formData = new FormData();
      formData.append('itemName', data.itemName);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('availability', data.availability);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await axios.post('http://localhost:3000/api/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 201) {
        setNotification({ type: 'success', message: 'Item added successfully!' });
        fetchItems();
        reset();
        setTimeout(() => setIsModal(false), 1000);
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to add item';
      setNotification({ type: 'error', message });
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    isModal && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 animate-fade-in text-black">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add New Menu Item</h2>
            <button
              aria-label="Close modal"
              onClick={() => setIsModal(false)}
              className="text-white hover:text-gray-200 transition duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Item Name */}
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  id="itemName"
                  type="text"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.itemName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Pizza"
                  {...register('itemName', { required: 'Item Name is required' })}
                />
                {errors.itemName && (
                  <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Chicken Tikka + Sauce"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="2000"
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 1, message: 'Price must be positive' },
                    validate: (value) => !isNaN(value) || 'Price must be a number',
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select One</option>
                  <option value="fastFood">Fast Food</option>
                  <option value="traditional">Traditional</option>
                  <option value="desiFood">Desi Food</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('image', { required: 'Image is required' })}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <select
                  id="availability"
                  className={`mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${
                    errors.availability ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('availability', { required: 'Availability is required' })}
                >
                  <option value="">Select One</option>
                  <option value="available">Available</option>
                  <option value="notAvailable">Not Available</option>
                </select>
                {errors.availability && (
                  <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  ) : (
                    'Add Item'
                  )}
                </button>
              </div>
            </form>
          </div>

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
        </div>
      </div>
    )
  );
};

export default AddItem;













// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const AddItem = ({ isModal, setIsModal, setFoodItems }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append('itemName', data.itemName);
//       formData.append('description', data.description);
//       formData.append('price', data.price);
//       formData.append('category', data.category);
//       formData.append('availability', data.availability);

//       if (data.image && data.image[0]) {
//         formData.append('image', data.image[0]);
//       }

//       const response = await axios.post('http://localhost:3000/api/item', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
        
//         const response1 = await axios.get('http://localhost:3000/api/items');
//         setFoodItems(response1.data);

//         alert('Item added successfully!');
//         setIsModal(false);
//       } else {
//         alert('Something went wrong.');
//          setIsModal(false);
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert(error?.response?.data?.message || 'Upload error');
//     }
//   };

//   return (
//     isModal && (
//       <>
//         <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
//             <div className="flex justify-between items-center border-b p-4 text-white bg-blue-900 rounded-t-lg">
//               <h2 className="text-xl font-semibold">Add New Menu Item</h2>
//               <button
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={() => {
//                   setIsModal(false);
//                 }}
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>
//             <div className="p-4">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 {/* Item Name */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
//                     Item Name
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="itemName"
//                     type="text"
//                     {...register('itemName', { required: 'Item Name is required' })}
//                     placeholder="Pizza"
//                   />
//                   {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>}
//                 </div>

//                 {/* Description */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                     Description
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="description"
//                     type="text"
//                     {...register('description', { required: 'Description is required' })}
//                     placeholder="Chicken Tikka + Sauce"
//                   />
//                   {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
//                 </div>

//                 {/* Price */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                     Price
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="price"
//                     type="number"
//                     {...register('price', {
//                       required: 'Price is required',
//                       min: { value: 1, message: 'Price must be positive' },
//                       validate: (value) => !isNaN(value) || 'Price must be a number',
//                     })}
//                     placeholder="2000"
//                   />
//                   {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//                 </div>

//                 {/* Category */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//                     Category
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="category"
//                     {...register('category', { required: 'Category is required' })}
//                   >
//                     <option value="">Select One</option>
//                     <option value="fastFood">Fast Food</option>
//                     <option value="traditional">Traditional</option>
//                     <option value="desiFood">Desi Food</option>
//                   </select>
//                   {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
//                 </div>

//                 {/* Image */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
//                     Image
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     {...register('image', { required: 'Image is required' })}
//                   />
//                   {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
//                 </div>

//                 {/* Availability */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
//                     Availability
//                   </label>
//                   <select
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="availability"
//                     {...register('availability', { required: 'Availability is required' })}
//                   >
//                     <option value="">Select One</option>
//                     <option value="available">Available</option>
//                     <option value="notAvailable">Not Available</option>
//                   </select>
//                   {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                   >
//                     Add Item
//                   </button>
//                   <button
//                     className="text-gray-500 hover:text-gray-700 cursor-pointer"
//                     type="button"
//                     onClick={() => {
//                       setIsModal(false);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
//     )
//   );
// };

// export default AddItem;