import {createBrowserRouter} from 'react-router'
import ProtectedRoutes from './features/auth/components/ProtectedRoutes.jsx'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
import Dashboard from './features/auth/pages/Dashboard.jsx'
import InterviewReport from './features/api/pages/InterviewReport.jsx'

export const router = createBrowserRouter([
 
    {
        path:"/Register",
        element:<Register/>
    },
    {
        path:"/Login",
        element:<Login/>
    }
    ,{
        path:"/Dashboard",

        element:<ProtectedRoutes >
            <Dashboard/>
            
        </ProtectedRoutes>
    },{
        path:"/InterviewReport",
        element:<ProtectedRoutes>
            <InterviewReport/>
        </ProtectedRoutes>

    }

])