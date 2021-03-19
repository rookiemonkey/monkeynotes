class HomeController < ApplicationController

  def index
  end

  def form
    notebooks = Notebook.select(:id, :subject)
    categories = Category.select(:id, :subject)
    render json: { notebooks: notebooks, categories: categories }
  end

  def search_from_categories
    join = <<-SQL
      INNER JOIN action_text_rich_texts 
        ON action_text_rich_texts.record_id = pages.id 
        AND record_type = 'Page'
    SQL

    pages = Page.joins(join)
                .where("action_text_rich_texts.body LIKE ?", "%#{params[:search]}%")

    render json: { pages: pages, count: pages.length }
  end

  def search_from_notebooks
    join = <<-SQL
      INNER JOIN action_text_rich_texts 
        ON action_text_rich_texts.record_id = pages.id 
        AND record_type = 'Page'
    SQL

    pages = Page.joins(join)
                .where("action_text_rich_texts.body LIKE ?", "%#{params[:search]}%")
                .where(notebook_id: params[:notebook_id])

    render json: { pages: pages, count: pages.length }
  end

end
