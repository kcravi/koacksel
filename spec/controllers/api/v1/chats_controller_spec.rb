require 'rails_helper'

RSpec.describe Api::V1::ChatsController, type: :controller do

  describe "GET#index" do
    it 'should return a list of all general chats & private chats' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      user3 = FactoryBot.create(:user)
      user4 = FactoryBot.create(:user)

      chat1 = FactoryBot.create(:chat) #general chat (user1, user2, user3)
      chat2 = FactoryBot.create(:chat) #general chat (user2, user3, user4)
      chat3 = Chat.create(title: user3.username) #private chat (user3, user4)

      chatroom_users_for_chat1 = ChatroomUser.create(user: user1, chat: chat1)
      chat1.chatroom_users.where(user_id: user2.id).first_or_create
      chat1.chatroom_users.where(user_id: user3.id).first_or_create

      chatroom_users_for_chat2 = ChatroomUser.create(user: user2, chat: chat2)
      chat2.chatroom_users.where(user_id: user3.id).first_or_create
      chat2.chatroom_users.where(user_id: user4.id).first_or_create

      chatroom_users_for_chat3 = ChatroomUser.create(user: user3, chat: chat3)
      chat3.chatroom_users.where(user_id: user4.id).first_or_create
      # message1 = Message.create(body: "Hello", user: user1, chat: chat1 )
      # message2 = Message.create(body: "World", user: user2, chat: chat1 )
      # message3 = Message.create(body: "Hey", user: user3, chat: chat1 )
      # message4 = Message.create(body: "Hola", user: user1, chat: chat2 )
      # message5 = Message.create(body: "Namaste", user: user3, chat: chat2 )
      # message6 = Message.create(body: "Why?", user: user4, chat: chat2 )
      sign_in user3

      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(returned_json.length).to eq 3

      expect(returned_json["general_chats"].length).to eq 2
      expect(returned_json["general_chats"][0]["title"]).to eq chat1.title

      expect(returned_json["private_chats"].length).to eq 1
      expect(returned_json["private_chats"][0]["title"]).to eq user3.username
    end
  end

  describe "GET#show" do
    it 'should return specific chat & its messages' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      chat1 = FactoryBot.create(:chat)
      # chatroom_user_for_chat1 = ChatroomUser.create(user: user1, chat: chat1)
      message1 = Message.create(body: "Hello", user: user1, chat: chat1 )
      message2 = Message.create(body: "World", user: user2, chat: chat1 )

      sign_in user1

      get :show, params: {id: chat1.id}

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(returned_json.length).to eq 3
      expect(returned_json["chat"]).to be_an(Array)
      expect(returned_json["chat"].length).to eq 1
      expect(returned_json["chat"][0]["title"]).to eq chat1.title

      expect(returned_json["messages"].length).to eq 2
      expect(returned_json["messages"][0]["message"]).to eq message1.body
      expect(returned_json["messages"][1]["user"]["username"]).to eq user2.username
    end
  end

  describe "DELETE#destroy" do
    it 'should delete specific chat' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      user3 = FactoryBot.create(:user)
      user4 = FactoryBot.create(:user)

      chat1 = FactoryBot.create(:chat)
      chat2 = FactoryBot.create(:chat)

      chatroom_user_for_chat1 = ChatroomUser.create(user: user1, chat: chat1)

      message1 = Message.create(body: "Hello", user: user1, chat: chat1 )
      message2 = Message.create(body: "World", user: user2, chat: chat1 )
      message3 = Message.create(body: "Hey", user: user3, chat: chat2 )
      message4 = Message.create(body: "Hola", user: user4, chat: chat2 )

      expect(Chat.all.length).to eq 2
      # expect(Message.all.length).to eq 4
      sign_in user1

      delete :destroy, params: {id: chat1.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(Chat.all.length).to eq 1
      expect(returned_json["chat"]["id"]).to eq chat1.id
      # expect(Message.all.length).to eq 2
    end
  end

  describe "POST#create" do
    it "should create a new Chat" do
      user1 = FactoryBot.create(:user)
      chat1 = FactoryBot.create(:chat)
      chat2_title = "chat2"

      sign_in user1

      expect(Chat.all.length).to eq 1

      get :create, params: { title: chat2_title }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(Chat.all.length).to eq 2
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json.length).to eq 1
      
      expect(returned_json["chat"]["title"]).to eq chat2_title
      expect(returned_json["chat"]["chatroom_users"].length).to eq 1
      expect(returned_json["chat"]["chatroom_users"][0]["user"]["id"]).to eq user1.id
    end
  end
end
