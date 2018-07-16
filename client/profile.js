Template.profile.rendered = function() {
	$("#profile-link").addClass('selected');
	$("#reviews-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');

}

Template.profile.helpers({

	email: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function() {
		if(!Meteor.user()) {

			return false;
		} else {
			//console.log(Meteor.user().username);
			return Meteor.user().profile.username;
		}
	},

	year: function() {

			return Meteor.user().profile.year;
	},

	school: function() {

			return Meteor.user().profile.school;
	},

	userReviews: function() {
		// var username = Meteor.user().username;
		var userId = Meteor.userId();
		var username = Meteor.user().profile.username;
		var userReviews = Reviews.find({userId:userId}, {sort: {createdAt: -1}});
		return userReviews;
	},
	//to display the respective scores of the users in the profile
	userlikeScore: function() {
		return Meteor.user().profile.likeScore;
	},

	userdislikeScore: function() {
		return Meteor.user().profile.dislikeScore;
	},

	editing: function() {
		return Session.equals('editReviewId', this._id);
	},

	editProfile: function() {
		return Session.equals('editProfileId', this._id);
	},

	admin: function() {
		var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
		var userId = Meteor.userId();
		if (userId === adminId) {
		return true;
	}
	},

		nonAdmin: function() {
				var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
				var userId = Meteor.userId();
				if (userId === adminId) {
				return false;
			}
		}

});

Template.profile.events({

	"click #hashtag": function() {
		var hashtag = Reviews.findOne({_id: this._id}).hashtag;
		console.log(hashtag);
		Meteor.call('endHashtag');
		Meteor.call('returnHashtag', hashtag);
	},

	"click #edit-profile": function() {
		Session.set('editProfileId',this._id);
		//console.log(this._id);
		//Meteor.call("editReview", this._id);
		},//ends function

		"click #cancelEditedProfile": function() {
			Session.set('editProfileId', null);
		},

		"submit .profile-form": function() {
			var year = event.target.year.value;
			var school = event.target.school.value;

			Meteor.call("updateProfile",year,school);
			//Session.set('editProfileId', null);
		},

	"click #delete-review": function() {
		//id linked to specific joke
		Meteor.call("removeReview", this._id);
		Bert.alert("Your Review Was Deleted", "success", "growl-top-right");
	},

	"click #edit-review": function() {
		Session.set('editReviewId',this._id);
		//console.log(this._id);
		//Meteor.call("editReview", this._id);
		},//ends function

		"click #cancelEditedReview": function() {
			Session.set('editReviewId', null);
		},

	"submit .edit-post": function() {
			//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
			var editName = event.target.reviewName.value;//must change all the values
			var editSem = event.target.semester.value;
			var editRecommendation = event.target.recommendation.value;
			var editDiff = event.target.diff.value;
			var editWorkload = event.target.workload.value;
			var editSteepness = event.target.steepness.value;
			var editWebcast = event.target.webcast.value;
			var editPost = event.target.reviewPost.value;
		/*var saveReview = function() {
			var editReview = {
					reviewName: editreviewName,
					reviewPost: editreviewPost,
					semester: editsemester,
			}//ends editReview
			Reviews.update(Session.get('editReviewId'), {$set: editReview});
			Session.set('editReviewId', null);
		//saveReview();*/

		//get this review
		var thisReview = Reviews.findOne({_id: this._id})._id;
		//pass parameters to the method called editReview
		//editName, editSem, editRecommendation, editDiff, editWorkload, editSteepness, editPost
  	Meteor.call("editReview",thisReview, editName, editSem, editRecommendation, editDiff, editWorkload, editSteepness, editWebcast, editPost);
		Bert.alert("Your Review Was Edited", "success", "growl-top-right");
		Session.set('editReviewId', null);
	}
});
