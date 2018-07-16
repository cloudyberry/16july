Template.commentSect.rendered = function() {

}


Template.commentSect.events({

	"submit .commentSect-post": function() {
		//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
		var commentPost = event.target.commentPost.value;
		//pass the review's id as parameters
			var thisReview = Reviews.findOne({_id: this._id})._id;
			//add new column and labels!


		if (isNotEmpty(commentPost)) {

			Meteor.call('addComments',commentPost,thisReview);
			//clear form
			/*if (event.target.hideName.value===true) {
				Meteor.call('hideName', thisReview);
			}*/

			event.target.commentPost.value = "";


			Bert.alert("Your Comment Was Posted!", "success", "growl-top-right");

		} else {

			Bert.alert("Please enter your comment", "danger", "growl-top-right");
		}

		return false; // prevent submit
	}
});

// Validation Rules

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};
