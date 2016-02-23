class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :title, null: false, index: true
      t.integer :author_id, null: false, index: true
      t.string :token, null: false, unique: true

      t.timestamps null: false
    end
    add_foreign_key :polls, :users, column: :author_id, primary_key: :id
  end
end
