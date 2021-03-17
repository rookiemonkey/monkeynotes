import React, { useEffect, useState } from 'react'
import NotebookItem from './mini/NotebookItem'
import Nav from '../shared/Nav'

const Notebooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = await raw.json()
      setData(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <h2>{!data && "Loading ...."}</h2>

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">
          <ul className="uk-list">
            {
              data.map(item => <NotebookItem item={item} />)
            }
          </ul>
        </div>
      </div >


    </React.Fragment >
  )
}

export default Notebooks