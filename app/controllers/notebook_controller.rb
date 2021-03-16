class NotebookController < ApplicationController

  def all
    render json: Notebook.all
  end


  def all_with_pages
    response = Array.new

    Notebook.order(updated_at: :desc).each do |notebook|
      item = Hash.new
      item[:notebook] = notebook
      item[:pages] = Array.new

      notebook.pages.order(updated_at: :desc).each do |page|
        content = Hash.new
        content[:subject] = page.subject
        content[:slug] = page.slug
        item[:pages] << content
      end

      response << item
    end

    render json: response
  end

  def notebook
    notebook = Notebook.find_by(slug: params[:slug])
    render json: { notebook: notebook, pages: notebook.pages.order(updated_at: :desc) }
  end

end
