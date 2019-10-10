# frozen_string_literal: true

module Api
  class UsersController < Api::ApiController
    def create
      user = User.find_by(email: create_params[:email])
      render_email_error && return if user
      user = User.new(create_params)
      if user.save
        render json: {}
      elsif user.errors[:password_confirmation]
        render_pass_error && return
      end
    end

    private

    def render_email_error
      render json: { errors: { email: ['Such email is already taken.'] } }
    end

    def render_pass_error
      render json: {
        errors: {
          password_confirmation: ['Passwords haven\'t matched.']
        }
      }
    end

    def create_params
      params.permit(:email, :password, :password_confirmation)
    end
  end
end
