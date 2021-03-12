require "test_helper"

class NotebookPageTest < ActiveSupport::TestCase

  def setup
    @notebook = Notebook.create(subject: "Ruby")
    @notebook.add_page(subject: 'integers', content: '<p>test from setup!</p>')
  end

  test "should add to notebook pages" do
    error_message = "should add to notebook pages"
    old_count = @notebook.pages.length
    @notebook.add_page(subject: 'strings', content: '<p>Testing!</p>')
    assert_equal (old_count+1), @notebook.pages.length, error_message
  end

  test "should delete the pages if notebook is deleted" do
    error_message = "should delete the pages if notebook is deleted"
    old_count = Page.all.length
    @notebook.destroy
    assert_equal (old_count-1), Page.all.length, error_message
  end

end
