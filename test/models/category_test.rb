require "test_helper"

class CategoryTest < ActiveSupport::TestCase

  def setup
    @error_message = 'CATEGORY Model should'
    @category = Category.create(subject: 'Sample')
  end
  
  test "should reject empty subject" do
    error_message = "#{@error_message} reject empty subject"
    @category.subject = nil
    assert_not @category.save, error_message
  end

end
