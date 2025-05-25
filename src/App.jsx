import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import service from './authservice/auth';
import { login, logout } from './store/authslice';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    service.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
