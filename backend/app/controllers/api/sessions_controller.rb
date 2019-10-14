# frozen_string_literal: true

module Api
  class SessionsController < Api::ApiController
    include ActionController::Cookies
    skip_before_action :authentication, only: :create

    def create
      user = User.find_by(email: create_params[:email])
      if user && user.authenticate(create_params[:password])
        add_cookie(create_user_token(user))
        render json: { user: { email: user.email } }
      else
        render json: { errors: {auth: ['Bad email or password']} },
               status: 400
      end
    end

    def destroy
      cookies.delete(:jwt)
      render json: {}
    end

    private

    def create_params
      params.permit(:email, :password)
    end

    def create_user_token(user)
      JsonWebToken.encode({user_id: user.id})
    end

    def add_cookie(value)
      cookies.signed[:jwt] = {
          value: value,
          expires: DateTime.now + 30.days,
          httponly: true
      }
    end
  end
end
