import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./auth.routes.jsx";
import { AuthProvider } from "./features/auth/context/auth.context.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
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
