source 'https://rubygems.org/'

# ruby '2.2.1'
ruby '2.3.3'

gem 'active_model_serializers'
gem "rails", "5.1.2"
gem 'pg', '~> 0.15'
gem 'pg_search'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'listen'
gem 'haml-rails'
gem 'devise'
gem "puma", "~> 3.12"
gem "coffee-rails", "~> 4.2"
gem "jbuilder", "~> 2.5"
gem "redis", "~> 3.0"
gem 'foundation-rails'
gem 'warden'
gem 'concurrent-ruby', '~> 1.1', '>= 1.1.3'

group :development, :test do
  gem 'capybara'
  gem 'factory_bot_rails'
  gem 'rspec-rails', '~> 3.0'
  gem 'pry-rails'
  gem 'shoulda'
  gem 'valid_attribute'
  gem "dotenv-rails"
end

group :development do
  # gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem 'launchy'
  gem 'database_cleaner'
  gem 'faker'
  gem 'coveralls', require: false
end

group :production do
  gem 'rails_12factor'
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
