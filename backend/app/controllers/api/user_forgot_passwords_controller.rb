# frozen_string_literal: true

module Api
  class UserForgotPasswordsController < ApiController
    skip_before_action :authentication, only: :create

    def create
      user = User.find_by(email: index_params[:email])
      if user
        if user.confirmed?
          user.generate_password_token
          UserMailer.password_reset_letter(user).deliver
          render json: { flash: [{ msg: 'Resetting instruction were sent to your email.', type: 'success' }] }
        else
          render json: { flash: [{ msg: 'U need to confirm the email.', type: 'warning' }] }, status: 400
        end
      else
        render json: { flash: [{ msg: 'There is no such email.', type: 'warning' }] }, status: 400
      end
    end

    private

    def index_params
      params.permit(:email)
    end
  end
end
