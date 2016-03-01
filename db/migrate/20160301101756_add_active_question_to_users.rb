class AddActiveQuestionToUsers < ActiveRecord::Migration
  def change
    add_column :users, :active_question_id, :integer
    add_foreign_key :users, :questions, column: :active_question_id, primary_key: :id
  end
end
