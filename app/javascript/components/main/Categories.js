import React, { useEffect, useState } from 'react'
import CategoryItem from './mini/CategoryItem'
import Nav from '../shared/Nav'

const Categories = () => {
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
        <div className="uk-container uk-width-1-2@l">
          <ul className="uk-list">
            {
              data.map(category => <CategoryItem category={category} />)
            }
          </ul>
        </div>
      </div >


    </React.Fragment >
  )
}

export default Categories