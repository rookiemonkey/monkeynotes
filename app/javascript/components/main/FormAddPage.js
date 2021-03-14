import React, { useCallback, useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import Nav from '../shared/Nav'
import parseForm from '../utilities/parseForm';

const FormAddPage = () => {
  const [state, setState] = useState({ isNewNotebook: true })
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    (async () => {
      const raw = await fetch('/notebook/all')
      const data = await raw.json()
      setNotebooks(data)
    })()
  }, [])

  const handleChangeEditor = useCallback(html => setState({ ...state, html }))

  const handleChangeOption = useCallback(({ target }) =>
    target.value == 'new'
      ? setState({ ...state, isNewNotebook: true })
      : setState({ ...state, isNewNotebook: false })
  )

  const handleOnSubmit = useCallback(async e => {
    e.preventDefault()
    const raw = new FormData(e.target)
    const data = parseForm(raw)
    const token = document.querySelector('meta[name="csrf-token"]').content

    const res = await fetch('/pages/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, },
      body: JSON.stringify({ ...data, content: state.html })
    })
  })

  return (
    <React.Fragment>
      <Nav />

      <form onSubmit={handleOnSubmit}>

        <input type="text" name="page_subject" placeholder="Page Subject" />

        <input type="text" name="page_language" placeholder="Page Language" />

        <TrixEditor onChange={handleChangeEditor} />

        <select name="notebook_id" onChange={handleChangeOption}>
          <option value="new" default>New</option>
          {
            notebooks && notebooks.map(n => (
              <option key={n.id} value={n.id}>{n.subject}</option>
            ))
          }
        </select>

        {
          state.isNewNotebook && <input type="text" name="notebook_subject" placeholder="Notebook Subject" />
        }

        <button type="submit">Submit</button>

      </form>

    </React.Fragment>
  )
}

export default FormAddPage;