class AddOrdToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :ord, :integer
  end
end
