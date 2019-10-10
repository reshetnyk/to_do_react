# frozen_string_literal: true

module Api
  class SessionsController < Api::ApiController
    include ActionController::Cookies

    def create
      user = User.find_by(email: create_params[:email])
      if !user
        render json: { errors: { email: ['Email doesn\'t exist.'] } },
               status: 400
      elsif user.authenticate(create_params[:password])
        put_token(user)
        render json: { user: { email: user.email } }, status: 200
      else
        render json: { errors: { password: ['Wrong password.'] } }, status: 400
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

    def put_token(user)
      token = JsonWebToken.encode(
        user_id: user.id,
        exp: DateTime.now + 7.days
      )
      cookies.signed[:jwt] = {
        value: token,
        expires: DateTime.now + 7.days,
        httponly: true
      }
    end
  end
end
