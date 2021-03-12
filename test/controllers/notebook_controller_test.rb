require "test_helper"

class NotebookControllerTest < ActionDispatch::IntegrationTest

  test "notebook#all should return all notebooks" do
    get notebook_all_path
    assert_equal Notebook.all.length, response.parsed_body.length
  end

  test "notebook#notebook should return the notebook and its pages" do
    get notebook_path(1)
    res = JSON.parse(response.body)
    assert res["notebook"].present? and !res["notebook"].nil?
    assert res["pages"].present? and !res["notebook"].nil?
  end

end
