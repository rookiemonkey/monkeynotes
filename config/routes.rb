Rails.application.routes.draw do
  
  root                            to: 'home#index'
  get   '/notebook/all',          to: 'notebook#all',                   as: 'notebook_all'
  get   '/notebook/all_details',  to: 'notebook#all_with_pages',        as: 'notebook_all_with_pages'
  get   '/notebook/:slug',        to: 'notebook#notebook',              as: 'notebook'
  post  '/pages/new',             to: 'page#create',                    as: 'page_create'
  get   '/pages/:slug',           to: 'page#page',                      as: 'page'

end
