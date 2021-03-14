import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../shared/Nav'

const Notebook = () => {
  const [state, setState] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/notebook/${slug}`)
      const data = await raw.json()
      setState(data)
    })()
  }, [])

  return (
    <React.Fragment>
      <Nav />

      <p>You are view notebook</p>
      <p>Name: {state.notebook && state.notebook.subject}</p>
    </React.Fragment>
  )
}

export default Notebook