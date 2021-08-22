class ApplicationController < ActionController::Base
  
  include Pagy::Backend
  include Exceptions::MonkeynoteErrors
  rescue_from ActiveRecord::RecordNotFound, with: :bad_request_error
  rescue_from AuthenticationError,          with: :bad_request_error
  rescue_from CreatePageError,              with: :bad_request_error
  rescue_from CreateCategoryError,          with: :bad_request_error
  rescue_from CreateNotebookError,          with: :bad_request_error
  rescue_from UpdatePageError,              with: :bad_request_update_error

  def is_authorized?
    raise AuthenticationError.new('Unauthorized') unless cookies.encrypted[:auth] == ENV['USER_EMAIL']
  end

  # https://philna.sh/blog/2020/01/15/test-signed-cookies-in-rails/
  def is_auth_cookie_valid?
    jar = ActionDispatch::Cookies::CookieJar.build(request, cookies.to_hash)
    jar.encrypted['auth'] == ENV['USER_EMAIL']
  end

  protected

  def bad_request_error(message)
    render json: { message: message }, status: :bad_request
  end

  def bad_request_update_error(message)
    render json: { message: "#{message}. Resource is not updated" }, status: :bad_request
  end

end
