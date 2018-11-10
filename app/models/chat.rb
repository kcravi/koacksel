class Chat < ApplicationRecord
  # validates :title, uniqueness: true

  has_many :messages
  has_many :users, through: :messages
  has_many :chatroom_users

end
