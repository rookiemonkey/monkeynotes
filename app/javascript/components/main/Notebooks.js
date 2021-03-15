import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NotebookItem from './mini/NotebookItem'
import Nav from '../shared/Nav'

const Notebooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all_details')
      const data = await raw.json()
      setData(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <h2>{!data && "Loading ...."}</h2>

      <Link to="/add/page">Add Page</Link>

      <ul>
        {
          data.map(item => <NotebookItem item={item} />)
        }
      </ul>

    </React.Fragment>
  )
}

export default Notebooks