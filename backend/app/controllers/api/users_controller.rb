# frozen_string_literal: true

module Api
  class UsersController < Api::ApiController
    def create
      user = User.new(
        email: params[:email],
        password: params[:password],
        password_confirmation: params[:password_confirmation]
      )
      if user.save
        render json: { user: { email: user.email } }
      else
        render json: { errors: user.errors }
      end
    end
  end
end
