# frozen_string_literal: true

class AddPositionColumnToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :position, :integer
  end
end
