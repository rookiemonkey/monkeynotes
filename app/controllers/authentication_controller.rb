class AuthenticationController < ApplicationController

  def login
    raise AuthenticationError.new('Unauthorized') unless are_credentials_a_match

    cookies.encrypted[:auth] = { value: ENV['USER_EMAIL'], expires: 6.hour.from_now }
    render json: { message: 'Successfully logged in!' }, status: :ok
  end

  def logout
    cookies.delete :auth
    render json: { message: 'Successfully logged out!' }, status: :ok
  end

  private

  def are_credentials_a_match
    ENV['USER_EMAIL'] == params['email'] && ENV['USER_PASSWORD'] == params['password']
  end

end
