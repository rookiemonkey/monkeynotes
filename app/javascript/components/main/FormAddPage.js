import React, { useCallback, useState, useEffect, useContext } from 'react'
import { TrixEditor } from "react-trix";
import Nav from '../shared/Nav'
import parseForm from '../utilities/parseForm';
import simplifiedFetch from '../utilities/simplifiedFetch';
import { ToastContext } from '../context/ToastContext';

const FormAddPage = () => {
  const notify = useContext(ToastContext)
  const [state, setState] = useState({ isNewNotebook: true, isNewCategory: true })
  const [dataFromDb, setDataFromDb] = useState({});

  useEffect(() => {
    (async () => {
      const raw = await fetch('/form/add')
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
    const formData = parseForm(new FormData(e.target))
    const parameter = { page: { ...formData, content: state.html, is_update: 'false' } }
    const response = await simplifiedFetch('/pages/new', 'POST', parameter)
    notify(response.message)
    e.target.reset();
  })

  return (
    <React.Fragment>
      <Nav />

      <div className="uk-section uk-section-form uk-padding-remove-top">
        <div className="uk-container">
          <form className="uk-grid uk-grid-small" onSubmit={handleOnSubmit}>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Page Subject</label>
              <input type="text"
                className="uk-input uk-form-controls"
                name="subject"
                required
                autoComplete="off"
              />
            </div>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Page Language</label>
              <span className="uk-form-helper">
                <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_HLJS.MD" target="_blank" rel="nofollow noreferrer">
                  Please Follow Alias for syntax highlighting
                </a>
              </span>
              <input type="text"
                className="uk-input uk-form-controls"
                name="language"
                required
                autoComplete="off"
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
                    required 
                    autoComplete="off"
                  />
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
                    required 
                    autoComplete="off"
                  />
                </div>
              )
            }

            <div className="uk-width-4-4@l">
              <button type="submit" className="uk-button uk-button-default">
                <span uk-icon="check" style={{ marginRight: '5px' }}></span>
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>

    </React.Fragment>
  )
}

export default FormAddPage;