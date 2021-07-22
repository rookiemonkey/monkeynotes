require "test_helper"
require 'yaml'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest

  test "auth#login incorrect email" do
    post login_path, params: { email: 'incorrect_email@gmail.com', password: ENV['USER_PASSWORD'] }
    res = JSON.parse(response.body)
    assert_equal res['message'], 'Unauthorized'
  end

  test "auth#login incorrect password" do
    post login_path, params: { email: ENV['USER_EMAIL'], password: 'incorrect password' }
    res = JSON.parse(response.body)
    assert_equal res['message'], 'Unauthorized'
  end

  test "auth#login using correct login" do
    post login_path, params: { email: ENV['USER_EMAIL'], password: ENV['USER_PASSWORD'] }
    res = JSON.parse(response.body)
    assert_equal res['message'], 'Successfully logged in!'
    assert_not_nil cookies['auth']
  end

  test "auth#logout" do
    delete logout_path
    res = JSON.parse(response.body)
    assert_equal res['message'], 'Successfully logged out!'
    assert_nil cookies['auth']
  end

end
