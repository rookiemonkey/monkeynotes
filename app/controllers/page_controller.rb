class PageController < ApplicationController

  def create
    if params[:notebook_id] == 'new' and params[:notebook_subject].present?
      if params[:category_id] == 'new'
        category = Category.create(subject: params[:category_subject])
        create_page_for Notebook.create(subject: params[:notebook_subject], category: category) 
      else
        category = Category.find(params[:category_id])
        create_page_for Notebook.create(subject: params[:notebook_subject], category: category) 
      end
    else
      create_page_for Notebook.find(params[:notebook_id].to_i)
    end
  end

  def page
    page = Page.find_by(slug: params[:slug])
    render json: { notebook: page.notebook, page: page }
  end




  private

  def create_page_for(notebook)
    notebook.pages.create(subject: params[:page_subject], 
                          content: params[:content], 
                          language: params[:page_language].downcase)
  end

end
