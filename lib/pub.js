if (Meteor.isServer) {

	Meteor.publish('Reviews', function() {

			return Reviews.find();

	});

	Meteor.publish('Comments', function() {

			return Comments.find();

	});

	Meteor.publish('Users', function() {

			return Meteor.users.find();

	});
	
	Meteor.publish('otherUsers',function(){
    return Meteor.users.find({},{ fields: { 'profile.username': 1 }});
  });

}
