require 'rails_helper'

RSpec.describe Chat, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "validations" do
    let!(:chat1) {FactoryBot.build(:chat)}

    it "is valid with all required fields filled in" do
      expect(chat1).to be_valid
    end

  end
end
