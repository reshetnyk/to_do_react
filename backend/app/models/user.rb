# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

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
end
