# frozen_string_literal: true

class User < ApplicationRecord
  # validates :password, :presence => true, :length => {:within => 6..40}

  has_secure_password
  has_many :tasks, -> { order(position: :asc) }
end
