# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :tasks
    resource :task_bulk_removes, only: :destroy
    resource :task_update_positions, only: :update
    resource :task_update_completes, only: :update
    resource :sessions, only: %i[create destroy]
    resources :users
    resource :user_confirm_emails, only: :update
  end
end
