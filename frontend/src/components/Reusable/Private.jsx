import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Private = ({children}) => {

  const token = useSelector((state)=>state.Auth.token);

  const storedtoken = localStorage.getItem("token");

  if(!token && !storedtoken){

    return <Navigate to="/login"></Navigate>

  }

  return children;

}

export default Private