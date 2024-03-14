import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("userLogin");
    if (!login) {
      navigate("/login");
    }
  });
  return !localStorage.getItem("userLogin") ? <></> : <Component />;
};

export default Protected;
