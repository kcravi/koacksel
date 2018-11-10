class CreateChatroomUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :chatroom_users do |t|
      t.belongs_to :chat
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
