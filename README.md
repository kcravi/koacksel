![Build Status](https://codeship.com/projects/262f1f50-c76e-0136-99fa-02b711961e9b/status?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kcravi/koacksel/badge.svg?branch=master)](https://coveralls.io/github/kcravi/koacksel?branch=master)

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

References:
This chat app is inspired by my mentor Nick Alberts work on ActionCable for chat purpose. So the title name of the app was not altered either.
https://github.com/nwalberts/koacksel
