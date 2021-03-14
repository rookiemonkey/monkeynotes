require "test_helper"

class PageControllerTest < ActionDispatch::IntegrationTest

  def setup
    @notebook = notebooks(:one)
  end

  test "page#create should create a new page to an existing notebook" do
    old_page_count = @notebook.pages.length

    post page_create_path, params: {
      content: "<p>created via post! for an existing notebook</p>",
      page_subject: 'Test Page',
      page_language: 'ruby',
      notebook_subject: '', 
      notebook_id: @notebook.id
    }

    @notebook.reload
    assert_equal old_page_count+1, @notebook.pages.length
  end


  test "page#create should not create a new notebook if page is for an existing notebook" do
    old_notebook_count = Notebook.all.length

    post page_create_path, params: {
      content: "<p>created via post! for an existing notebook</p>",
      page_subject: 'Test Page',
      page_language: 'ruby',
      notebook_subject: '', 
      notebook_id: @notebook.id
    }

    assert_equal old_notebook_count, Notebook.all.length
  end


  test "page#create should create a new page and a new notebook" do
    assert_difference(['Notebook.count', 'Page.count'], 1) do
      post page_create_path, params: {
        content: "<p>created via post! for a new notebook as well</p>", 
        page_subject: 'Test Page',
        page_language: 'ruby',
        notebook_subject: 'New Notebook', 
        notebook_id: 'new'
      }
    end
  end

end
