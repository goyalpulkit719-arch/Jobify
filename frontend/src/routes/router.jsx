import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Jobs from "../pages/Jobs.jsx";
import Companies from "../pages/Companies.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import CompanyDetails from "../pages/CompanyDetails.jsx";
import Profile from "../pages/Profile.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup";
import Applied from "../pages/Applied.jsx";
import MyJobs from "../pages/MyJobs.jsx";
import Applications from "../pages/Applications.jsx";
import CandidateProfileApp from "../components/application/CandidateProfileApp.jsx";
import JobApplications from "../pages/JobApplications.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/company/:id",
        element: <CompanyDetails />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/applied",
        element: <Applied />,
      },
      {
        path: "my-jobs",
        element: <MyJobs />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "/company/candidate/:candidateId",
        element: <CandidateProfileApp />,
      },
      {
        path: "/company/jobs/:jobId/applications",
        element: <JobApplications />,
      },
    ],
  },
]);
