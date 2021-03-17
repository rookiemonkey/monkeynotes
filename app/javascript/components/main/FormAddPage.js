import React, { useCallback, useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import Nav from '../shared/Nav'
import parseForm from '../utilities/parseForm';

const FormAddPage = () => {
  const [state, setState] = useState({ isNewNotebook: true, isNewCategory: true })
  const [dataFromDb, setDataFromDb] = useState({});

  useEffect(() => {
    (async () => {
      const raw = await fetch('/form')
      const res = await raw.json()
      setDataFromDb(res)
    })()
  }, [])

  const handleChangeEditor = useCallback(html => setState({ ...state, html }))

  const handleChangeOption = useCallback(({ target }) =>
    target.value == 'new'
      ? setState({ ...state, [target.dataset.state]: true })
      : setState({ ...state, [target.dataset.state]: false })
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
          <form className="uk-grid uk-grid-small" onSubmit={handleOnSubmit}>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Page Subject</label>
              <input type="text"
                className="uk-input uk-form-controls"
                name="page_subject"
                required
              />
            </div>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Page Language</label>
              <span className="uk-form-helper">
                <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MDs" target="_blank" rel="nofollow noreferrer">
                  Please Follow Alias for syntax highlighting
                </a>
              </span>
              <input type="text"
                className="uk-input uk-form-controls"
                name="page_language"
                required
              />
            </div>

            <div className="uk-margin-bottom uk-width-4-4@l">
              <TrixEditor onChange={handleChangeEditor} />
            </div>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Notebook</label>
              <span className="uk-form-helper">What notebook does this new page relates to?</span>
              <select className="uk-select uk-form-controls" name="notebook_id" onChange={handleChangeOption} data-state="isNewNotebook">
                <option value="new" default>New</option>
                {
                  dataFromDb.notebooks && dataFromDb.notebooks.map(n => (
                    <option key={n.id} value={n.id}>{n.subject}</option>
                  ))
                }
              </select>
            </div>


            {
              state.isNewNotebook && (
                <div className="uk-margin-bottom uk-width-1-2@l">
                  <label className="uk-form-label">Notebook Subject</label>
                  <input type="text"
                    className="uk-input uk-form-controls"
                    name="notebook_subject"
                    required />
                </div>
              )
            }

            {
              state.isNewNotebook && (
                <div className="uk-margin-bottom uk-width-1-2@l">
                  <label className="uk-form-label">Category</label>
                  <span className="uk-form-helper">Where does this new notebook belong?</span>
                  <select className="uk-select uk-form-controls" name="category_id" onChange={handleChangeOption} data-state="isNewCategory">
                    <option value="new">New</option>
                    {
                      dataFromDb.categories && dataFromDb.categories.map(c => (
                        <option key={c.id} value={c.id}>{c.subject}</option>
                      ))
                    }
                  </select>
                </div>
              )
            }

            {
              (state.isNewNotebook && state.isNewCategory) && (
                <div className="uk-margin-bottom uk-width-1-2@l">
                  <label className="uk-form-label">Category Subject</label>
                  <input type="text"
                    className="uk-input uk-form-controls"
                    name="category_subject"
                    required />
                </div>
              )
            }

            <div className="uk-width-4-4@l">
              <button type="submit" className="uk-button uk-button-default">Submit</button>
            </div>

          </form>
        </div>
      </div>

    </React.Fragment>
  )
}

export default FormAddPage;