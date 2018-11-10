RSpec.describe Api::V1::UsersController, type: :controller do

  describe "GET#index" do
    it "should return current-user's user_id, username, icon_numlist and list of all other users" do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      user3 = FactoryBot.create(:user)

      sign_in user1

      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json.length).to eq 4

      expect(returned_json["current_user_id"]).to eq user1.id
      expect(returned_json["username"]).to eq user1.username
      expect(returned_json["users"].length).to eq 2
      expect(returned_json["users"][0]["username"]).to eq user2.username
      expect(returned_json["users"][1]["email"]).to eq user3.email
    end
  end
end
