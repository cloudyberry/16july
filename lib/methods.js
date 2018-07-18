if (Meteor.isServer) {
	//tell meteor that this is run on server
	Meteor.methods({
		// Method for adding jokes
		//add more parameters if i have more entries
		addUnapproved: function(hideName, reviewName, semester, recommendation, diff, workload, steepness, reviewPost, webcast, hashtag) {
			//cannot add if you are not logged in
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().profile.username;
        // var email = Meteor.user().emails[0].address;
				var school = Meteor.user().profile.school;
				var yr = Meteor.user().profile.year;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				//bec jan is 0
				var day = new Date().getDate();
				//create own kind of string
				var date = (month + "/" + day + "/" + year).toString();
				//insert into collection
				if (hideName === "Yes") {
					username = "";
				}
				if (hashtag==="#") {
					hashtag = "";
				}
				Reviews.insert({
					//add more if i have more entries
					reviewName: reviewName,
					reviewPost: reviewPost,
					year: yr,
					school: school,
					semester: semester,
					diff: diff,
					recommendation: recommendation,
					workload: workload,
					webcast: webcast,
					steepness: steepness,
					hashtag: hashtag,
          author: username,
					date: date,
					createdAt: new Date(),
					vetted:0,
					vetted: 0,
					likeScore: 0,
					commentScore: 0,
					dislikeScore: 0,
					voted: [username],
					userId: Meteor.userId(),
				});

			}
		},

		addComments: function(commentPost, thisReview) {
			//cannot add if you are not logged in
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var school = Meteor.user().profile.school;
				var yr = Meteor.user().profile.year;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				//bec jan is 0
				var day = new Date().getDate();
				//create own kind of string
				var date = (month + "/" + day + "/" + year).toString();
				//insert into collection
				Comments.insert({
					post_id:thisReview,
					//add more if i have more entries
					commentPost: commentPost,
					year: yr,
					school: school,
					date: date,
					createdAt: new Date(),
					userId: Meteor.userId(),
				}); //end of Reviews.insert

			} //end of else
		}, //end of addComments


		removeReview: function(reviewsId) {
			//if user of joke is not logged in, they can't
			//delete the joke
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.remove(reviewsId);
			}
		},

		addReviews: function(thisReview) {

				Reviews.update(thisReview,
					{ $set:
						{vetted:1}
					}
				);//ends update
		},//ends function
//reviewName, semester, recommendation, diff, workload, steepness, reviewPost
		editReview: function(thisReview, editName, editSem, editRecommendation, editDiff, editWorkload, editSteepness, editWebcast, editPost, editHashtag) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.update(thisReview,
					{ $set:
						{reviewName: editName,
						semester: editSem,
						recommendation: editRecommendation,
						diff: editDiff,
						workload: editWorkload,
						webcast: editWebcast,
						steepness: editSteepness,
						hashtag: editHashtag,
						reviewPost: editPost,
					  vetted: 0}
					}
				);//ends update
			}//ends else
		},//ends function,



		updateProfile: function(year,school) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			}
			else {
					Meteor.users.update(
						{ "_id": Meteor.userId() },
            { $set: {"profile.year": year,
										 "profile.school": school}
									 }
								 );//ends update
			}//ends else
		},

		returnHashtag: function(hashtag) {
			Reviews.update(
				{"hashtag": hashtag},
				{ $set: {"hashtagged":1}
			},
			{multi:true}
			 );//ends update
		},

		returnSearch: function(reviewName) {
			Reviews.update(
				{"reviewName": reviewName},
				{ $set: {"searched":1}
			},
			{multi:true}
			 );//ends update
		},

		returnMatch: function(recommendation, diff, workload, webcast, steepness) {

			//if they choose All
			//then how?
			//this is if they only chose for one entry
			if (recommendation==="All") {
				Reviews.update(
					{	"diff":diff,
						"workload":workload,
						"webcast": webcast,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
						{multi:true}
				 );//ends update
			}
			if (diff==="All") {
				Reviews.update(
					{	"recommendation": recommendation,
						"workload":workload,
						"webcast": webcast,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}
			if (workload==="All") {
				Reviews.update(
					{	"recommendation": recommendation,
						"diff":diff,
						"webcast": webcast,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if (webcast==="All") {
				Reviews.update(
					{	"recommendation": recommendation,
						"diff":diff,
						"workload":workload,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if (steepness==="All") {
				Reviews.update(
					{	"recommendation": recommendation,
						"diff":diff,
						"workload":workload,
						"webcast": webcast},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}
      //Two factors
			if ((recommendation==="All") && (diff === "All"))  {
				Reviews.update(
					{	"workload":workload,
						"webcast": webcast,
				  	"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All") && (workload === "All"))  {
				Reviews.update(
					{	"diff":diff,
						"webcast": webcast,
				   	"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All") && (steepness === "All"))  {
				Reviews.update(
					{	"diff":diff,
						"webcast": webcast,
						"workload":workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All") && (webcast === "All"))  {
				Reviews.update(
					{	"diff":diff,
						"workload":workload,
				  	"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((difficulty==="All") && (webcast === "All"))  {
				Reviews.update(
					{	"recommendation": recommendation,
						"workload":workload,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((difficulty==="All") && (workload === "All"))  {
				Reviews.update(
					{	"recommendation": recommendation,
						"webcast": webcast,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((difficulty==="All") && (steepness === "All"))  {
				Reviews.update(
					{	"recommendation": recommendation,
						"webcast": webcast,
						"workload":workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (steepness === "All"))  {
				Reviews.update(
					{ "diff":diff,
				  	"recommendation": recommendation,
						"webcast": webcast},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (webcast === "All"))  {
				Reviews.update(
					{ "diff":diff,
						"recommendation": recommendation,
						"steepness":steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((steepness==="All") && (webcast === "All"))  {
				Reviews.update(
					{ "diff":diff,
						"recommendation": recommendation,
						"workload":workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			// //three factors
			// if (recommendation==="All") {
			// 	if (diff === "All") {
			// 		if (workload === "All") {
			// 			Reviews.update(
			// 				{ "steepness":steepness,
			// 					"webcast": webcast},
			// 				{ $set: {"matched":1}
			// 			},
			// 				{multi:true}
			// 			 );//ends update
			// 		}
			// 	}
			// }

			if ((recommendation==="All" && diff === "All" && webcast === "All"))  {
				Reviews.update(
					{ "steepness":steepness,
						"workload": workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All" && diff === "All" && steepness === "All"))  {
				Reviews.update(
					{ "webcast":webcast,
						"workload": workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All" && workload === "All" && webcast === "All"))  {
				Reviews.update(
					{ "diff":diff,
						"steepness": steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All" && workload === "All" && steepness === "All"))  {
				Reviews.update(
					{ "diff":diff,
						"webcast": webcast},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((recommendation==="All" && webcast === "All" && steepness === "All"))  {
				Reviews.update(
					{ "diff":diff,
						"workload": workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((diff==="All" && webcast === "All" && workload === "All"))  {
				Reviews.update(
					{ "recommendation":recommendation,
						"steepness": steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((diff==="All" && steepness === "All" && workload === "All"))  {
				Reviews.update(
					{ "recommendation":recommendation,
						"webcast": webcast},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((webcast==="All" && steepness === "All" && workload === "All"))  {
				Reviews.update(
					{ "recommendation":recommendation,
						"diff": diff},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((webcast==="All" && steepness === "All" && diff === "All"))  {
				Reviews.update(
					{ "recommendation":recommendation,
						"workload": workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			// four factors
			if ((webcast==="All") && (steepness === "All") && (diff === "All") && (recommendation === "All"))  {
				Reviews.update(
					{ "workload": workload},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (steepness === "All") && (diff === "All") && (recommendation === "All"))  {
				Reviews.update(
					{ "webcast": webcast},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (steepness === "All") && (diff === "All") && (webcast === "All"))  {
				Reviews.update(
					{ "recommendation": recommendation},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (steepness === "All") && (recommendation === "All") && (webcast === "All"))  {
				Reviews.update(
					{ "diff": diff},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			if ((workload==="All") && (diff === "All") && (recommendation === "All") && (webcast === "All"))  {
				Reviews.update(
					{ "steepness": steepness},
					{ $set: {"matched":1}
				},
					{multi:true}
				 );//ends update
			}

			// if ((workload==="All") && (diff === "All") && (recommendation === "All") && (webcast === "All") && (steepness === "All"))  {
			// 	Reviews.insert(
			//
			// 	 {"matched":1}
			//
			// 		{multi:true}
			// 	 );//ends update
			// }
			// //if all are specific fields
			Reviews.update(
				{"recommendation": recommendation,
					"diff":diff,
					"workload":workload,
					"webcast": webcast,
					"steepness":steepness},
				{ $set: {"matched":1}
			},
				{multi:true}
			 );//ends update

		},



		endHashtag: function() {
			Reviews.update(
				{"hashtagged":1},
				{ $set: {"hashtagged":0}
			},
			{multi:true}
			);//ends update
		},

		endSearch: function() {
			Reviews.update(
				{"searched":1},
				{ $set: {"searched":0}
			},
			{multi:true}
			);//ends update
		},

		endMatch: function() {
			Reviews.update(
				{"matched":1},
				{ $set: {"matched":0}
			},
			{multi:true}
			);//ends update
		},

		countVote: function(thisReview, Name) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.update(thisReview, { $addToSet: { voted: Name}});
			}
		},

		userPointLike: function(reviewAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(reviewAuthor, { $inc: {'profile.likeScore': +1}});
			}
		},

		likeVote: function(thisUser, thisReview) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Reviews.update(thisReview, {$inc: {likeScore: +1}});
			}
		},

	//comments

		userPointDislike: function(reviewAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(reviewAuthor, { $inc: {'profile.dislikeScore': +1}});
			}
		},

		dislikeVote: function(thisUser, thisReview) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Reviews.update(thisReview, {$inc: {dislikeScore: +1}});
			}
		},

	});

}
