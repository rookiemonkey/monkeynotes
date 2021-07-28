import React, { useState, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import DayJS from 'react-dayjs'
import CategoryItemModalDelete from './CategoryItemModalDelete'
import CategoryItemModalUpdate from './CategoryItemModalUpdate'
import { AuthContext } from '../../context/AuthContext'

const CategoryItem = props => {
  const { isLoggedIn } = useContext(AuthContext)
  const [isModalDeletionOpen, setIsModalDeletionOpen] = useState(false)
  const [isModalUpdatingOpen, setIsModalUpdatingOpen] = useState(false)
  const [category, setCategory] = useState(props.category)

  const openModalForDeletion = useCallback(() => setIsModalDeletionOpen(true), [])
  const closeModalForDeletion = useCallback(() => setIsModalDeletionOpen(false), [])
  const openModalForUpdating = useCallback(() => setIsModalUpdatingOpen(true), [])
  const closeModalForUpdating = useCallback(() => setIsModalUpdatingOpen(false), [])

  const updateCategory = useCallback(newCategorySubject => {
    setCategory(prevCategory => ({ ...prevCategory, subject: newCategorySubject}))
  })

  const removeCategory = useCallback(categorySubject => {
    props.removeCategoryFromState(categorySubject)
  })

  return (
    <li className="category-item uk-margin-medium-bottom uk-padding-small" key={category.id}>

      {
        isLoggedIn 
          ? (<React.Fragment>
            <CategoryItemModalDelete
              category={category}
              isOpen={isModalDeletionOpen}
              closeModal={closeModalForDeletion}
              removeCategory={removeCategory}
            />
            <CategoryItemModalUpdate
              category={category}
              isOpen={isModalUpdatingOpen}
              closeModal={closeModalForUpdating}
              updateCategory={updateCategory}
            />
          </React.Fragment>)
          : null
      }

      <div className="category-header-container uk-margin-bottom">
        <h2 className="category-header">
          {category.subject}
        </h2>
        <span className="category-subheader">
          {
            isLoggedIn
              ? (<React.Fragment>
                <span uk-icon="trash" className="delete-icon" style={{ marginRight: '5px' }} onClick={openModalForDeletion}></span>
                <span uk-icon="pencil" className="edit-icon" style={{ marginRight: '5px' }} onClick={openModalForUpdating}></span>
              </React.Fragment>)
              : null
          }
          Updated as of <DayJS format="MM-DD-YYYY">{category.updated_at}</DayJS>
        </span>
      </div>

      <ul className="uk-list uk-list-hyphen" id="list-notebook-pages">
        {
          category.notebooks.map(notebook => (
            <li key={notebook.slug}>
              <Link to={{
                pathname: `notebook/${notebook.slug}`,
                state: { notebook: { subject: notebook.subject, slug: notebook.slug } }
              }}
              >{notebook.subject}</Link>
            </li>
          ))
        }
      </ul>

    </li>
  )
}

export default CategoryItem