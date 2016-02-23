class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :poll_id, null: false, index: true
      t.string :title, null: false, index: true
      t.string :body
      t.string :image_url

      t.timestamps null: false
    end
    add_foreign_key :questions, :polls, column: :poll_id, primary_key: :id
  end
end
