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

  test "should reject subject longer than 50 chars" do
    error_message = "#{@error_message} reject empty subject longer than 50 chars"
    @notebook.subject = ('a'*51)
    assert_not @notebook.save, error_message
  end

  test "should reject subject that is already existing" do
    error_message = "#{@error_message} reject subject that is already existing"
    assert_not Notebook.create(subject: 'Sample').save, error_message
  end

  test "should reject subject that is already existing case-sensitive" do
    error_message = "#{@error_message} reject subject that is already existing case-sensitive"
    assert_not Notebook.create(subject: 'SaMPle').save, error_message
  end
  
end
