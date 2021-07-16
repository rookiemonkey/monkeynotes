class CategoryController < ApplicationController
  before_action :set_category

  def update
    raise UpdateCategoryError.new @category.errors.full_messages.first unless @category.update(subject: params[:subject])
    render json: { message: 'Successfully updated the category' }, status: :ok
  end

  def delete
    @category.destroy
    render json: { message: 'Successfully deleted the category' }, status: :ok
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

end
