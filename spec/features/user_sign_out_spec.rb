require 'rails_helper'

feature 'user signs out', %Q{
  As an authenticated user
  I want to sign out
  So that my identity is forgotten about on the machine I'm using
} do

  scenario 'user signs out' do
    user1 = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Username', with: user1.username
    fill_in 'Password', with: user1.password

    click_button 'Log in'
    expect(page).to have_content('Signed in successfully')

    click_link 'Sign Out'
    expect(page).to have_content('Signed out successfully')
    expect(page).to_not have_content('Sign Out')
  end

end
