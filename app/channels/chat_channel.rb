class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:chat_id]}"
    # stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data
    chat = Chat.find_or_create_by(id: params[:chat_id])
    # chatroom_user = chat.chatroom_users.where(user_id: current_user.id).first_or_create

    # User.all.each do |user|
    #   if user.username == chat.title
    #     chatroom_user2 = chat.chatroom_users.where(user_id: user.id).first_or_create
    #   end
    # end
    new_message = Message.create(body: data["message"], user: User.find(data["user"]["current_user_id"]))
    chat.messages << new_message

    # chat_key = "#{Time.now.to_datetime.strftime('%Q')}-#{current_user.id}"
    chat_key = chat.id

    chat_json = {
      "chat_key": chat_key,
      "message": new_message.body,
      "messageId": new_message.id,
      "user": data["user"],
      "created_at": new_message.created_at,
      "font": "bold"
    }
    ActionCable.server.broadcast("chat_#{params[:chat_id]}", chat_json)
  end
end
