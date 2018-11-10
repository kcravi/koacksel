require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "validations" do
    let!(:user1) {FactoryBot.build(:user)}

    it "first-name must be present" do
      expect(user1).to be_valid
      user1.first_name = nil
      expect(user1).to_not be_valid
    end

    it "last-name must be present" do
      expect(user1).to be_valid
      user1.last_name = nil
      expect(user1).to_not be_valid
    end

    it "username must be present" do
      expect(user1).to be_valid
      user1.username = nil
      expect(user1).to_not be_valid
    end

    it "email must be present" do
      expect(user1).to be_valid
      user1.email = nil
      expect(user1).to_not be_valid
    end

    it "password must be present" do
      expect(user1).to be_valid
      user1.password = nil
      expect(user1).to_not be_valid
    end

    it "is invalid if the password is more than 6 characters long" do
      user1.password = "1234567"
      expect(user1).to_not be_valid
    end
  end
end
