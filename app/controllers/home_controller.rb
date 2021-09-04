class HomeController < ApplicationController
  before_action :is_authorized?, only: %i[form_add form_edit]

  def index; end

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
    pagy, pages = pagy(search_results)
    render json: { pages: pages, count: pages.length, pagination: pagy }
  end

  def search_from_notebooks
    pagy, pages = pagy(search_results.where(notebook_id: params[:notebook_id]).order(updated_at: :desc))
    render json: { pages: pages, count: pages.length, pagination: pagy }
  end


  private

  def search_results
    join = <<-SQL
      INNER JOIN action_text_rich_texts 
        ON action_text_rich_texts.record_id = pages.id 
        AND record_type = 'Page'
    SQL

    # lower(string) - normalizes the data from database to remove case sensitivity
    # ofcourse it should be compared to a normalized version of the query params[:search].downcase
    Page.joins(join).where("lower(action_text_rich_texts.body) LIKE ?", "%#{params[:search].downcase}%")
  end

end
