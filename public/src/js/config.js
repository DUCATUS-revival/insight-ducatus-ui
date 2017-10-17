'use strict';

//Setting up route
angular.module('insight').config(function($routeProvider) {
  $routeProvider.
    when('/block/:blockHash', {
      templateUrl: 'views/block.html',
      title: 'Ducatuscoin Block '
    }).
    when('/block-index/:blockHeight', {
      controller: 'BlocksController',
      templateUrl: 'views/redirect.html'
    }).
    when('/tx/send', {
      templateUrl: 'views/transaction_sendraw.html',
      title: 'Broadcast Raw Transaction'
    }).
    when('/tx/:txId/:v_type?/:v_index?', {
      templateUrl: 'views/transaction.html',
      title: 'Ducatuscoin Transaction '
    }).
    when('/', {
      templateUrl: 'views/index.html',
      title: 'Home'
    }).
    when('/blocks', {
      templateUrl: 'views/block_list.html',
      title: 'Ducatuscoin Blocks solved Today'
    }).
    when('/blocks-date/:blockDate/:startTimestamp?', {
      templateUrl: 'views/block_list.html',
      title: 'Ducatuscoin Blocks solved '
    }).
    when('/address/:addrStr', {
      templateUrl: 'views/address.html',
      title: 'Ducatuscoin Address '
    }).
    when('/status', {
      templateUrl: 'views/status.html',
      title: 'Status'
    }).
    when('/messages/verify', {
      templateUrl: 'views/messages_verify.html',
      title: 'Verify Message'
    })
    .otherwise({
      templateUrl: 'views/404.html',
      title: 'Error'
    });
});

//Setting HTML5 Location Mode
angular.module('insight')
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  })
  .run(function($rootScope, $route, $location, $routeParams, $anchorScroll, ngProgress, gettextCatalog, amMoment) {
    gettextCatalog.currentLanguage = defaultLanguage;
    amMoment.changeLocale(defaultLanguage);
    $rootScope.$on('$routeChangeStart', function() {
      ngProgress.start();
      ngProgress.set(100); // just a bar, no progress
    });

    $rootScope.$on('$routeChangeSuccess', function() {
      // ngProgress.complete();  // fades out the bar, which we don't want

      //Change page title, based on Route information
      $rootScope.titleDetail = '';
      $rootScope.title = $route.current.title;
      $rootScope.isCollapsed = true;
      $rootScope.currentAddr = null;

      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  });
