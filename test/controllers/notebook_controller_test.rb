require "test_helper"

class NotebookControllerTest < ActionDispatch::IntegrationTest

  test "notebook#all should return all notebooks" do
    get notebook_all_path
    assert_equal Notebook.all.length, response.parsed_body.length
  end

  test "notebook#notebook should return the notebook and its pages" do
    get notebook_path(notebooks(:one).slug)
    res = JSON.parse(response.body)
    assert res["notebook"].present? and !res["notebook"].nil?
    assert res["pages"].present? and !res["notebook"].nil?
  end

  test "notebook#delete should delete the notebook and i  ts pages"  do
    assert_difference(['Page.count'], -3) do
      delete notebook_delete_path(notebooks(:one).slug)
      res = JSON.parse(response.body)
      assert_equal res['message'], 'Successfully deleted the notebook'
    end
  end

  test "notebook#update should update the notebook's subject/slug" do
    notebooks(:one).update(category: Category.all.first) # needed for this test

    put notebook_update_path(notebooks(:one).slug), params: { subject: 'NEW SUBJECT!' }
    res = JSON.parse(response.body)

    notebooks(:one).reload
    assert_equal res['message'], 'Successfully updated the notebook'
    assert_equal notebooks(:one).subject, 'NEW SUBJECT!'
    assert_equal notebooks(:one).slug, 'new-subject'
  end

end
