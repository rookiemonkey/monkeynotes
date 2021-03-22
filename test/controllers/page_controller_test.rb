require "test_helper"

class PageControllerTest < ActionDispatch::IntegrationTest

  def setup
    @notebook = notebooks(:one)
    @category = categories(:one)
    @page = pages(:one)
    @page.content.body = '<p>SAMPLE</p>'
    @page.content.save

    @params = {
      page: {
        content: "<p>created via post! for an existing notebook</p>",
        subject: 'Test Page',
        language: 'ruby',
        notebook_subject: '', 
        notebook_id: @notebook.id,
        category_subject: '',
        category_id: '',
        is_update: 'false'
      }
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
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_difference(['Notebook.count', 'Page.count'], 1) do
      post page_create_path, params: @params
    end
  end


  test "page#create should create a new category, a new notebook and a new page" do
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = 'new'
    @params[:page][:category_subject] = 'Category Three'
    assert_difference(['Notebook.count', 'Page.count', 'Category.count'], 1) do
      post page_create_path, params: @params
    end
  end


  test "page#create should create a new notebook and a new page but not a new category" do
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_no_difference('Category.count') do
      post page_create_path, params: @params
    end
  end


  test "page#update should update page subject, along with the slug" do
    @params[:page][:is_update] = 'true'
    @params[:page][:subject] = 'UPDATED SUBJECT!'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 'UPDATED SUBJECT!', @page.subject
    assert_equal 'updated-subject', @page.slug
  end


  test "page#update should update page language" do
    @params[:page][:is_update] = 'true'
    @params[:page][:language] = 'aSSembLY'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 'assembly', @page.language
  end


  test "page#update should update page content" do
    @params[:page][:is_update] = 'true'
    @params[:page][:content] = '<p>Content is updated!</p>'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal "<div class=\"trix-content\">\n  <p>Content is updated!</p>\n</div>\n", @page.content.to_s
  end


  test "page#update should update page notebook_id relationship" do
    notebook_two = notebooks(:two)
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = notebook_two.id
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal notebook_two.id, @page.notebook_id
    assert_equal notebook_two.subject, @page.notebook.subject
  end


  test "page#update should update page notebook_id if an existing notebook_id is chosen" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = '2'
    @params[:page][:category_id] = @category.id
    old_count = Notebook.all.length
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 2, @page.notebook_id
    assert_equal old_count, Notebook.all.length
  end


  test "page#update should update page notebook_id if new and creates a new notebook linked to existing category" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = 'NEW! SUBJECT'
    @params[:page][:category_id] = @category.id
    notebooks_old_count = Notebook.all.length
    categories_old_count = Category.all.length
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal Notebook.last.id, @page.notebook_id
    assert_equal Notebook.last.subject, 'NEW! SUBJECT'
    assert_equal Notebook.last.category_id, @category.id
    assert_equal notebooks_old_count+1, Notebook.all.length
    assert_equal categories_old_count, Category.all.length
  end


  test "page#update should update page notebook_id if new and creates new notebook and category" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = 'NEW! SUBJECT'
    @params[:page][:category_id] = 'new'
    @params[:page][:category_subject] = 'NEW! CATEGORY'
    notebooks_old_count = Notebook.all.length
    categories_old_count = Category.all.length
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal Notebook.last.id, @page.notebook_id
    assert_equal Notebook.last.subject, 'NEW! SUBJECT'
    assert_equal Notebook.last.category_id, Category.last.id
    assert_equal Category.last.subject, 'NEW! CATEGORY'
    assert_equal notebooks_old_count+1, Notebook.all.length
    assert_equal categories_old_count+1, Category.all.length
  end

end
