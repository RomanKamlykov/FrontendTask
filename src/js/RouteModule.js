angular.module('RouteModule', ['ngRoute', 'customServices'])
.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "view/promotionsAndNews.html"
    })
    .when("/categories", {
        templateUrl: "view/categories.html"
    })
    .when("/models", {
        templateUrl: "view/models.html"
    })    
    .when("/goods", {
        templateUrl: "view/goods.html",
        controller: "goodsCtrl"
    })    
    .when("/categories/:category", {
        templateUrl: "view/goods.html",
        controller: "categoryCtrl"
    })
    .when("/models/:model", {
        templateUrl: "view/goods.html",
        controller: "modelCtrl"
    })
    .when("/goods/:card", {
        templateUrl: "view/goodsPage.html",
        controller: "goodsPageCtrl"
    })
    .when("/basket", {
        templateUrl: "view/basket.html",
        controller: "basketCtrl"
    })
    .otherwise({
        redirectTo: "/"
    })
});