class AddNullFalseToHandleUsers < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :handle, :string, null: false
  end
end
