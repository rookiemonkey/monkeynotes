import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Page = () => {
  const [state, setState] = useState({})
  const { pageSlug } = useParams()

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/pages/${pageSlug}`)
      const data = await raw.json()
      setState(data)
    })()
  }, [])

  return (
    <h1></h1>
  )
}

export default Page