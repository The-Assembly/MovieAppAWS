fetch('https://gfioehu47k.execute-api.us-west-1.amazonaws.com/staging/main')
	.then(
		function(res) {
			if(res.status !== 200){
				console.log("hi");
				console.log(res.status)
			} else {
				res.json().then(function(data){
					console.log(data.length);
					for(i = 0; i < data.length; i++){
						console.log(data[0])
						document.querySelector("#listing").innerHTML += `
						<div class="col-md-3 col-sm-12">
                    		<div class="thumbnail gallery">
                        		<img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}">
                        		<div class="caption">
                            	<h4>${data[i].title}</h4>
                        		</div>
                    		</div>
               		 	</div>
						`;

					}
				});
			}
		}	
	).catch(function(err){
		console.log(err);
	});
