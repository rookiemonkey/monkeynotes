class NotebookController < ApplicationController

  def all
    response = Array.new

    Category.order(updated_at: :desc).each do |category|
      item = JSON.parse(category.to_json)
      item[:notebooks] = category.notebooks.order(updated_at: :desc)
      response << item
    end

    render json: response
  end

  def notebook
    notebook = Notebook.find_by(slug: params[:slug])
    render json: { notebook: notebook, pages: notebook.pages.order(updated_at: :desc) }
  end

end
