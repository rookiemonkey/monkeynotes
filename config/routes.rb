Rails.application.routes.draw do
  
  root                                    to: 'home#index'
  get   '/form/add',                      to: 'home#form_add',                  as: 'form_add'
  get   '/form/edit/:slug',               to: 'home#form_edit',                 as: 'form_edit'
  post  '/search/pages',                  to: 'home#search_from_categories',    as: 'search_from_categories'
  post  '/search/:notebook_id/pages',     to: 'home#search_from_notebooks',     as: 'search_from_notebooks'
  get   '/notebook/all',                  to: 'notebook#all',                   as: 'notebook_all'
  get   '/notebook/:slug',                to: 'notebook#notebook',              as: 'notebook'
  post  '/pages/new',                     to: 'page#create',                    as: 'page_create'
  get   '/pages/:slug',                   to: 'page#page',                      as: 'page'
  post  '/pages/:slug/update',            to: 'page#update',                    as: 'page_update'

end
