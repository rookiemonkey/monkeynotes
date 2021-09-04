import React, { useCallback, useState } from 'react';

const NotebooksContext = React.createContext();

const NotebooksContextProvider = ({ children }) => {
  const notebookMap = {}

  const defineNotebookMap = useCallback(categories => {
    categories.forEach(category => category.notebooks.forEach(notebook => notebookMap[notebook.id] = notebook.slug));
  }, [])

  return (
    <NotebooksContext.Provider value={{ notebookMap, defineNotebookMap }} >
      {children}
    </NotebooksContext.Provider>
  )
}

export { NotebooksContext, NotebooksContextProvider };