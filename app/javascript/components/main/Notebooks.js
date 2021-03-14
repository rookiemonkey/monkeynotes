import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../shared/Nav'

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = await raw.json()
      setNotebooks(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <ul>
        {
          notebooks.map(n => (
            <li key={n.id}>
              <Link to={n.slug} >{n.subject}</Link>
            </li>
          ))
        }
      </ul>

    </React.Fragment>
  )
}

export default Notebooks