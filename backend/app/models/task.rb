# frozen_string_literal: true

class Task < ApplicationRecord
  STATUS_OPTIONS = %i[uncompleted completed].freeze

  validates :title, presence: true, length: { minimum: 2, maximum: 100 }
  validates :status, presence: true

  acts_as_list scope: :user
  belongs_to :user
  enum status: STATUS_OPTIONS
end
