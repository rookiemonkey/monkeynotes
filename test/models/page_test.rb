require "test_helper"

class PageTest < ActiveSupport::TestCase

  def setup
    @error_message = 'PAGE Model should'
    @page = Page.create(subject: 'Sample', 
                        content: '<p>Sample</p>', 
                        language: 'ruby', 
                        notebook_id: notebooks(:one).id)
  end

  test 'should reject empty subject' do
    error_message = "#{@error_message} reject empty subject"
    @page.subject = nil
    is_saved = @page.save
    assert_not is_saved, error_message
    assert_equal 1, @page.errors.full_messages.length
  end

  test "should reject subject that is already existing" do
    error_message = "#{@error_message} reject subject that is already existing"
    new_page = Page.create(subject: 'Sample', 
                          content: '<p>Sample</p>', 
                          language: 'ruby', 
                          notebook_id: notebooks(:one).id)
    assert_not new_page.save, error_message
  end
  
  test "should reject subject that is already existing case-sensitive" do
    error_message = "#{@error_message} reject subject that is already existing case-sensitive"
    new_page = Page.create(subject: 'SaMPle', 
                          content: '<p>Sample</p>', 
                          language: 'ruby', 
                          notebook_id: notebooks(:one).id)
    assert_not new_page.save, error_message
  end

  test 'should reject subject w/ more than 50 chars' do
    error_message = "#{@error_message} reject subject w/ more than 50 chars"
    @page.subject = ('a'*51)
    is_saved = @page.save
    assert_not is_saved, error_message
    assert_equal 1, @page.errors.full_messages.length
  end

  test 'should reject empty content' do
    error_message = "#{@error_message} reject empty content"
    @page.content = nil
    is_saved = @page.save
    assert_not is_saved, error_message
    assert_equal 1, @page.errors.full_messages.length
  end

  test 'should reject empty language' do
    error_message = "#{@error_message} reject empty language"
    @page.language = nil
    is_saved = @page.save
    assert_not is_saved, error_message
    assert_equal 1, @page.errors.full_messages.length
  end

end
