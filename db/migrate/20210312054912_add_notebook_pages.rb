class AddNotebookPages < ActiveRecord::Migration[6.1]
  def change
    create_table :notebook_pages do |t|
      t.integer :notebook_id
      t.integer :page_id
    end
  end
end
