require "test_helper"

class PageTest < ActiveSupport::TestCase

  def setup
    @error_message = 'PAGE Model should'
    @page = Page.create(subject: 'Sample', content: '<p>Sample</p>')
  end

  test 'should reject empty subject' do
    error_message = "#{@error_message} reject empty subject"
    @page.subject = nil
    assert_not @page.save, error_message
  end

  test 'should reject subject w/ more than 50 chars' do
    error_message = "#{@error_message} reject subject w/ more than 50 chars"
    @page.subject = ('a'*51)
    assert_not @page.save, error_message
  end

  test 'should reject empty content' do
    error_message = "#{@error_message} reject empty content"
    @page.content = nil
    assert_not @page.save, error_message
  end

end
