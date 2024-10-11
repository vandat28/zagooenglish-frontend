import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return <ToastContainer />;
};

export const notifySuccess = (message: string) => {
  toast.success(message);
};

export const notifyError = (message: string) => {
  toast.error(message);
};

export const notifyInfo = (message: string) => {
  toast.info(message);
};

export const notifyWarning = (message: string) => {
  toast.warn(message);
};

export const notifyDefault = (message: string) => {
  toast(message);
};

export default ToastNotification;
