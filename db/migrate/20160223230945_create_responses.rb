class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :question_id, null: false, index: true
      t.string :body
      t.string :image_url

      t.timestamps null: false
    end
    add_foreign_key :responses, :questions, column: :question_id, primary_key: :id
  end
end
