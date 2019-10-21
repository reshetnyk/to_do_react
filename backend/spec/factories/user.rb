FactoryBot.define do
  # it's a valid user
  factory :user do
    email { generate :email }
    password { "password" }
    password_confirmation { "password" }
    confirm_token { nil }
    confirmed_at { nil }
    password_reset_token { nil }
  end
  sequence :email do |n|
    "user#{n}@example.com"
  end
end
