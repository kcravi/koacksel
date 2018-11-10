class ChatroomUserSerializer < ActiveModel::Serializer
  attributes :id,
    :user

    def user
     UserSerializer.new(object.user)
    end
end
