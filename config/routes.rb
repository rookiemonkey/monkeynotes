Rails.application.routes.draw do
  

  get '/notebook/all',      to: 'notebook#all',       as: 'notebook_all'
  get '/notebook/:id',      to: 'notebook#notebook',  as: 'notebook'

end
