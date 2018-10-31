var app = angular.module("SampleApp", ["RouteModule", "customServices"]);

//общий контроллер приложения
app.controller("SampleAppCtrl", function ($scope, $location, ajaxServices, basketServices) {

    //создаем и заполняем массивы моделей и групп товаров для навигационной панели + для соответствующих страниц
    $scope.models = [];
    $scope.categories = [];
    ajaxServices.initModels($scope);
    ajaxServices.initCategories($scope);
    
    //функция для панели навигации, добавляет элементу класс "active" если location страницы соответствует условию
    $scope.getClass = function (path) {
        return ($location.path() === path) ? 'active' : '';
    }

    $scope.basket = {}; //объект корзины
    //структура объекта корзины { {карточка: количество}, {карточка: количество}, ... }
    //при загрузке приложения заполняем объект корзины из localStorage
    basketServices.updateBasket($scope);

    //функция увеличивает/уменьшает кол-во товара в корзине и сохраняет её в localStorage
    $scope.basketChange = function(goodsCard, number) {
        basketServices.basketChange(goodsCard, number, $scope);
        basketServices.saveToLocalStorage($scope);
    }


    $scope.loginData = {}; //объект для передачи логина/пароля    
    //функция отображает форму для ввода логина/пароля
    $scope.showLoginForm = function() {
        $scope.loginForm = "view/login.html";
    }
    //функция скрывает форму для ввода логина/пароля
    $scope.hideLoginForm = function() {
        $scope.loginForm = "";
    }
    //функция для проверки правильности ввода логина/пароля
    $scope.loginFunction = function() {
        ajaxServices.loginFunction($scope);
    }
});

//контроллер страницы поиска по модели автомобиля
app.controller("modelCtrl", function($scope, ajaxServices, $routeParams) {
    $scope.items = [];
    $scope.searchGroup = $routeParams.model;
    ajaxServices.getGoodsByModel($scope);
});

//контроллер страницы поиска по группе товара
app.controller("categoryCtrl", function($scope, ajaxServices, $routeParams) {
    $scope.items = [];
    $scope.searchGroup = $routeParams.category;
    ajaxServices.getGoodsByCategory($scope);
});

//контроллер страницы поиска всех товаров
app.controller("goodsCtrl", function($scope, ajaxServices, $routeParams) {
    $scope.items = [];
    $scope.searchGroup = "Все товары";
    ajaxServices.getAllGoods($scope);
});

//контроллер страницы товара
app.controller("goodsPageCtrl", function($scope, ajaxServices, $routeParams) {
    $scope.searchGroup = $routeParams.card;
    $scope.item = [];
    ajaxServices.getGoodsByCard($scope);
});

//контроллер страницы корзины
app.controller("basketCtrl", function($scope, ajaxServices, basketServices) {
    //$scope.basket = {}; - объект корзины наследуем из общего контроллера приложения

    //по номеру карточки товара из корзины получаем и записываем в массив информацию о товаре для вывода в таблице
    $scope.data = [];
    for (var item in $scope.basket) {
        ajaxServices.getData($scope, item);
    }

    //функция увеличивает/уменьшает кол-во товара в корзине и сохраняет её в localStorage, также управляет массивом таблицы
    $scope.basketChange = function(i, number) {
        var goodsCard = $scope.data[i].card;
        basketServices.basketChange(goodsCard, number, $scope);
        basketServices.saveToLocalStorage($scope);

        //если товара больше нет в корзине, "строка" удаляется из массива таблицы
        if (!$scope.basket[goodsCard]) {
            $scope.data.splice(i, 1);
        }
    }
});