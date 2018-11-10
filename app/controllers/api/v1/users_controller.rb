class Api::V1::UsersController < ApplicationController
  def index
    users = User.all.select do |user|
      user != current_user
    end
    render json: { current_user_id: current_user.id, username: current_user.username, icon_num: assign_icon_num, users: users }
  end

  def assign_icon_num
    if current_user.icon_num.nil?
      rando = rand(1..4)
      current_user.update(icon_num: rando)
    else
      current_user.icon_num
    end
  end
end
