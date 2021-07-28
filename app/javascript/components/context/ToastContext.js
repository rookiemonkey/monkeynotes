import React from 'react';
import { toast } from 'react-toastify'

const ToastContext = React.createContext();

const ToastContextProvider = ({ children }) => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const notify = message => toast(message, options)

  return (
    <ToastContext.Provider value={notify} >
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContext, ToastContextProvider };