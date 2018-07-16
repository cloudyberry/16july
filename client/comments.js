Template.comments.rendered = function() {

}

Template.comments.helpers({
	nonAdmin: function() {
			var adminId = Meteor.users.findOne({username: 'Admin'})._id;
			var userId = Meteor.userId();
			if (userId !== adminId) {
			return true;
			}
		},

    comms: function() {
			var thisReview = Reviews.findOne({_id: this._id})._id;
      var comms = Comments.find({post_id: thisReview}, {sort: {createdAt: -1}});
      return comms;
    },
});
