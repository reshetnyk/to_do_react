# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  before_create :add_confirm_token

  validates :email,
            uniqueness: true,
            presence: true,
            format: {
              with: VALID_EMAIL_REGEX,
              message: 'haven\'t match with email pattern'
            }
  validates :password, presence: true, length: { minimum: 6, maximum: 40 }
  validates :password_confirmation, presence: true

  has_secure_password
  has_many :tasks, -> { order(position: :asc) }

  def confirmed?
    return true if confirmed_at

    false
  end

  def activate
    update_attribute(:confirmed_at, DateTime.now)
    update_attribute(:confirm_token, nil)
  end

  private

  def add_confirm_token
    self.confirm_token = SecureRandom.urlsafe_base64.to_s
  end
end
