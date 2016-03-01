class AddIsLockedToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :is_locked, :boolean, null: false
  end
end
