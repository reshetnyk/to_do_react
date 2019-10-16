# frozen_string_literal: true

class UserMailer < ActionMailer::Base
  default from: 'shit@localhost.com'

  def confirmation_letter(user)
    @user = user
    mail(to: "<#{user.email}>", subject: 'Registration Confirmation')
  end

  def password_reset_letter(user)
    @user = user
    mail(to: "<#{user.email}>", subject: 'Password resetting')
  end
end
