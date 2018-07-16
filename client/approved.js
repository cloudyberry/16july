Template.approved.rendered = function() {
	$("#approved-link").addClass('selected');
	$("#unapproved-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#profile-link").removeClass('selected');
	$("#reviews-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');

}
//go to collection and post to reviews page
Template.approved.helpers({
	reviews: function() {
		var reviews = Reviews.find({"vetted":1}, {sort: {createdAt: -1}});
		return reviews;
	},

	admin: function() {
		var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
		var userId = Meteor.userId();
		if (userId === adminId) {
		return true;
	}
	},

	/*approving: function() {
		return Session.equals('approveReviewId', this._id);
	},*/

});

Template.approved.events({
		"click #delete-review": function() {
			//id linked to specific joke
			Meteor.call("removeReview", this._id);
			Bert.alert("This Review has been Deleted", "success", "growl-top-right");
		},

		/*"click #approve-review": function() {
			Session.set('approveReviewId',this._id);
		},

		"click #cancelApproval": function() {
			Session.set('approveReviewId', null);
		},

		"click #confirm": function() {
			Bert.alert("You have approved this Review", "success", "growl-top-right");
    },*/
		/*"submit .confirm-Approval": function() {
				//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
				var hideName = event.target.hideName.value;
				var apprName = event.target.reviewName.value;//must change all the values
				var apprSem = event.target.semester.value;
				var apprRecommendation = event.target.recommendation.value;
				var apprDiff = event.target.diff.value;
				var apprWorkload = event.target.workload.value;
				var apprSteepness = event.target.steepness.value;
				var apprPost = event.target.reviewPost.value;

			//pass parameters to the method called apprReview
			//apprName, apprSem, apprRecommendation, apprDiff, apprWorkload, apprSteepness, apprPost
			Meteor.call("addReviews", hideName, apprName, apprSem, apprRecommendation, apprDiff, apprWorkload, apprSteepness, apprPost);
			Bert.alert("You have approved this Review", "success", "growl-top-right");
			Session.set('approveReviewId', null);
		}*/
	});
