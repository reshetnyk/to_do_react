# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include ActionController::Cookies
    require_relative '../../utils/json_web_token'

    protected

    attr_reader :current_user

    def authentication
      render_unauthorized unless authenticate_token
    end

    private

    def authenticate_token
      token = cookies.signed[:jwt]
      if token
        decoded = HashWithIndifferentAccess.new(JsonWebToken.decode(token))
        if decoded
          @current_user = User.find(decoded[:user_id])
          return true
        end
      end
      false
    end

    def render_unauthorized
      errors = { errors: [{ message: 'Access denied' }] }
      render json: errors, status: :unauthorized
    end
  end
end
