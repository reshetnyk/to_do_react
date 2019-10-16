# frozen_string_literal: true

module Api
  class UserResetPasswordsController < ApiController
    skip_before_action :authentication, only: :update

    def update
      user = User.find_by(password_reset_token: update_params[:password_reset_token])
      if user
        user.password = update_params[:password]
        user.password_confirmation = update_params[:password_confirmation]
        if user.save
          user.clear_password_token
          render json: {}
        else
          render json: { errors: user.errors }, status: 400
        end
      else
        render json: { flash: [{ msg: 'Token is not valid.', type: 'warning' }] }, status: 400
      end
    end

    private

    def update_params
      params.permit(:password_reset_token, :password, :password_confirmation)
    end
  end
end
