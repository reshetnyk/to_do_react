# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[6.0] # :nodoc:
  def change
    create_table :tasks do |t|
      t.string :title

      t.timestamps
    end
  end
end
