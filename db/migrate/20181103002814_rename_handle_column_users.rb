class RenameHandleColumnUsers < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :handle, :username
  end
end
