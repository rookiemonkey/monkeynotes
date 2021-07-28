import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TrixEditor } from "react-trix";
import Nav from '../shared/Nav'
import parseForm from '../utilities/parseForm'
import simplifiedFetch from '../utilities/simplifiedFetch';
import { ToastContext } from '../context/ToastContext';

const FormEditPage = () => {
  const notify = useContext(ToastContext)
  const { pageSlug } = useParams()
  const [state, setState] = useState({ isNewNotebook: false, isNewCategory: true })
  const [form, setForm] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const raw = await fetch(`/form/edit/${pageSlug}`)
      const res = await raw.json()
      setData(res)
      setForm({ ...res.page })
      setState({ ...state, html: res.page.content.body })
    })()
  }, [])

  const handleChangeEditor = useCallback(html => setState({ ...state, html }))

  const handleChangeInputs = useCallback(({ target }) => setForm({ ...form, [target.name]: target.value }))

  const handleChangeOption = useCallback(({ target }) =>
    target.value == 'new'
      ? setState({ ...state, [target.dataset.state]: true })
      : setState({ ...state, [target.dataset.state]: false })
  )

  const handleOnSubmit = useCallback(async e => {
    e.preventDefault()
    const formdata = parseForm(new FormData(e.target))
    const parameter = { page: { ...formdata, content: state.html, is_update: 'true' } }
    const response = await simplifiedFetch(`/pages/${pageSlug}/update`, 'POST', parameter)
    notify(response.message)
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
                value={form.subject && form.subject}
                onChange={handleChangeInputs}
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
                name="language"
                value={form.language && form.language}
                onChange={handleChangeInputs}
                required
              />
            </div>

            <div className="uk-margin-bottom uk-width-4-4@l">
              {
                !data.page && <TrixEditor />
              }
              {
                data.page && <TrixEditor
                  onChange={handleChangeEditor}
                  value={data.page.content && data.page.content.body}
                />
              }
            </div>

            <div className="uk-margin-bottom uk-width-1-2@l">
              <label className="uk-form-label">Notebook</label>
              <span className="uk-form-helper">What notebook does this new page relates to?</span>
              {
                !data.page && (
                  <select className="uk-select uk-form-controls" defaultValue="new">
                  </select>
                )
              }

              {
                data.page && (
                  <select className="uk-select uk-form-controls" name="notebook_id" onChange={handleChangeOption} data-state="isNewNotebook" defaultValue={data.page.notebook_id}>
                    <option value="new">New</option>
                    {
                      data.notebooks && data.notebooks.map(n =>
                        <option key={n.id} value={n.id}>{n.subject}</option>
                      )
                    }
                  </select>
                )
              }
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
                      data.categories && data.categories.map(c =>
                        <option key={c.id} value={c.id}>{c.subject}</option>
                      )
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
              <button type="submit" className="uk-button uk-button-default">
                <span uk-icon="check" style={{ marginRight: '5px' }}></span>
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>

    </React.Fragment >
  )
}

export default FormEditPage