import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return <div></div>;
};

export default Home;
