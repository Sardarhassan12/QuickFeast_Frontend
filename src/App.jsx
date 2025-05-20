import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomeDashboard from './components/admin/AdminHome/HomeDashboard';
import OrderDashboard from './components/admin/AdminOrder/OrderDashboard';
import MenuDashboard from './components/admin/AdminMenu/MenuDashboard';
import UserMenu from './components/admin/UserPanel/UserMenu';
import Login from './components/admin/Login';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/order',
    element: (
      <ProtectedRoute>
        <OrderDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/menu',
    element: (
      <ProtectedRoute>
        <MenuDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/:menuId/table/:tableNumber',
    element: <UserMenu />,
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;















// import { useState } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import HomeDashboard from './components/admin/AdminHome/HomeDashboard';
// import OrderDashboard from './components/admin/AdminOrder/OrderDashboard';
// import MenuDashboard from './components/admin/AdminMenu/MenuDashboard';
// import UserMenu from './components/admin/UserPanel/UserMenu';
// import Login from './components/Login';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomeDashboard />
//   },
//   {
//     path: '/order',
//     element: <OrderDashboard />
//   },
//   {
//     path: '/menu',
//     element: <MenuDashboard />
//   },
//   {
//     path: '/user/:menuId/table/:tableNumber',
//     element: <UserMenu />
//   }
// ]);

// function App() {
//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;