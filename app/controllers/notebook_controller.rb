class NotebookController < ApplicationController

  def all
    render json: Notebook.all
  end


  def all_with_pages
    response = Array.new

    Notebook.all.each do |notebook|
      item = Hash.new
      item[:notebook] = notebook
      item[:pages] = Array.new
      notebook.pages.each { |page| item[:pages] << page.subject }
      response << item
    end

    render json: response
  end

  def notebook
    notebook = Notebook.find_by(slug: params[:slug])
    pages = notebook.pages
    render json: { notebook: notebook, pages: pages }
  end

end
