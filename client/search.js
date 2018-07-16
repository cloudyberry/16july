Template.search.rendered = function() {
	$("#search-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#reviews-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.search.helpers({

	admin: function() {
		var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
		var userId = Meteor.userId();
		if (userId === adminId) {
		return true;
	}
	},

	reviews: function() {
		//get reviews from method: returnSearch
		//then sort by date
		var reviews = Reviews.find({"searched":1}, {sort: {createdAt: -1}});
		return reviews;
	},


	matchedReviews: function() {
			//get reviews from method: returnSearch
			//then sort by date
		var matched = Reviews.find({"matched":1}, {sort: {createdAt: -1}});
		return matched;
	},

	comms: function() {
		//sort by latest date on top
		var comms = Comments.find({}, {sort: {createdAt: -1}});
		return comms;
	},

	displayComments: function() {
		return Session.equals('showCommentsId', this._id);
	}

});

Template.search.events({



	"submit .search-form": function() {
		//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
		var reviewName = event.target.reviewName.value;
		Meteor.call('endSearch');
		Meteor.call('returnSearch', reviewName);
		return false; // prevent submit
	},

	"submit .match-form": function() {
		//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
		var recommendation = event.target.recommendation.value;
		var diff = event.target.diff.value;
		var workload = event.target.workload.value;
		var webcast = event.target.webcast.value;
		var steepness = event.target.steepness.value;


		Meteor.call('endMatch');
		Meteor.call('returnMatch', recommendation, diff, workload, webcast, steepness);

		return false; // prevent submit
	},
	"click #like": function() {
		var thisUser = Meteor.userId();
		var thisReview = Reviews.findOne({_id: this._id})._id;
		var reviewAuthor = Meteor.user().profile.username; //Reviews.findOne({_id: this._id}).userId;
		var Name =  Meteor.user().profile.username;
		var thisReviewsVotes = Reviews.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		//detect doublevoting
		if (thisReviewsVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisReview, Name);
			Meteor.call("userPointLike", reviewAuthor);
			Meteor.call("likeVote", thisUser, thisReview);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisReviewsVotes) {
			Bert.alert("You cannot vote for your own review", "danger", "growl-top-right");
		}
	},


	"click #dislike": function() {
		var thisUser = Meteor.userId();
		var thisReview = Reviews.findOne({_id: this._id})._id;
		var reviewAuthor = Meteor.user().profile.username; //Reviews.findOne({_id: this._id}).userId;
		//var Name = Meteor.user().username;
		var Name = Meteor.user().profile.username;
		var thisReviewsVotes = Reviews.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisReviewsVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisReview, Name);
			Meteor.call("userPointDislike", reviewAuthor);
			Meteor.call("dislikeVote", thisUser, thisReview);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisReviewsVotes) {
			Bert.alert("You cannot vote for your own review", "danger", "growl-top-right");
		}
	},
	"click #showcomment": function() {
	//	var thisUser = Meteor.userId();
	//	var thisReview = Reviews.findOne({_id: this._id})._id;
	//	var reviewAuthor = Reviews.findOne({_id: this._id}).userId;
	Session.set('showCommentsId', this._id);
},

"click #hide-comment": function() {
	Session.set('showCommentsId', null);
}

});

//returning a session that is selected
//checks if it is selected or empty
Template.User.helpers({
	selected: function() {
		return Session.equals("selectedReview", this.__originalId) ? "selected" : '';
	},
});

Template.User.events({
	'click': function() {
		Session.set("selectedReview", this.__originalId);
	}
});
