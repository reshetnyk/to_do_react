# frozen_string_literal: true

module Api
  class ApiController < ::ApplicationController
    include ActionController::Cookies
    before_action :authentication

    protected

    def current_user
      @current_user ||= User.find_by(id: payload.first['user_id'])
    end

    def authentication
      if !payload || !JsonWebToken.valid_payload(payload)
        return render_unauthorized
      end

      render_unauthorized unless current_user
    end

    private

    def payload
      token = cookies.signed[:jwt]
      return unless token

      JsonWebToken.decode(token)
    end

    def render_unauthorized
      render json: {}, status: :unauthorized
    end
  end
end
