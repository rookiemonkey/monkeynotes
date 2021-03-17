class HomeController < ApplicationController

  def index
  end

  def form
    notebooks = Notebook.select(:id, :subject)
    categories = Category.select(:id, :subject)
    render json: { notebooks: notebooks, categories: categories }
  end

end
