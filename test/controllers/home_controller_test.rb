require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest

  def setup
    login
  end

  test "home#form_add should return all notebooks" do
    get form_add_path
    res = response.parsed_body
    assert_equal 2, res.length
    assert res.fetch('notebooks')
    assert res.fetch('categories')
    assert_equal Notebook.all.length, res['notebooks'].length
    assert_equal Category.all.length, res['categories'].length
  end

  test "home#form_add should be restricted when not logged in" do
    logout
    get form_add_path
    assert_equal "Unauthorized", response.parsed_body['message']
  end

  test "home#form_edit should return all notebooks" do
    get form_edit_path(slug: 'rails-test-2')
    res = response.parsed_body
    assert_equal 3, res.length
    assert res.fetch('notebooks')
    assert res.fetch('categories')
    assert res.fetch('page')
    assert_equal Notebook.all.length, res['notebooks'].length
    assert_equal Category.all.length, res['categories'].length
  end

  test "home#form_edit should be restricted when not logged in" do
    logout
    get form_edit_path(slug: 'rails-test-2')
    assert_equal "Unauthorized", response.parsed_body['message']
  end

  test "home#search_from_categories should return pages that matches the query" do
    post search_from_categories_path, params: { search: 'all' }
    res = response.parsed_body
    assert_equal 2, res.length
    assert res.fetch('pages')
    assert res.fetch('count')
  end

  test "home#search_from_notebook should return pages of a notebook that matches the query" do
    post search_from_notebooks_path(notebooks(:one).id), params: { search: 'ito!' }
    res = response.parsed_body
    assert_equal 2, res.length
    assert res.fetch('pages')
    assert res.fetch('count')
  end

end
