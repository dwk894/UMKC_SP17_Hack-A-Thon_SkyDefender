angular.module('app.services', [])

    .factory('UserService', function () {
		return{
			'logout': function(){
				$("#chat_box").empty();
			}
		};
        
    });