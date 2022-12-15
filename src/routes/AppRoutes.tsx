import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
