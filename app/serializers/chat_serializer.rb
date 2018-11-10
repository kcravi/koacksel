class ChatSerializer < ActiveModel::Serializer
  attributes :id,
    :title,
    :created_at

    has_many :chatroom_users
end
