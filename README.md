CoinBreaker
===========

A simple JS app to break Sterling values into the minimum constituent coins

## Running the app

To run the app simply clone this repository and navigate to CoinBreaker.html. There is no build necessary.

To run tests navigate to SpecRunner.html, which will execute the app's Jasmine specs in the browser.

## Dependencies

All dependencies are included in the repository.

The third party libraries used are:

- [Requirejs](http://requirejs.org)
- [Jasmine](http://pivotal.github.io/jasmine/)
- [Normalize](http://git.io/normalize)

I considered using further libraries, such as Underscore and Backbone, but decided that I would like to complete the task
using as much vanilla JS as possible. I recognise that this may not have been necessary, and inded in a production
environment I would consider this approach to be unnecessarily reinventing the wheel (particularly with regard to my
MVC implementation), nevertheless I found this approach interesting and challenging and hope that I have demonstrated
well my command of the language.

## Architecture and code organisation

I chose to implement an MVC architecture for this app:

    +------------+
    |            |
    | controller |+-----------------+
    |            |     updates      |
    +-----+------+                  v
          |                   +------------+
          |                   |            |
          | observes          |   model    |
          |                   |            |
          v                   +------------+
    +------------+                  ^
    |            |                  |
    |    view    |+-----------------+
    |            |      observes
    +------------+

This informed my code organisation, whereby modular components of the app are stored and tested in isolation.

There are two utility modules in the application, one for validating user input in the view, the other used by the
controller to denominate coins. These are entirely standalone modules and are extensible.


## Outstanding tasks

There are a few remaining tasks that I are incomplete as I submit this work, which I would like to have completed.

- Unit testing the view
- Refactoring MVC components to not violate DRY in boilerplate code
- Refactoring shared code in the specs in line with DRY principle
- Commenting of test cases in the specs, in particular data providers
- Improve / clarify markup of errors in UI

