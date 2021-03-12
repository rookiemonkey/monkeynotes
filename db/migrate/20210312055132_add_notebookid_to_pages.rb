class AddNotebookidToPages < ActiveRecord::Migration[6.1]
  def change
    add_column :pages, :notebook_id, :integer
  end
end
