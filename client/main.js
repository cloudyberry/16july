import { Template } from 'meteor/templating';
import { OAuth } from 'meteor/oauth'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { HTTP } from 'meteor/http'

// import './main.html';

Tracker.autorun(function(){
	if (Meteor.userId()) {
		Router.go("/");
	}
});

Template.hello.onRendered( () => {
Session.set('name', (Router.current().params.query["openid.ax.value.fullname"])),
console.log(Session.get('name'));
console.log(Session.equals('name', (Router.current().params.query["openid.ax.value.fullname"])));
console.log(Router.current().params.query);
console.log(Router.current().params.query["openid.identity"])
  // store identity in a session or persistant storage such as mongoDB?
  //Router.current().params.query["openid.identity"]
   Accounts.createUser({
		 //username: (Router.current().params.query["openid.ax.value.fullname"]),
		 email: (Router.current().params.query["openid.ax.value.contact_email"]),
     password:'idc',

     profile: {
       likeScore: 0,
       dislikeScore:0,
       year: '1',
       school: 'Computing',
     }

   }
   , function(error) {console.log(error);} );

	 //var username = (Router.current().params.query["openid.ax.value.fullname"]);
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


  });



Template.hello.events({
  "click #log-in": function() {
  //'click button'(event, instance) {


    try {


      var loginUrl = 'https://openid.nus.edu.sg/auth/' +
      '?openid.ns=http://specs.openid.net/auth/2.0' +
      '&openid.mode=checkid_setup' +
      '&openid.return_to=http://localhost:3000' +
      '&openid.realm=' + Meteor.absoluteUrl() +
      '&openid.ax_mode=fetch_request' +
      '&openid.ns.ax=http://openid.net/srv/ax/1.0' +
      '&openid.ns.sreg=http://openid.net/extensions/sreg/1.1' +
      '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.ax.type.contact_email=http://axschema.org/contact/email' +
      '&openid.ax.type.fullname=http://axschema.org/namePerson' +
      '&openid.ax.type.user_id= http://axschemas.org/user/id' +
      '&openid.ax.type.nickname=http://axschema.org/contact/nickname' +
      '&openid.ax.required=contact_email, fullname' +
      '&oopenid.sreg.required=email' +
      '&oopenid.sreg.required=fullname' +
      '&oopenid.sreg.required=nickname' +
      "&controller=server&action=index&module=default"

      OAuth.launchLogin({
        loginService: 'nus',
        loginStyle: "redirect",
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: function(data)
        {
          console.log(data)
        },
        credentialToken: Random.secret()
      });

    } catch (e) {
      console.log("error")
    }

  },

    "click #log-out": function() {
      Meteor.logout(function(err){
			if(err) {
				Bert.alert(err.reason, "danger", "growl-top-right");
			} else {
				Router.go('/');
				Bert.alert("you Are Now Logged Out", "success", "growl-top-right");
			}
		});
    Session.set('name', null);
    }

});

Template.test.helpers({
  testing: function() {
  //var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
  //  return fullname;
 return Session.get('name');
  },

	loggedIn: function() {
		 //  var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
		//	  if (fullname != null) {
		 if (Session.get('name')!= null) {
		 	  	return true;
		//	return Session.equals('userId', (Router.current().params.query["openid.ax.value.fullname"]));
			}
		}

});
Template.hello.helpers({
  testing: function() {
  //var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
  //  return fullname;
 return Session.get('name');
  },

	loggedIn: function() {
		 //  var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
		//	  if (fullname != null) {
		 if (Session.get('name')!= null) {
		 	  	return true;
		//	return Session.equals('userId', (Router.current().params.query["openid.ax.value.fullname"]));
			}
		}

});
