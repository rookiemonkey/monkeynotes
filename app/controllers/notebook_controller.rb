class NotebookController < ApplicationController
  before_action :is_authorized?, only: %i[delete update]
  before_action :set_notebook, except: %i[all]

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
    render json: { notebook: @notebook, pages: @notebook.pages.order(updated_at: :desc) }
  end

  def delete
    @notebook.destroy
    render json: { message: 'Successfully deleted the notebook' }, status: :ok
  end

  def update
    @notebook.update(subject: params[:subject])
    render json: { message: 'Successfully updated the notebook', data: @notebook }, status: :ok
  end

  private

  def set_notebook
    @notebook = Notebook.find_by(slug: params[:slug])
  end

end
