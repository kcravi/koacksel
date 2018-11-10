require 'factory_bot'

FactoryBot.define do
  factory :chat do
    sequence(:title) {|n| "title#{n}" }
  end
end
