import React, { useEffect, useState } from 'react'
import Nav from '../shared/Nav'

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = raw.json()
      setNotebooks(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

    </React.Fragment>
  )
}

export default Notebooks