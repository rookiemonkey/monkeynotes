class PageController < ApplicationController

  before_action :set_is_new_notebook, only: [:create, :update]

  def create
    create_page_with_associations if @is_new_notebook
    create_page_only_for Notebook.find(page_params[:notebook_id].to_i) unless @is_new_notebook
  end

  def update
    @page = Page.find_by(slug: params[:slug])
    @page.update page_params
    create_page_with_associations if @is_new_notebook
  end

  def page
    @page = Page.find_by(slug: params[:slug])
    render json: { notebook: @page.notebook, page: @page }
  end




  private

  def page_params
    params.require(:page).permit(:subject, :language, :content, :notebook_id)
  end

  def page_params_others
    params.require(:page).permit(:subject, :language, :content, :notebook_id, :notebook_subject, :category_id, :category_subject, :is_update)
  end

  def set_is_new_notebook
    @is_new_notebook = (page_params[:notebook_id] == 'new' and 
                        page_params_others[:notebook_subject].present?)
  end

  def create_page_only_for(notebook)
    notebook.pages.create(subject: page_params[:subject], 
                          content: page_params[:content], 
                          language: page_params[:language])
  end

  def create_page_with_associations
    create_new_category_and_notebook_for_page if page_params_others[:category_id] == 'new'
    create_new_notebook_only_for_page unless page_params_others[:category_id] == 'new'
  end

  def create_new_category_and_notebook_for_page
    category = Category.create(subject: page_params_others[:category_subject])
    notebook = Notebook.create(subject: page_params_others[:notebook_subject], category: category)
    create_page_only_for notebook unless page_params_others[:is_update].to_bool
    notebook.pages << @page if page_params_others[:is_update].to_bool
  end

  def create_new_notebook_only_for_page
    category = Category.find(page_params_others[:category_id])
    notebook = Notebook.create(subject: page_params_others[:notebook_subject], category: category)
    create_page_only_for notebook unless page_params_others[:is_update].to_bool
    notebook.pages << @page if page_params_others[:is_update].to_bool
  end

end
