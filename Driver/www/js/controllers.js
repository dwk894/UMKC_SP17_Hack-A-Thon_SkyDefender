	angular.module('app.controllers', ['ngAnimate','ngCordova'])

    .controller('LoginCtrl', function ($scope, $http, $httpParamSerializerJQLike, $location, $ionicPopup, UserService) {
        $scope.pageClass = 'validate';  
        $scope.doLogin = function(credential){
        console.log("inside login function");
        $http({
            method: 'GET',
            url: 'https://api.mlab.com/api/1/databases/skydefender/collections/sky?q={"_id": "' + credential.username + '", "password": "' + credential.password + '"}&apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR',           
            contentType: "application/json"
        }).success (function(data) {
            console.log(data);
            if(data!=""){

                sessionStorage.setItem("userID", data["0"]._id);                 
                $location.path('/home/map');
            }
            else {
              $scope.msg ="Incorrect user ID or password!";
              console.log(credential.username);

            }
        })            
    }
    })
    
    .controller('mapCtrl', function ($scope, $http, $state, $cordovaGeolocation) {
  
var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  console.log("after map");
  }, function(error){
    console.log("Could not get location");
  });
    
    $scope.finish = function () {
		var newData;
		var dataset =[];
        console.log("delete current waste point");
        $http({
            method: 'GET',
             url: 'https://api.mlab.com/api/1/databases/skydefender/collections/sky/'+ sessionStorage.getItem("userID")+'?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR',           
            contentType: "application/json"
        }).success (function(data) {
		console.log(data);		

			var tmp = data['waste_list'];
            console.log(data['waste_list']);
			var deletedlocation;
			for(var i = 0; i < tmp.length; i++){
				if(tmp[i]['priority'] !== "1")
					dataset.push(tmp[i]);
				else {
					console.log(tmp[i]);
					deletedlocation = tmp[i]['waste_id'];
				}
			}
			console.log(deletedlocation);
			
			for(var i = 0; i < dataset.length; i++){
				var x = parseInt(dataset[i]['priority']);
				x--;
				dataset[i]['priority'] = x.toString();
			}
			console.log(dataset);
			newData = data;
			newData['waste_list'] = dataset;
			newData['current_location'] = {"waste_id": deletedlocation};
			console.log(newData['current_location']);
			$http({
            method: 'DELETE',
             url: 'https://api.mlab.com/api/1/databases/skydefender/collections/sky/'+ sessionStorage.getItem("userID")+'?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR', 
            contentType: "application/json"
        }).success (function(data) {
				console.log("deleted");		

        })
			 $http({
                    method: 'POST',
                    url : 'https://api.mlab.com/api/1/databases/skydefender/collections/sky?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR',
                    data: JSON.stringify({
                        _id:newData['_id'],
                        password: newData['password'],
                        email: newData['email'],
                        admin: newData['admin'],
						source_list: newData['source_list'],
						Destination: newData['Destination'],
						waste_list: newData['waste_list'],
						current_location: newData['current_location']
                    }),
                    contentType: "application/json"
                }).success(function(data) { 
                    console.log("created document");
                })
        })
      }
      
      $scope.getNext = function () {
        console.log("get next waste point");
		var nextStation;
        $http({
            method: 'GET',
             url: 'https://api.mlab.com/api/1/databases/skydefender/collections/sky/'+ sessionStorage.getItem("userID")+'?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR',            
            contentType: "application/json"
        }).success (function(data) { 
            console.log(data);
            for(var i = 0; i < data['waste_list'].length; i++){
				console.log(data['waste_list']);
				if(data['waste_list'][i]['priority'] === "1"){
					nextStation = data['waste_list'][i];
					console.log(nextStation);
					break;
				}
			}            
            
			var test_point1,
        })
        
      }
    })

    .controller('wastepointsCtrl', function ($scope, $http,$stateParams) {
        console.log("get remaining waste point");
        $http({
            method: 'GET',
             url: 'https://api.mlab.com/api/1/databases/skydefender/collections/sky/'+ sessionStorage.getItem("userID")+'?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR',           
            contentType: "application/json"
        }).success (function(data) { 
            console.log(data['waste_list']);
            $scope.items = data['waste_list'];
            console.log($scope.items);
            
        })
        
    })

    .controller('chatCtrl', function ($scope, $stateParams) {
      console.log("chat application");
		var me = sessionStorage.getItem('userID');
     sessionStorage.setItem('id', me);
    sessionStorage.setItem('you', 'Dayu');
    var id = sessionStorage.getItem('id');
    var you = sessionStorage.getItem('you');
    $('#target').append(you);
    $.ajax(
      {
        url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
        method: 'GET',
        success: function(result) {
          var last_msg = result['received_msg']['msg'];
          var last_from = result['received_msg']['from'];
          var last_time = result['received_msg']['time'];
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              data: JSON.stringify(
                {
                  "$set": {
                    "switch": "1"
                  }
                }
              ),
              type: "PUT",
              contentType: "application/json",
              success: function(result) {
                var timer = setInterval(
                  function() {
                    $.ajax(
                      {
                        url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                        method: 'GET',
                        success: function(result) {
                          if (last_time !== result['received_msg']['time']) {
                            last_msg = result['received_msg']['msg'];
                            last_from = result['received_msg']['from'];
                            last_time = result['received_msg']['time'];
                            $('#chatting').append('<b>' + last_from + '</b>: ' + last_msg + '<br>');
                          }
                        },
                        error: function(error) {
                        }
                      }
                    );
                  },
                  3000
                );
              },
              error: function(error) {
              }
            }
          );
        },
        error: function(error) {
        }
      }
    );
		
		
		$(
  function() {
    $('#send').click(
      function() {
        var id = sessionStorage.getItem('id');
        var you = sessionStorage.getItem('you');
        var msg = $('#chat_msg').val();
        if (msg.length > 0) {
          $('#chat_msg').val('');
          $('#chatting').append('<b>' + id + '</b>: ' + msg + '<br>');
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + you + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              method: 'GET',
              success: function(result) {
                var on = result['switch'];
                if (on !== '1') {
                  $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
                } else {
                  var time = Date.now();
                  $.ajax(
                    {
                      url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + you + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                      data: JSON.stringify(
                        {
                          "$set": {
                            "received_msg": {
                              "from": id,
                              "msg": msg,
                              "time": time.toString()
                            }
                          }
                        }
                      ),
                      type: "PUT",
                      contentType: "application/json",
                      success: function(result) {
                      },
                      error: function(error) {
                        $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
                      }
                    }
                  );
                }
              },
              error: function(error) {
                $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
              }
            }
          );
        }
      }
    );
  }
);
		
		
 });


