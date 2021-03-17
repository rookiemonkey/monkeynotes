class AddCategoryidToNotebook < ActiveRecord::Migration[6.1]
  def change
    add_column :notebooks, :category_id, :integer
  end
end
