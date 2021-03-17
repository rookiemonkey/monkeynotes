require "test_helper"

class PageControllerTest < ActionDispatch::IntegrationTest

  def setup
    @notebook = notebooks(:one)
    @category = categories(:one)

    @params = {
      content: "<p>created via post! for an existing notebook</p>",
      page_subject: 'Test Page',
      page_language: 'ruby',
      notebook_subject: '', 
      notebook_id: @notebook.id,
      category_subject: '',
      category_id: @category.id
    }
  end

  test "page#create should create a new page to an existing notebook" do
    old_page_count = @notebook.pages.length
    post page_create_path, params: @params
    @notebook.reload
    assert_equal old_page_count+1, @notebook.pages.length
  end


  test "page#create should not create a new notebook if page is for an existing notebook" do
    assert_no_difference('Notebook.count') do
      post page_create_path, params: @params
    end
  end


  test "page#create should create a new page and a new notebook" do
    @params[:notebook_subject] = 'New Notebook'
    @params[:notebook_id] = 'new'
    assert_difference(['Notebook.count', 'Page.count'], 1) do
      post page_create_path, params: @params
    end
  end


  test "page#create should create a new category, a new notebook and a new page" do
    @params[:notebook_subject] = 'New Notebook'
    @params[:notebook_id] = 'new'
    @params[:category_id] = 'new'
    @params[:category_subject] = 'Category Three'
    assert_difference(['Notebook.count', 'Page.count', 'Category.count'], 1) do
      post page_create_path, params: @params
    end
  end


  test "page#create should create a new notebook and a new page but not a new category" do
    @params[:notebook_subject] = 'New Notebook'
    @params[:notebook_id] = 'new'
    @params[:category_id] = @category.id
    assert_no_difference('Category.count') do
      post page_create_path, params: @params
    end
  end

end
