import { useSelector } from "react-redux"

import { Navigate } from "react-router-dom";

const Public = ({children}) => {

  const token = useSelector((state)=>state.Auth.token);

  const storedtoken = localStorage.getItem("token");

  if(!token && !storedtoken){

    return children

  } else{

    return <Navigate to="/"></Navigate>

  }

}

export default Public