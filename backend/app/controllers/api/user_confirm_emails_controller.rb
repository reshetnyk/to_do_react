# frozen_string_literal: true

module Api
  class UserConfirmEmailsController < ApiController
    skip_before_action :authentication, only: :update

    def update
      user = User.find_by(confirm_token: update_params[:confirm_token])
      if user
        user.activate
        render json: {}
      else
        render json: { error: 'Confirmation failed.' }, status: 400
      end
    end

    private

    def update_params
      params.permit(:confirm_token)
    end
  end
end
