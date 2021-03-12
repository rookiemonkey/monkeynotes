require "test_helper"

class NotebookTest < ActiveSupport::TestCase

  def setup
    @error_message = 'NOTEBOOK Model should'
    @notebook = Notebook.create(subject: 'Sample')
  end

  test "should reject empty subject" do
    error_message = "#{@error_message} reject empty subject"
    @notebook.subject = nil
    assert_not @notebook.save, error_message
  end

  test "should reject subject longer than 20 chars" do
    error_message = "#{@error_message} reject empty subject longer than 20 chars"
    @notebook.subject = ('a'*21)
    assert_not @notebook.save, error_message
  end
  
end
