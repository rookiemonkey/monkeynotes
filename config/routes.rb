Rails.application.routes.draw do
  
  root                      to: 'home#index'
  get '/notebook/all',      to: 'notebook#all',       as: 'notebook_all'
  get '/notebook/:slug',    to: 'notebook#notebook',  as: 'notebook'

end
