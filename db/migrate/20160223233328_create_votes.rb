class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :response_id, null: false
      t.integer :voter_id, null: false
      t.boolean :is_up_vote, null: false

      t.timestamps null: false
    end
    add_foreign_key :votes, :users, column: :voter_id, primary_key: :id
    add_foreign_key :votes, :responses, column: :response_id, primary_key: :id
  end
end
