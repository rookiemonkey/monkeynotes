class AddCategoryNotebooks < ActiveRecord::Migration[6.1]
  def change
    create_table :category_notebooks do |t|
      t.integer :category_id
      t.integer :notebook_id
    end
  end
end
