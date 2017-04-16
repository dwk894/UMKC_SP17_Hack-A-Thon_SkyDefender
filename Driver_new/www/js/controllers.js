	angular.module('app.controllers', ['ngAnimate','ngCordova'])

    .controller('LoginCtrl', function ($scope, $http, $httpParamSerializerJQLike, $location, $ionicPopup) {
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
    
	.controller('logoutCtrl', function ($scope, $location) {
		$scope.cancle = function () {
			$location.path('/home/map');

		}
		
		$scope.logout = function () {
			sessionStorage.setItem('userID', null);
			sessionStorage.setItem('id', null);
    		sessionStorage.setItem('you', null);
			$location.path('/');
		}
	})
    .controller('mapCtrl', function ($scope, $http, $state, $cordovaGeolocation) {
  
var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 10,
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
//		  document.getElementById("nextlocation").addClass("show"); 
		  var tmplocation;
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
            
//------------------------------------------------------
          $cordovaGeolocation.getCurrentPosition(options).then(function(position){
                 
                  console.log(position);
                  var lat1 = parseFloat(position.coords['latitude']);
                  var lng1 = parseFloat(position.coords['longitude']);
                  console.log(lat1);
                  console.log(lng1);
                  var currentlocation = {'lat': lat1, 'lng': lng1};
                  console.log(currentlocation);
                  var lat2 = parseFloat(nextStation['latitude'])
                  var lng2 = parseFloat(nextStation['longtitude'])
                  nextStation =  {'lat': lat2, 'lng': lng2};
                  console.log(nextStation);
            
            
            var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: nextStation
        });
		  directionsDisplay.setMap(map);
		  calculateAndDisplayRoute(directionsService, directionsDisplay);
    

       function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: currentlocation,
          destination: nextStation,
          travelMode: 'DRIVING'
        },
		  function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
			  var summaryPanel = document.getElementById('directions-panel');
			  var route = response.routes[0];
//			  summaryPanel.innerHTML = '';
			  for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
//              summaryPanel.innerHTML += <b>Route Segment: ' + routeSegment +
//                  '</b><br>';
//              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                $('<div id="directions-panel" style="width: 96%;"class="card"><div class="item item-text-wrap"><p style="font-size: 20px;"><b>Next Station Information:</b><br></p><div class="list"><br><i class="icon ion-ios-location" style="font-size: 20px; padding-right: 16px;"></i>'+route.legs[i].end_address+'</div><div class="list"><i class="icon ion-model-s" style="font-size: 20px; padding-right: 16px;"></i>'+ route.legs[i].distance.text+'</div><div class="list"><i class="icon ion-clock" style="font-size: 20px; padding-right: 16px;"></i>'+route.legs[i].duration.text+'</div></div></div>').replaceAll(summaryPanel);
                
//                summaryPanel.innerHTML +=  '<div id="directions-panel" style="width: 96%;"class="card">';    
//   
//                summaryPanel.innerHTML += '<div class="item item-text-wrap">';
//                summaryPanel.innerHTML += ' <p>Next Station Information:</p>';
//
//                summaryPanel.innerHTML +=  '<div class="list">';
//                summaryPanel.innerHTML +=	'<i class="icon ion-ios-home" style="font-size: 24px; padding-right: 16px;">';
//                summaryPanel.innerHTML +=  '</i>';
//                summaryPanel.innerHTML += route.legs[i].end_address ;
                
          
//                summaryPanel.innerHTML +=	'</div>';
                
                
//                summaryPanel.innerHTML +=	'<div class="list">';
//                summaryPanel.innerHTML +=	'<i class="icon ion-clock" style="font-size: 24px; padding-right: 16px;">'
//                summaryPanel.innerHTML += ' </i>';
//                summaryPanel.innerHTML += route.legs[i].duration.text ;
//                summaryPanel.innerHTML +=	'</div>';
                
                
//                summaryPanel.innerHTML += '</div>';
//                summaryPanel.innerHTML += '</div>';

			  }
			  
			  tmplocation = route.legs[route.legs.length - 1];
			  console.log(tmplocation);

			  
			  showSteps(response);
              $scope.location = tmplocation;
             function showSteps(directionResult) {
  
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point,
        map: map
      });
      attachInstructionText(marker, myRoute.steps[i].instructions);
      markerArray[i] = marker;
  }
}
		  
		  
		  
	  function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
	  
	  
			  
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
	  }

            
            
          })
          //---------------------------------------------
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


