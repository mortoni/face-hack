(function() {
	'use strict';

	app.service('PostsService', PostsService);

	PostsService.$inject = ['$rootScope', 'APP_SETTINGS', '$firebaseArray'];
		
	function PostsService($rootScope, APP_SETTINGS, $firebaseArray){
		var vm = this;
		var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');
		vm.posts = [];
		ref.orderByKey().limitToLast(25);

		//save post on data base at firebase
	    this.save = function() {
	    	if($rootScope.posthacked){
		        $rootScope.posthacked.forEach(function(post) {
		        	if(!vm.isPostInDB(post)){
			        	vm.rankPost(post)
			        	var data = vm.postToObject(post);
		                ref.push(data); 
		                $rootScope.postCount = $rootScope.postCount + 1;
		            }  
	            });
		    }
	    };

	    //delete post on data base at firebase
	    this.delete = function() {
	        return null;
	    };

	    //edit post on data base at firebase
	    this.edit = function() {
	        return null;
	    };

	    //do math do rank a post
	    vm.rankPost = function(post) {
	    	// (likes*1) + (shares*3) + (comments*2) = x/time = y/page likes
	    	var time = vm.postInMinutes(post);
	    	
	    	var likes = 0;
	    	var shares = 0;
	    	var comments = 0;
	    	
	    	if(!(typeof post.likes == 'undefined'))
	    		likes = post.likes.summary.total_count;

	    	if(!(typeof post.shares == 'undefined'))
	    		shares = post.shares.count;

	    	if(!(typeof post.comments == 'undefined'))
	    		comments = post.comments.summary.total_count;

	    	try {
			    var score = (((likes*1) + (shares*3) + (comments*2))/time)/post.page_likes;
			}
			catch(err) {
			    var score = 0;
			}
	    	
	    	post.score = score;
	    };

	    vm.isPostInDB = function(post){
	    	
	    	//vm.posts = $firebaseArray(ref);
	    	var i;

	    	if(vm.posts.length == 0)
	    		return false;

		    for (i = 0; i < vm.posts.length; i++) {
		        if (vm.posts[i].id === post.id) {
		            return true;
		        }
		    }

		    return false;
	    }

	    activate();

		function activate() {
            vm.posts = $firebaseArray(ref);
        }

        //update post on data base at firebase
	    this.update = function() {
	    	vm.posts.forEach(function(post) {
	    		FB.api(
	                "/"+post.id+"/?fields=source,picture,type",
	                function (response) {
	                    if (response && !response.error) {
	                    	var refPost = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts/'+post.$id);
	                    	if(response.type == 'video')
	                    		refPost.update({ source: response.source});
	                    	if(response.type == 'photo')
	                    		refPost.update({ source: response.picture});         
	                    }
                	}
            	);
	    	});
	    };

	    //get a post and prepare it to an object
	    vm.postToObject = function(post) {
			var data = {
				id: post.id,
			    message: post.message,
			    picture: post.picture,
			    link: post.link,
			    source: post.source,
			    type: post.type,
			    created_time: post.created_time,
			    shares: post.shares.count,
			    comments: post.comments.summary.total_count,
			    likes: post.likes.summary.total_count,
			    score: post.score,
			    page_name: post.page_name,
			    page_id: post.page_id,
			    page_likes: post.page_likes,
			    page_picture: post.page_picture
			};

			return data;
	    };

	    this.post = function(data, page){
	    	var post = data;

	    	if(typeof post.source === 'undefined')
				post.source = null;
			if(typeof post.shares === 'undefined'){
				post.shares = {};
				post.shares.count = 0;
			}
			if(typeof post.message === 'undefined')
				post.message = '';
	
	    	post.time = vm.postTime(post);
			post.page_name = page.name;
			post.page_id = page.id;
			post.page_picture = page.picture;
			post.page_likes = page.likes;

			return post;
	    } 

	    //return a format of the post time
	    vm.postTime = function(post) {
	        var hourPost = new Date(post.created_time).getHours();
			var minPost = new Date(post.created_time).getMinutes();

			return hourPost + "h" + (minPost > 0 ? minPost : "");
	    };

	    //verify if the post is at least one hour ago
	    this.isPostHourAgo = function(post) {
	        var hourPost = new Date(post.created_time).getHours();
			var hourNow = new Date().getHours();
			var minutesPost = new Date(post.created_time).getMinutes();
			var minutesNow = new Date().getMinutes();

			if((hourNow - hourPost <= 1) && (hourNow - hourPost >= 0)){
				if(minutesPost <= minutesNow)
					return true;
			}
			return false;
	    };

	    vm.postInMinutes = function(post){
	    	var minutesPost = new Date(post.created_time).getMinutes();
	    	var minutesNow = new Date().getMinutes();
			return ( minutesNow - minutesPost);
	    }

	    //check if the post is valid
	    this.isPostValid = function() {
	        return false;
	    };

	    //save post on data base at firebase
	    this.functionName = function() {
	        return null;
	    };

	    vm.getPost = function(id){
	    	var p = [];
	    	vm.posts.forEach(function(post) {
	    		if(post.id == id)
	    			p = post;
	    	});
	    	return p;
	    };

	    //save post on data base at firebase
	}
	
})();