class AddOrdToPolls < ActiveRecord::Migration
  def change
    add_column :polls, :ord, :integer
  end
end
