# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: %i[uncompleted completed]
  acts_as_list
end
