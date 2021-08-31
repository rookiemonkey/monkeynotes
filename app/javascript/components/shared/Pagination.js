import React from 'react'

const Pagination = ({ data, numPagesToShow, toSearch }) => {

  const pages = [...Array(data.pages).keys()].map(page => page+=1)

  const prev5Pages = data.page - numPagesToShow
  const next5Pages = data.page + numPagesToShow

  const nextPages = []
  const prevPages = []

  for (let i = 0; i < pages.length; i++) {
    let pageNum = pages[i]
    let isCurrentPage = pageNum == data.page
    let isWithinRange = pageNum >= prev5Pages && pageNum <= next5Pages
    
    if (isCurrentPage) continue
    if (!isWithinRange) continue
    
    if (pageNum > data.page) nextPages.push(pageNum)
    if (pageNum < data.page) prevPages.push(pageNum)
  }

  return (
    <ul className="uk-pagination uk-margin uk-flex-center">
      {
        (data.page > 1) && (
          <li><a onClick={() => toSearch(1)}><span uk-icon="chevron-double-left"></span></a></li>
        )
      }

      {
        (prevPages.length >= 1) && (
          <li><a onClick={() => toSearch(data.page - 1)}><span uk-icon="chevron-left"></span></a></li>
        )
      }

      {
        prevPages.map(pageNum =>
          <li key={pageNum}>
            <a onClick={() => toSearch(pageNum)}>{pageNum}</a>
          </li>
        )
      }

      <li className="uk-active"><a>{data.page}</a></li>

      {
        nextPages.map(pageNum =>
          <li key={pageNum}>
            <a onClick={() => toSearch(pageNum)}>{pageNum}</a>
          </li>
        )
      }

      {
        (nextPages.length >= 1) && (
          <li><a onClick={() => toSearch(data.page + 1)}><span uk-icon="chevron-right"></span></a></li>
        )
      }

      {
        (data.page < data.last) && (
          <li><a onClick={() => toSearch(data.last)}><span uk-icon="chevron-double-right"></span></a></li>
        )
      }
    </ul>
  )
}

export default Pagination;