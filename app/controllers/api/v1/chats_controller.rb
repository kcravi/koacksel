class Api::V1::ChatsController < Api::ApiController
  before_action :authenticate_user!

  def index
    chats = Chat.all.sort

    private_chats = []
    rejected_chats = []
    general_chats = []

    chats.each do |chat|
      chat.chatroom_users.each do |user|
        User.all.each do |u|
          if chat.title == u.username && user.user.username == current_user.username
            private_chats << chat
          elsif chat.title == u.username
            if !rejected_chats.include?(chat)
              rejected_chats << chat
            end
          end
        end
      end
    end

    general_chats = chats - rejected_chats - private_chats

    render json: {
      private_chats: serialized_chats(private_chats),
      general_chats: serialized_chats(general_chats),
      current_user: serialized_user
    }
  end

  def show
    chat = Chat.find(params[:id])
    msg = chat.messages.sort

    # admin_status = false
    # chat.chatroom_users.select do |user|
    #   if user.user_id == current_user.id
    #     admin_status = true
    #   end
    # end

    users_messages = msg.map do |m|
          { chat_key: m.chat_id,
            message: m.body,
            messageId: m.id,
            created_at: m.created_at,
            font: 'regular',
            user: { user_id: m.user.id,
                    username: m.user.username,
                    icon_num: m.user.icon_num
                  }
          }
          end

    render json: {
      chat: serialized_chat,
      current_user_username: current_user.username,
      messages: users_messages
      # current_user_id: current_user_id,
      # admin_status: admin_status
    }
  end

  def create
    new_chat = Chat.new(chat_params)

    if new_chat.save
      chatroom_user = new_chat.chatroom_users.where(user: current_user).first_or_create

      User.all.each do |user|
        if user.username == new_chat.title
          chatroom_user2 = new_chat.chatroom_users.where(user_id: user.id).first_or_create
        end
      end

      render json: {chat: ChatSerializer.new(new_chat)}
    else
      render json: {errors: new_chat.errors, title: new_chat.title, status: :unprocessable_entity}
    end
  end

  def destroy
    delete_chat = Chat.find(params[:id])
    if delete_chat.destroy
      render json: {chat: delete_chat, body: "Deleted Successfully"}
    else
      render json: {error: "Delete Failed"}, status: 422
    end
  end

  private
  def chat_params
    params
    .permit(
      :id,
      :title
    )
  end

  # def serialized_chats
  #   ActiveModel::Serializer::ArraySerializer.new(Chat.all.sort, each_serializer: ChatSerializer)
  # end

  def serialized_chats(chats)
    ActiveModel::Serializer::ArraySerializer.new(chats, each_serializer: ChatSerializer)
  end

  def serialized_user
    ActiveModel::Serializer::ArraySerializer.new([current_user], each_serializer: UserSerializer)
  end

  def serialized_chat
    ActiveModel::Serializer::ArraySerializer.new([Chat.find(params[:id])], each_serializer: ChatSerializer)
  end

end
