﻿namespace CreatingModals {
    
    angular.module('CreatingModals', ['ngRoute', 'ui.bootstrap']);

    angular.module('CreatingModals').factory('authInterceptor',
        ($q: ng.IQService, $window: ng.IWindowService, $location: ng.ILocationService) => {
            return {
                request: (config) => {
                    config.headers = config.headers || {};
                    let token = $window.localStorage.getItem('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                responseError: (response) => {
                    if (response.status === 401) {
                        $location.path('/login');
                    }
                    return response || $q.when(response);
                }
            };
        });

    angular.module('CreatingModals')
        .config(function ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider) {

            $httpProvider.interceptors.push('authInterceptor');

            $routeProvider.when('/', {
                templateUrl: 'Presentation/ngApp/views/home.html',
                controller: CreatingModals.Controllers.HomeController,
                controllerAs: 'controller'
            });
        });
}