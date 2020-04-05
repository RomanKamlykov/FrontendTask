# FrontendTask
You can see the working application [here](https://romankamlykov.github.io/angularjs_app_1/src/index.html).

The application uses the following tools:
- HTML
- CSS, LESS, Bootstrap
- JS, jQuery, AngularJS, AJAX
- MongoDB

## Description
The main page of the application contains the following elements:
- header
- navbar
- the main element
- footer
- login form (hidden by default)


All elements are loaded using the ng-include directive, except for the main element, which is loaded using the ng-view directive. The ng-view directive uses the ngRoute module to change its content when the URL changes.

Thus, we can switch between the following views:
- a page with a carousel and several blocks with news
- a page where you can choose a car model
- a page with goods that are filtered by the selected car model
- a page where you can select a group of products
- a page with products that are filtered by the selected product group
- a page with all the goods
- product information page
- shopping cart


Information about the selected products is downloaded from the MongoDB database, which is located at https://mlab.com/. The shopping cart is stored in the local storage of the browser.
