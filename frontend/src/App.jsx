import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/axios";
import { update, logout } from "./store/auth";
import { setApplications } from "./store/application";

function App() {
  const dispatch = useDispatch();
  const application = useSelector(store => store.application);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");

        const user = res.data.data;

        dispatch(
          update({
            id: user._id,
            role: user.role,
            name: user.name,
            avatar: user.avatar,
            isLoggedIn: true,
          }),
        );

        if (user.role === "candidate") {
          try {
            const applicationRes = await api.get(
              "/application/myApplications",
            );
            dispatch(setApplications(applicationRes.data.data));
          } catch (err) {
            console.error("Failed to fetch applications:", err);
          }
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);


  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Toaster position="top-center" richColors closeButton />

        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
