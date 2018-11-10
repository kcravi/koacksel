require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do
    user1 = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Username', with: user1.username
    fill_in 'Password', with: user1.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content(user1.username)
    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'

    expect(page).to have_content('Invalid Username or password')
    expect(page).to_not have_content('Sign Out')
  end
end
