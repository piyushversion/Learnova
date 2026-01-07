import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import toast from "react-hot-toast";

const Protected = ({ children,role }) => {

  const user = useSelector((state) => state.User.user);

  const token = useSelector((state) => state.Auth.token);

  if (!token || !user) {
    
    return <Navigate to="/login"/>;

  }

  const userRole = user?.userinfo?.accounttype;

  if (!role.includes(userRole)) {

    toast.error("You are not authorized to access this page");

    return <Navigate to="/" />;

  }

  return children;

};

export default Protected;