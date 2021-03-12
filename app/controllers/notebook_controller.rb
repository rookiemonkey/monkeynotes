class NotebookController < ApplicationController

  def all
    @notebooks = Notebook.all
    render json: @notebooks
  end

  def notebook
    @notebook = Notebook.find params[:id]
    @pages = @notebook.pages
    render json: { notebook: @notebook, pages: @pages }
  end

end
