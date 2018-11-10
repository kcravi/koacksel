require 'rails_helper'

RSpec.describe ChatroomUser, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "validations" do
    let!(:user1) {FactoryBot.build(:user)}
    let!(:chat1) {FactoryBot.build(:chat)}
    let!(:chatroom_user1) do
      ChatroomUser.new({user: user1, chat: chat1})
    end

    it "user must be present" do
      expect(chatroom_user1).to be_valid
      chatroom_user1.user = nil
      expect(chatroom_user1).to_not be_valid
    end

    it "chat must be present" do
      expect(chatroom_user1).to be_valid
      chatroom_user1.chat = nil
      expect(chatroom_user1).to_not be_valid
    end

  end
end
