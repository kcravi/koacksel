require 'rails_helper'

RSpec.describe Message, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "validations" do
    let!(:user1) {FactoryBot.build(:user)}
    let!(:chat1) {FactoryBot.build(:chat)}
    let!(:message1) do
      Message.new({user: user1, chat: chat1})
    end

    it "user must be present" do
      expect(message1).to be_valid
      message1.user = nil
      expect(message1).to_not be_valid
    end

    it "chat must be present" do
      expect(message1).to be_valid
      message1.chat = nil
      expect(message1).to_not be_valid
    end

  end
end
