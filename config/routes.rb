Rails.application.routes.draw do
  devise_scope :user do
    authenticated :user do
      root 'chats#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end

    get "users/sign_out" => "devise/sessions#destroy"
  end

  # possibly needed for ActionCable
  # mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :chats, only: [:index, :show, :create, :destroy] do
        resources :messages, only: [:create]
        resource :chatroom_users
      end
      resources :users, only: [:index]
    end
  end

  # resources :users, only: [:index, :destroy]
  resources :chats, only: [:index, :show, :create]

  devise_for :users



end
