# frozen_string_literal: true

class AddEmailConfirmColumnToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :confirmed_at, :datetime, default: nil
    add_column :users, :confirm_token, :string
  end
end
