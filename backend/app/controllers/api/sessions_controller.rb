# frozen_string_literal: true

module Api
  class SessionsController < Api::ApiController
    include ActionController::Cookies

    def create
      user = User.find_by(email: params[:email])
      if user.authenticate(params[:password])
        token = JsonWebToken
                .encode(user_id: user.id, exp: DateTime.now + 7.days)
        cookies.signed[:jwt] = { value: token, expires: DateTime.now + 7.days,
                                 httponly: true }
        render json: {}, status: 200
      else
        render json: { errors: [{ password: 'Password haven\'t match.' }] },
               status: 400
      end
    end

    def destroy
      cookies.delete(:jwt)
      render json: {}
    end
  end
end
