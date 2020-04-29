![Build Status](https://codeship.com/projects/f581e730-c770-0136-8cd5-6ac2adf14013/status?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kcravi/koacksel/badge.svg?branch=master)](https://coveralls.io/github/kcravi/koacksel?branch=master)
[![Code Climate](https://codeclimate.com/github/kcravi/koacksel/badges/gpa.svg)](https://codeclimate.com/github/kcravi/koacksel)



# Koacksel

Koacksel is a chat app using ActionCable, React.js and Ruby on Rails, with user authentication via devise and styling with the help of Foundation.

To run it locally:
```
$ bundle install
$ rake db:create
$ rake db:migrate
$ rails server
```
And then, in a separate terminal tab:
```
$ npm install
$ npm start
```
