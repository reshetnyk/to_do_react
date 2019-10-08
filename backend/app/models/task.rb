# frozen_string_literal: true

class Task < ApplicationRecord
  acts_as_list scope: :user
  belongs_to :user
  enum status: %i[uncompleted completed]
end
