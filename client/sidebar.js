
Template.sidebar.onRendered( () => {
Session.set('name', (Router.current().params.query["openid.ax.value.fullname"])),
console.log(Session.get('name'));
console.log(Session.equals('name', (Router.current().params.query["openid.ax.value.fullname"])));
console.log(Router.current().params.query);
console.log(Router.current().params.query["openid.identity"])
  // store identity in a session or persistant storage such as mongoDB?
  //Router.current().params.query["openid.identity"]
   Accounts.createUser({

     email: (Router.current().params.query["openid.ax.value.contact_email"]),
     password:'idc',

     profile: {
       username: (Router.current().params.query["openid.ax.value.fullname"]),
       likeScore: 0,
       dislikeScore:0,
       year: '1',
       school: 'Computing',
     }

   }
   , function(error) {console.log(error);} );

   var email = (Router.current().params.query["openid.ax.value.contact_email"]);
   var password ='idc';

   Meteor.loginWithPassword(email, password, function(err){
       if(err) {
         Bert.alert(err.reason, "danger", "growl-top-right");
         return false;
       } else {

         Router.go("/");
         Bert.alert("You are now logged in", "success", "growl-top-right");
       }
     });
 console.log(Meteor.user().username);
 console.log(Meteor.user().emails[0].address);

  });
Template.sidebar.events({
	"click .logout": function(event){

		Meteor.logout(function(err){
			if(err) {
				Bert.alert(err.reason, "danger", "growl-top-right");
			} else {
				Router.go('/');
				Bert.alert("you Are Now Logged Out", "success", "growl-top-right");
			}
		});
		Session.set('name',null);
  }


});

Template.sidebar.helpers({

	admin: function() {
	  var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
		var userId = Meteor.userId();
	 	if (userId === adminId) {
		return true;
	}
		// if (Session.get('name')=='Shi Kai Ning') {
		// 	return true;
		// }
},
	nonAdmin: function() {
			var adminId = Meteor.users.findOne({"emails.address": "e0201623@u.nus.edu"})._id;
			var userId = Meteor.userId();
			if (userId === adminId) {
			return false;
		}
			// if (Session.get('name')!='Shi Kai Ning') {
			// 	return true;
			// }
	}
});
