import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNavbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-3 text-center text-white rounded-lg transition duration-200 ${
      isActive ? 'bg-blue-700' : 'hover:bg-blue-600'
    }`;

  return (
    <nav className="bg-gradient-to-b from-blue-900 to-blue-800 fixed h-screen w-64 flex flex-col p-4 z-10 shadow-lg">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          alt="Quick Feat Logo"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="h-10 w-auto"
        />
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          alt="Admin Profile"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="h-20 w-20 rounded-full border-2 border-blue-300 object-cover transform hover:scale-105 transition duration-200"
        />
      </div>

      {/* Welcome Text */}
      <div className="text-center text-white mb-6">
        <p className="text-lg font-semibold">Welcome</p>
        <p className="text-xl font-bold">Admin</p>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-2 text-white font-medium">
        <li>
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/order" className={navLinkClasses}>
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={navLinkClasses}>
            Menu
          </NavLink>
        </li>
      </ul>

      {/* Optional: Mobile toggle button (uncomment if needed) */}
      {/* <button className="lg:hidden absolute top-4 right-4 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button> */}
    </nav>
  );
};

export default LeftNavbar;




















// import React from 'react'
// import {NavLink} from 'react-router-dom'

// const LeftNavbar = () => {
//   return (
//     <div>
//        <nav className="bg-blue-900 fixed h-screen w-50 flex flex-col p-2 z-10">

//         <img  
//             alt="Your Company"
//             src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//             className="h-8 "
//         />
//         <ul className="text-white flex flex-col space-y-2 mt-5 w-full font-semibold">
//             <li><img  
//                 alt="Your Company"
//                 src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//                 className="w-30 h-30 mx-auto mt-3 border-2 rounded-full"
//             /></li>
//             <li><a href="" className="px-8 py-3 w-full block text-center">Welcome</a></li>
//             <li><a href="" className="-mt-5 w-full block text-center text-xl">Admin</a></li>
//             <li><NavLink to="/" className="mt-10 border-b-1 px-8 py-3 w-full block text-center rounded-md hover:border-1 hover:rounded-md">Home</NavLink></li>
//             <li><NavLink to="/order" className="border-b-1 px-8 py-3 w-full block text-center rounded-md hover:border-1 hover: rounded-md">Order</NavLink></li>
//             <li><NavLink to="/menu" className="border-b-1 px-8 py-3 w-full block text-center rounded-md hover:border-1 hover: rounded-md">Menu</NavLink></li>
//         </ul>
//         </nav>
      
//     </div>
//   )
// }

// export default LeftNavbar
