import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils/getCookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import DashboardTop from '../components/DashboardTop';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/login");
      });
  }, [navigate]);

 

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <DashboardTop />
      <DashboardContent />
    </>
  );
};

export default Dashboard;