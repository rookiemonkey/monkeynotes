class ApplicationController < ActionController::Base

  include Exceptions::MonkeynoteErrors
  rescue_from ActiveRecord::RecordNotFound, with: :bad_request_error
  rescue_from CreatePageError,              with: :bad_request_error
  rescue_from CreateCategoryError,          with: :bad_request_error
  rescue_from CreateNotebookError,          with: :bad_request_error
  rescue_from UpdatePageError,              with: :bad_request_update_error

  protected

  def bad_request_error(message)
    render json: { message: message }, status: :bad_request
  end

  def bad_request_update_error(message)
    render json: { message: "#{message}. Resource is not updated" }, status: :bad_request
  end

end
