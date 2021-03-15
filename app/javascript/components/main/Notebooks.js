import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
          data.map(item => (
            <li key={item.notebook.id}>
              <h2><Link to={`notebook/${item.notebook.slug}`} >{item.notebook.subject}</Link></h2>

              <ul>
                {
                  item.pages.map(page => (
                    <li>
                      <Link to={`notebook/${item.notebook.slug}/${page.slug}`} >{page.subject}</Link>
                    </li>
                  ))
                }
              </ul>

            </li>
          ))
        }
      </ul>

    </React.Fragment>
  )
}

export default Notebooks