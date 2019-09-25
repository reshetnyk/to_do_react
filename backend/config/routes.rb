Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :tasks

    namespace :tasks do
      resource :bulk_removes,only: :destroy
    end
  end
end
