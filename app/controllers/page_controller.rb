class PageController < ApplicationController

  def create
    if params[:notebook_id] == 'new' and params[:notebook_subject].present?
      notebook = Notebook.create(subject: params[:notebook_subject])
      notebook.pages.create(subject: params[:page_subject], content: params[:content])
    else
      notebook = Notebook.find(params[:notebook_id].to_i)
      notebook.pages.create(subject: params[:page_subject], content: params[:content])
    end
  end

end
