import React from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
const App = () => {
  return (
    <div>
      <AuthProvider>
        
      <RouterProvider router={router} /> 
      </AuthProvider>
    </div>
  )
}

export default App
