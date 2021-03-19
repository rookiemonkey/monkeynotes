require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest

  test "home#form should return all notebooks" do
    get form_path
    res = response.parsed_body
    assert_equal 2, res.length
    assert res.fetch('notebooks')
    assert res.fetch('categories')
    assert_equal Notebook.all.length, res['notebooks'].length
    assert_equal Category.all.length, res['categories'].length
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
