angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $http, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
    
    $scope.usuarioActual = "";
    $scope.logOutItem = false;
    $scope.addTransactionItem = false;
    $scope.editTransactionItem = false;
    $scope.loginItem = true;
    $scope.userRegisterItem = true;
    
  // Form data for the login modal
    $scope.loginData = {};
    $scope.registerData = {};
    $scope.transactionData = {};
    $scope.transactionAddData = {};
    $scope.usuarioActual;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
    
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      
      $http.post("http://localhost/apiExamenMoviles/public/login", $scope.loginData)
            .success(function(response) {
          
            if(response.email != null){
                    $scope.logOutItem = true;
                    $scope.addTransactionItem = true;
                    $scope.editTransactionItem = true;
                    $scope.loginItem = false;
                    $scope.userRegisterItem = false;
                    $scope.listTransactionItem = true;
                    $scope.usuarioActual = response;
                    console.log($scope.usuarioActual);
                    $scope.closeLogin();
                    $scope.listTransactionLoad();

                }
                                     
            else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                    });
             }
        });
      
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
    $scope.logOut = function(){
        $scope.logOutItem = false;
        $scope.addTransactionItem = false;
        $scope.editTransactionItem = false;
        $scope.loginItem = true;
        $scope.userRegisterItem = true;
        
        $scope.usuarioActual = null;
    };
    
    // Perform the register action when the user submits the register form
    $scope.doRegister = function(){
        
        
        $http.post("http://localhost/apiExamenMoviles/public/users",$scope.registerData)
            .success(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Register User!',
                        template: 'Successful registration!'
                        });
            }).error(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Register User!',
                        template: 'Error Register!'
                }); 
        });
    };
    
    $scope.listTransactionLoad = function(){
        
        $http.get("http://localhost/apiExamenMoviles/public/Otransaction/"+$scope.usuarioActual.id)
            .success(function(response) {$scope.listTransaction = response;
                                         
            }).error(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'There are not transactions!'
                }); 
        });
    };
    
    $scope.editTransactionsList = function(transactionActual){
        
        console.log(transactionActual);
        $scope.transactionData.type = transactionActual.type;
        $scope.transactionData.status = transactionActual.status;
        $scope.transactionData.rode = transactionActual.rode;
        $scope.transactionData.date = transactionActual.date;
        $scope.transactionData.id = transactionActual.id;
        
        $state.go('app.editTransactions');
    };
    
    // Perform the transaction action when the user submits the add transaction form
    $scope.doAddTransactions = function(){
        
        $scope.transactionAddData.idUser = $scope.usuarioActual.id;
        
        $http.post("http://localhost/apiExamenMoviles/public/Ctransaction", $scope.transactionAddData)
            .success(function(response) {
                $scope.listTransactionLoad();
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Successful Transaction Add'
                }); 
            }).error(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Error transactions!'
                }); 
        });
        
    };
    
    // Perform the transaction action when the user submits the edit transaction form
    $scope.doEditTransactions = function(){
        
        $http.put("http://localhost/apiExamenMoviles/public/Etransaction/"+$scope.transactionData.id, $scope.transactionData)
            .success(function(response) {
                $scope.listTransactionLoad();
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Successful Transaction Edit!'
                }); 
            }).error(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Error transactions edit!'
                }); 
        });
    };
    
    // Perform the transaction action when the user submits the disable transaction form
    $scope.doDisable = function(id){
        
        $http.put("http://localhost/apiExamenMoviles/public/CStransaction/"+id)
            .success(function(response) {
            
                $scope.listTransactionLoad();
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Successful Change Status!'
                }); 
            }).error(function(response) {
            
                var alertPopup = $ionicPopup.alert({
                        title: 'Transaction!',
                        template: 'Error Change Status!'
                }); 
        });
    };
    
});
