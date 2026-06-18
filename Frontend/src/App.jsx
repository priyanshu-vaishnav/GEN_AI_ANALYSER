import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./auth.routes.jsx";
import { AuthProvider } from "./features/auth/context/auth.context.jsx";

import "./styles.css";


function App() {
  return (
    <>
      <AuthProvider>
        

        <RouterProvider router={router} />
      
      </AuthProvider>
    </>
  );
}

export default App;
