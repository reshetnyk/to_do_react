# t.string "title"
# t.datetime "created_at",
# t.datetime "updated_at",
# t.integer "position"
# t.integer "status", default: 0
# t.integer "user_id"
FactoryBot.define do
  factory :task do
    user
    title {'user_title'}
    created_at {nil}
    updated_at {nil}
    position {nil}
    status {0}
  end
end
