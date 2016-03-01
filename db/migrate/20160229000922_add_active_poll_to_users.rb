class AddActivePollToUsers < ActiveRecord::Migration
  def change
    add_column :users, :active_poll_id, :integer
    add_foreign_key :users, :polls, column: :active_poll_id, primary_key: :id
  end
end
