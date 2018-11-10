class UserSerializer < ActiveModel::Serializer
  attributes :id,
    :username,
    :icon_num
end
