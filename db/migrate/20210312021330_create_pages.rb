class CreatePages < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.string :subject
      t.string :language
      t.string :slug
      t.string :content
      t.timestamps
    end
  end
end
