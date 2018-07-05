angular.module("customServices", [])
.factory("ajaxServices", function ($http) {
    var myDB = "https://api.mlab.com/api/1/databases/frontendtask/collections/";
    var apiKey = "qvP3YRPcnJwJSX3BFaVhI7dWnBYzkzfx";

    return {

        //функция для получения свойств из базы данных по номеру карточки товара
        getData: function ($scope, card) {
            $http.get(myDB + 'items?q={"card": "'+ card + '"}&apiKey=' + apiKey)    
            .success(function (response) {
                var obj = {};
                obj.name = response[0].name;
                obj.card = response[0].card;
                obj.img = response[0].img;
                obj.price = response[0].price;
                $scope.data.push(obj);
            });
        },

        //функция для получения массива моделей автомобилей
        initModels: function($scope) {
            $http.get(myDB + "models?apiKey=" + apiKey)    
            .success(function (response) {
                $scope.models = response;
            });
        },

        //функция для получения массива групп товаров
        initCategories: function($scope) {
            $http.get(myDB + "categories?apiKey=" + apiKey)
            .success(function (response) {
                $scope.categories = response;
            });
        },

        //функция для получения товаров по модели автомобиля
        getGoodsByModel: function($scope) {
            $http.get(myDB + 'items?q={"name": {"$regex": "'+ $scope.searchGroup + '"}}&apiKey=' + apiKey)     
            .success(function (response) {
                $scope.items = response;
            });
        },

        //функция для получения товаров по группе товара
        getGoodsByCategory: function($scope) {
            $http.get(myDB + 'items?q={"category": "'+ $scope.searchGroup + '"}&apiKey=' + apiKey)   
            .success(function (response) {
                $scope.items = response;
            });
        },

        //функция для получения всех товаров
        getAllGoods: function($scope) {
            $http.get(myDB + "items?apiKey=" + apiKey)    
            .success(function (response) {
                $scope.items = response;
            });
        },

        //функция для получения товара по номеру карточки
        getGoodsByCard: function($scope) {
            $http.get(myDB + 'items?q={"card": "'+ $scope.searchGroup + '"}&apiKey=' + apiKey)    
            .success(function (response) {
                $scope.item = response;
            });
        },

        //функция для проверки правильности ввода логина/пароля
        loginFunction: function($scope) {
            $http.get(myDB + 'users?q={"user": "'+ $scope.loginData.username + "/" + $scope.loginData.password + '"}&apiKey=' + apiKey)    
            .success(function (response) {

                //если ответ не получен (логин/пароль не верные) выводим предупреждение
                if(response[0] == undefined) {
                    $scope.loginData.showWarning = true;
                }
                //если ответ получен (логин/пароль верные) скрываем окно логина и меняем кнопку «Войти» на приветствие
                else {
                    $scope.loginData.showWarning = false;
                    $scope.loginForm = "";
                    $scope.loginbutton = true;
                }                
            });
        }
    }
}).factory("basketServices", function () {
    return {

        //функция обновляет содержимое корзины из localStorage
        updateBasket: function($scope) {
            if (window.localStorage.basket) {
                $scope.basket = JSON.parse(window.localStorage.basket);
            }
        },

        //функция сохраняет содержимое корзины в localStorage
        saveToLocalStorage: function ($scope) {
            window.localStorage.basket = JSON.stringify($scope.basket);
        },

        //функция увеличивает/уменьшает кол-во товара в корзине
        basketChange: function(goodsCard, number, $scope) {

            //если в корзине нет нужного объекта - создаем его и устанавливаем кол-во 1шт.
            if (!$scope.basket[goodsCard]) {
                $scope.basket[goodsCard] = {};
                $scope.basket[goodsCard] = 1;
            }
            //иначе добавляем к количеству +1/-1
            else {
                $scope.basket[goodsCard] += number;

                //если в итоге количество =0 - удаляем объект из корзины
                if ($scope.basket[goodsCard] == 0) {
                    delete $scope.basket[goodsCard];
                }
            }
        }
    }
});