class RemoveActivePollIdFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :active_poll_id
  end
  def down
    add_column :users, :active_poll_id, :integer
    add_foreign_key :users, :polls, column: :active_poll_id, primary_key: :id
  end
end
