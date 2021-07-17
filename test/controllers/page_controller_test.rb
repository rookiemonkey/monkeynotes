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
    assert_equal 'Successfully created a page', JSON.parse(response.body)['message']
  end


  test "page#create should not create a new notebook if page is for an existing notebook" do
    assert_no_difference('Notebook.count') do
      post page_create_path, params: @params
      assert_equal 'Successfully created a page', JSON.parse(response.body)['message']
    end
  end


  test "page#create should create a new page and a new notebook" do
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_difference(['Notebook.count', 'Page.count'], 1) do
      post page_create_path, params: @params
      assert_equal 'Successfully created a page', JSON.parse(response.body)['message']
    end
  end


  test "page#create should create a new category, a new notebook and a new page" do
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = 'new'
    @params[:page][:category_subject] = 'Category Three'
    assert_difference(['Notebook.count', 'Page.count', 'Category.count'], 1) do
      post page_create_path, params: @params
      assert_equal 'Successfully created a page', JSON.parse(response.body)['message']
    end
  end


  test "page#create should create a new notebook and a new page but not a new category" do
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_no_difference('Category.count') do
      post page_create_path, params: @params
      assert_equal 'Successfully created a page', JSON.parse(response.body)['message']
    end
  end


  test "page#create should not create a notebook/category if page has an error" do
    @params[:page][:subject] = ''
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_no_difference(['Notebook.count', 'Category.count']) do
      post page_create_path, params: @params
      assert_equal 400, response.status
    end
  end


  test "page#create should not create a category/notebook if page has an error" do
    @params[:page][:subject] = ''
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_subject] = 'New Category'
    @params[:page][:category_id] = 'new'
    assert_no_difference(['Category.count', 'Notebook.count']) do
      post page_create_path, params: @params
      assert_equal 400, response.status
    end
  end


  test "page#create should not create a category/page if notebook has an error" do
    @params[:page][:subject] = 'New Page'
    @params[:page][:notebook_subject] = ''
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_id] = @category.id
    assert_no_difference(['Category.count', 'Page.count']) do
      post page_create_path, params: @params
      assert_equal 400, response.status
    end
  end


  test "page#create should not create a notebook/page if category has an error" do
    @params[:page][:subject] = 'New Page'
    @params[:page][:notebook_subject] = 'New Notebook'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:category_subject] = ''
    @params[:page][:category_id] = 'new'
    assert_no_difference(['Notebook.count', 'Page.count']) do
      post page_create_path, params: @params
      assert_equal 400, response.status
    end
  end


  test "page#create should return an error for empty page subject" do
    @params[:page][:subject] = ''
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Subject is too short (minimum is 2 characters)", JSON.parse(response.body)['message']
  end


  test "page#create should return an error for duplicated page subject" do
    @params[:page][:subject] = 'duplicated page'
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Subject has already been taken", JSON.parse(response.body)['message']
  end


  test "page#create should return an error for duplicated page subject (case-sensitive)" do
    @params[:page][:subject] = 'duPlIcAteD paGe'
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Subject has already been taken", JSON.parse(response.body)['message']
  end


  test "page#create should return an error for empty page subject that is 50 chars long" do
    @params[:page][:subject] = 'a'*51
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Subject is too long (maximum is 50 characters)", JSON.parse(response.body)['message']
  end


  test "page#create should return an error for empty page content" do
    @params[:page][:content] = ''
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Content can't be blank", JSON.parse(response.body)['message']
  end


  test "page#create should return an error for empty page language" do
    @params[:page][:language] = ''
    post page_create_path, params: @params
    assert_equal 400, response.status
    assert_equal "Language can't be blank", JSON.parse(response.body)['message']
  end


  test "page#update should update page subject, along with the slug" do
    @params[:page][:is_update] = 'true'
    @params[:page][:subject] = 'UPDATED SUBJECT!'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
    assert_equal 'UPDATED SUBJECT!', @page.subject
    assert_equal 'updated-subject', @page.slug
  end


  test "page#update should update page language" do
    @params[:page][:is_update] = 'true'
    @params[:page][:language] = 'aSSembLY'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
    assert_equal 'assembly', @page.language
  end


  test "page#update should update page content" do
    @params[:page][:is_update] = 'true'
    @params[:page][:content] = '<p>Content is updated!</p>'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
    assert_equal "<div class=\"trix-content\">\n  <p>Content is updated!</p>\n</div>\n", @page.content.to_s
  end


  test "page#update should update page notebook_id relationship" do
    notebook_two = notebooks(:two)
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = notebook_two.id
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
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
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
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
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
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
    assert_equal 200, response.status
    assert_equal "Successfully updated the page", JSON.parse(response.body)['message']
    assert_equal Notebook.last.id, @page.notebook_id
    assert_equal Notebook.last.subject, 'NEW! SUBJECT'
    assert_equal Notebook.last.category_id, Category.last.id
    assert_equal Category.last.subject, 'NEW! CATEGORY'
    assert_equal notebooks_old_count+1, Notebook.all.length
    assert_equal categories_old_count+1, Category.all.length
  end


  test "page#update should not update the page subject and slug if subject is empty" do
    @params[:page][:is_update] = 'true'
    @params[:page][:subject] = ''
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 400, response.status
    assert_equal "Subject is too short (minimum is 2 characters). Resource is not updated", JSON.parse(response.body)['message']
    assert_not_equal '', @page.subject
    assert_not_equal '', @page.slug
  end


  test "page#update should not update the page language if language is empty" do
    @params[:page][:is_update] = 'true'
    @params[:page][:language] = ''
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 400, response.status
    assert_equal "Language can't be blank. Resource is not updated", JSON.parse(response.body)['message']
    assert_not_equal '', @page.language
  end


  test "page#update should not update the page notebook_id if notebook_id doesn't exists" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 9999999
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal 400, response.status
    assert_equal "Notebook must exist. Resource is not updated", JSON.parse(response.body)['message']
    assert_not_equal 9999999, @page.notebook_id
  end


  test "page#update should not update the page notebook_id if new and notebook subject is empty" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = ''
    assert_no_difference 'Notebook.count' do
      post page_update_path(slug: @page.slug), params: @params
      @page.reload
      assert_equal 400, response.status
      assert_equal "Notebook must exist. Resource is not updated", JSON.parse(response.body)['message']
      assert_not_equal '', @page.notebook.subject
    end
  end


  test "page#update should not update the page.notebook category if category doesn't exists" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = 'New Subject!'
    @params[:page][:category_id] = 99999999999
    assert_no_difference ['Category.count', 'Notebook.count'] do
      post page_update_path(slug: @page.slug), params: @params
      @page.reload
      assert_equal 400, response.status
    end
  end


  test "page#update should not update the page.notebook category if category is new and its subject is empty" do
    @params[:page][:is_update] = 'true'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = 'New Subject!'
    @params[:page][:category_id] = 'new'
    @params[:page][:category_subject] = ''
    assert_no_difference ['Category.count', 'Notebook.count'] do
      post page_update_path(slug: @page.slug), params: @params
      @page.reload
      assert_equal 400, response.status
      assert_equal "Subject is too short (minimum is 2 characters)", JSON.parse(response.body)['message']
      assert_not @page.notebook.valid?
      assert_not @page.notebook.category
    end
  end


  test "page#update should also update the notebooks's updated_at attribute" do
    @params[:page][:is_update] = 'true'
    @params[:page][:language] = 'aSSembLY'
    @params[:page][:notebook_id] = 'new'
    @params[:page][:notebook_subject] = 'New Subject!'
    @params[:page][:category_id] = 'new'
    @params[:page][:category_subject] = 'Talong'
    post page_update_path(slug: @page.slug), params: @params
    @page.reload
    assert_equal @page.created_at, @page.notebook.updated_at
    assert_equal @page.created_at, @page.notebook.category.updated_at
  end


  test "page#delete should delete the page" do
    assert_difference(['Page.count'], -1) do
      delete page_delete_path(slug: @page.slug)
      res = JSON.parse(response.body)
      assert_equal res['message'], 'Successfully deleted the page'
    end
  end
  
  test "page#delete should not delete any notebook or category" do
    assert_no_difference(['Notebook.count', 'Category.count']) do
      delete page_delete_path(slug: @page.slug)
    end
  end

end
