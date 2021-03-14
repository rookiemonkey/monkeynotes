class PageController < ApplicationController

  def create
    if params[:notebook_id] == 'new' and params[:notebook_subject].present?
      create_page_for Notebook.create(subject: params[:notebook_subject]) 
    else
      create_page_for Notebook.find(params[:notebook_id].to_i)
    end
  end




  private

  def create_page_for(notebook)
    notebook.pages.create(subject: params[:page_subject], 
                          content: params[:content], 
                          language: params[:page_language].downcase)
  end

end
