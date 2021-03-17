Rails.application.routes.draw do
  
  root                            to: 'home#index'
  get   '/form',                  to: 'home#form',                      as: 'form'
  get   '/notebook/all',          to: 'notebook#all',                   as: 'notebook_all'
  get   '/notebook/:slug',        to: 'notebook#notebook',              as: 'notebook'
  post  '/pages/new',             to: 'page#create',                    as: 'page_create'
  get   '/pages/:slug',           to: 'page#page',                      as: 'page'

end
