import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Jobs from "../pages/Jobs.jsx";
import Companies from "../pages/Companies.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import CompanyDetails from "../pages/CompanyDetails.jsx";
import Profile from "../pages/Profile.jsx";

export const router = createBrowserRouter([

    {
        path: "/", element: <App/>,
        
        children: [
            {
                index: true,
                element: <Home/> 
            },
            {
                path: "/jobs",
                element: <Jobs/>,
            },
            {
                path: "/companies",
                element: <Companies/>
            },
            {
                path: "/job/:id",
                element: <JobDetails/>,
            },
            {
                path: "/company/:id",
                element: <CompanyDetails/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            }
        ]
    },
    

]);