import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeToast } from "../store/toastSlice";

const AlertMessage = () => {
  const dispatch = useDispatch();
  const toastState = useSelector((state) => state.toast);

  useEffect(() => {
    if (toastState.isShow) {
      notify();
    }
  }, [toastState]);

  const notify = () =>
    toast(toastState.data.message, {
      type: toastState.data.type,
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default AlertMessage;
