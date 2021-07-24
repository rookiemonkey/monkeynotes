import React from 'react';

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

  return (
    <ToastContext.Provider value={options} >
      {children}
    </ToastContext.Provider>
  )
}

export { ToastContext, ToastContextProvider };