require "test_helper"

class CategoryControllerTest < ActionDispatch::IntegrationTest

  test "category#update should update the category name" do
    category = categories(:one)
    post category_update_path(category_id: category.id), params: { subject: 'UPDATED NAME!' }
    category.reload
    assert_equal category.subject, 'UPDATED NAME!'
    assert_equal "Successfully updated the category", JSON.parse(response.body)['message']
  end

  test "category#delete should delete the category" do 
    # test if associated notebooks and pages are also delted
    # assert_difference(['Notebook.count', 'Page.count'], 2) do
    #   delete category_delete_path(category_id: categories(:one).id)
    #   assert_equal "Successfully deleted the category", JSON.parse(response.body)['message']
    # end
  end

end
