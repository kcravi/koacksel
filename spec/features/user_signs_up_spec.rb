require 'rails_helper'

feature 'user registers', %Q{
  As a visitor
  I want to register
  So that I can create an account
} do

  scenario 'specify valid registration information' do
    visit new_user_registration_path

    fill_in 'First name', with: 'John'
    fill_in 'Last name', with: 'Smith'
    fill_in 'Email', with: 'johnsmith@example.com'
    fill_in "Username", with: 'johnsmith'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign up'
    
    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('johnsmith')
    expect(page).to have_content('Sign Out')
  end

  scenario 'provide invalid registration information' do
    visit new_user_registration_path

    fill_in 'First name', with: 'John'
    fill_in 'Last name', with: 'Smith'
    fill_in 'Email', with: ''
    fill_in "Username", with: 'johnsmith'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign up'

    expect(page).to have_content("Email can't be blank")
    expect(page).to_not have_content('Sign Out')
  end

end
