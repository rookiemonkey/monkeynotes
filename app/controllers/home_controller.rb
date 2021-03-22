class HomeController < ApplicationController

  def index
  end

  def form_add
    notebooks = Notebook.select(:id, :subject)
    categories = Category.select(:id, :subject)
    render json: { notebooks: notebooks, categories: categories }
  end

  def form_edit
    categories = Category.select(:id, :subject)
    notebooks = Notebook.select(:id, :subject, :category_id)
    page = Page.find_by slug: params[:slug]
    render json: { notebooks: notebooks, categories: categories, page: page }
  end

  def search_from_categories
    pages = search_results
    render json: { pages: pages, count: pages.length }
  end

  def search_from_notebooks
    pages = search_results.where(notebook_id: params[:notebook_id])
    render json: { pages: pages, count: pages.length }
  end


  private

  def search_results
    join = <<-SQL
      INNER JOIN action_text_rich_texts 
        ON action_text_rich_texts.record_id = pages.id 
        AND record_type = 'Page'
    SQL

    Page.joins(join).where("action_text_rich_texts.body LIKE ?", "%#{params[:search]}%")
  end

end
