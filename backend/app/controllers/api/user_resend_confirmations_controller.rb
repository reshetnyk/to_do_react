module Api
  class UserResendConfirmationsController < ApiController
    skip_before_action :authentication, only: :update

    def update
      user = User.find_by(email: update_params[:email])
      if user && !user.confirmed?
        UserMailer.confirmation_letter(user).deliver
      end
      render json: {flash: [{msg: 'The letter with confirmation instructions was sent to your email.', type: 'success'}]}
    end

    private

    def update_params
      params.permit(:email)
    end
  end
end
