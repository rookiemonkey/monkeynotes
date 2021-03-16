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

      <div className="uk-section uk-padding-remove-top">
        <div className="uk-container">
          <form className="uk-form-stacked" onSubmit={handleOnSubmit}>

            <div className="uk-margin">
              <label className="uk-form-label">Page Subject</label>
              <input type="text"
                className="uk-input uk-form-controls"
                name="page_subject"
                required
              />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Page Language</label>
              <input type="text"
                className="uk-input uk-form-controls"
                name="page_language"
                required
              />
              <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MDs" target="_blank" rel="nofollow noreferrer">
                Please Follow Alias for syntax highlighting
              </a>
            </div>

            <div className="uk-margin">
              <TrixEditor onChange={handleChangeEditor} />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Notebook</label>
              <select className="uk-select uk-form-controls" name="notebook_id" onChange={handleChangeOption}>
                <option value="new" default>New</option>
                {
                  notebooks && notebooks.map(n => (
                    <option key={n.id} value={n.id}>{n.subject}</option>
                  ))
                }
              </select>
            </div>


            {
              state.isNewNotebook && (<div className="uk-margin">
                <label className="uk-form-label">Notebook Subject</label>
                <input type="text"
                  className="uk-input uk-form-controls"
                  name="notebook_subject"
                  required />
              </div>)
            }

            <div className="uk-margin">
              <button type="submit" className="uk-button uk-button-default">Submit</button>
            </div>

          </form>
        </div>
      </div>

    </React.Fragment>
  )
}

export default FormAddPage;