Rails.application.routes.draw do
  
  root                                    to: 'home#index'
  get   '/form',                          to: 'home#form',                      as: 'form'
  post   '/search/pages',                 to: 'home#search_from_categories',    as: 'search_from_categories'
  post   '/search/:notebook_id/pages',    to: 'home#search_from_notebooks',     as: 'search_from_notebooks'
  get   '/notebook/all',                  to: 'notebook#all',                   as: 'notebook_all'
  get   '/notebook/:slug',                to: 'notebook#notebook',              as: 'notebook'
  post  '/pages/new',                     to: 'page#create',                    as: 'page_create'
  get   '/pages/:slug',                   to: 'page#page',                      as: 'page'

end
