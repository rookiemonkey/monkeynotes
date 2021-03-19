import React, { useEffect, useState } from 'react'
import Nav from '../shared/Nav'
import Loader from '../shared/Loader'
import CategoryItem from './mini/CategoryItem'

const Categories = () => {
  const [state, setState] = useState({ isLoaded: false, data: [] });

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = await raw.json()
      setState({ isLoaded: true, data })
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container uk-width-1-2@l">

          {!state.isLoaded && <Loader />}

          <ul className="uk-list">
            {
              state.data.map(category => <CategoryItem category={category} />)
            }
          </ul>

        </div>
      </div >

    </React.Fragment >
  )
}

export default Categories