# frozen_string_literal: true

module Api
  class UsersController < ApiController
    skip_before_action :authentication

    def create
      user = User.new(create_params)
      if user.save
        UserMailer.confirmation_letter(user).deliver
        render json: {}
      else
        render json: { errors: user.errors }
      end
    end

    private

    def create_params
      params.permit(:email, :password, :password_confirmation)
    end
  end
end
