require "test_helper"
require 'yaml'

class AuthenticationControllerTest < ActionDispatch::IntegrationTest

  def setup
    @env = YAML.load_file(File.expand_path('config/application.yml'))
  end
  
  test "auth#login incorrect email" do
    assert_raises Exceptions::MonkeynoteErrors::AuthenticationError do
      post login_path, params: { email: 'incorrect_email@gmail.com', password: @env['USER_PASSWORD'] }
    end
  end

  test "auth#login incorrect password" do
    assert_raises Exceptions::MonkeynoteErrors::AuthenticationError do
      post login_path, params: { email: @env['USER_EMAIL'], password: 'incorrect password' }
    end
  end

  test "auth#login using correct login" do
    post login_path, params: { email: @env['USER_EMAIL'], password: @env['USER_PASSWORD'] }
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
