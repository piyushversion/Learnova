import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/Authslice";
import { setUser } from "../../redux/Userslice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckAuthExpiry = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    const loginTime = localStorage.getItem("loginTime");

    if (token && loginTime) {

      const now = Date.now();

      const twoDays = 2 * 24 * 60 * 60 * 1000; // 2 days in ms

      if (now - loginTime > twoDays) {
        
        localStorage.removeItem("token");

        localStorage.removeItem("userdetails");

        localStorage.removeItem("loginTime");

        dispatch(setToken(null));

        dispatch(setUser(null));

        toast.error("Session expired, please log in again.");

        navigate("/login");

      } else {

        // const user = JSON.parse(localStorage.getItem("userdetails"));

        // const token = localStorage.getItem("token");

        // dispatch(setToken(token));

        // dispatch(setUser(user));

      }

    }

  }, [dispatch, navigate]);

  return null;
};

export default CheckAuthExpiry;
