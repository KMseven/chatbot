'use strict';
const admin = require('firebase-admin');
const functions1 = require('firebase-functions');
var nodemailer = require('nodemailer');
admin.initializeApp(functions1.config().firebase);

var db = admin.firestore();
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var escape = require('escape-html');
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
                          /////////////////////////////


var size1=[1360,1366,1366,1426,1441];
var location=["Tower B","Tower A","Tower c","Tower c","Tower B"];
db.collection("one-city").doc("hyderabad").collection("2BHK").doc("east").set({
    size: size1,
    place: location
});
var size1=[1208,1216,1216,1216,1274,1279];
var location=["Tower B","Tower A","Tower C","Tower C","Tower B","Tower A"];
db.collection("one-city").doc("hyderabad").collection("2BHK").doc("west").set({
    size: size1,
    place: location
});


var size1=[1592,1665,1672,1740,1740,1740,1782,1860,1931];
var location=["Tower C","Tower A","Tower A","Tower A","Tower C","Tower B","Tower B","Tower B"];
db.collection("one-city").doc("hyderabad").collection("3BHK").doc("east").set({
    size: size1,
    place: location
});

var size1=[1592,1592,1735,1735,1735,1782,1842,1852];
var location=["Tower A","Tower C","Tower A","Tower A","Tower A","Tower B","Tower B","Tower B"];



db.collection("one-city").doc("hyderabad").collection("3BHK").doc("east").set({
    size: size1,
    place: location
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  processV1Request(request, response);});
  function oncompletion(text1,response){
  				console.log("YESSSSSSSSSSSS");
  			console.log(text1);
  	        let responseToUser = {

            //data: richResponsesV1, // Optional, uncomment to enable
            //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
            speech: text1, // spoken response
            text: text1// displayed response
          };
          if (typeof responseToUser === 'string') {
        let responseJson = {};
        responseJson.speech = responseToUser; // spoken response
        responseJson.displayText = responseToUser; // displayed response
        response.json(responseJson); // Send response to Dialogflow
      } else {
        // If the response to the user includes rich responses or contexts send them to Dialogflow
        let responseJson = {};
        // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
        responseJson.speech = responseToUser.speech || responseToUser.displayText;
        responseJson.displayText = responseToUser.displayText || responseToUser.speech;
        // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
        responseJson.data = responseToUser.data;
        // Optional: add contexts (https://dialogflow.com/docs/contexts)
        responseJson.contextOut = responseToUser.outputContexts;
        console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
        response.json(responseJson); // Send response to Dialogflow

      }
    }




function processV1Request (request, response) {
    let action = request.body.result.action;
    let parameters = request.body.result.parameters;
    let inputContexts = request.body.result.contexts;
    let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
    const googleAssistantRequest = 'google';
    const app = new DialogflowApp({request: request, response: response});
    const actionHandlers = {
      'input.welcome': () => {

      },

  	'contact.contact-yes': () => {
  		db.collection('flats').get()
      .then((snapshot) => {
          snapshot.forEach((doc) => {
              console.log(doc.id, '=>', doc.data());
          });
      })
      .catch((err) => {
          console.log('Error getting documents', err);
      });

  		var no=inputContexts[0]["parameters"]["phone-number"];
  		console.log(no);

  			var transporter = nodemailer.createTransport({
  			  service: 'gmail',
  			  auth: {
  				user: 'krishnamhn7@gmail.com',
  				pass: '8500523418$dD'
  			  }
  			});

  			var mailOptions = {
  			  from: 'krishnamhn7@gmail.com',
  			  to: 'krishna14042@mechyd.ac.in',
  			  subject: 'Test email',
  			  text: "call to this number "+String(no)
  			};

  			transporter.sendMail(mailOptions, function(error, info){
  			  if (error) {
  				console.log(error);
  			  } else {
  				console.log('Email sent: ' + info.response);
  			  }
  			});
  	},

  	'assist': ()=> {
      var text1;
      console.log("BBBBBBBBBBBBBB");

  		console.log(parameters);
  			var db1=db.collection("one-city").doc("PAoK3J9zYKvNT7C6ALuY").collection('flats');
  			var allCities = db1.get()
  			.then(snapshot => {
  				snapshot.forEach(doc => {
  					console.log(doc.id, '=>', doc.data());
            if(doc.id==parameters["bhk1"].toUpperCase() || doc.id==""){
            index=[];
            query(parameters,doc.data());
            var k=0;
            if(index.length!=0){
              text1+="There are " + String(index.length) +" "+doc.id()+ "flats in total"
            }
            for(k=0;k<index.length;k++){
              text1+=String(k+1)+"."+"Facing: "+doc.data()["side"][k]+"size: "+doc.data()["size"][k]+ "cost: "+ doc.data()["cost"][k]+ "place: Tower"+doc.data()["place"][k];
            }
            console.log(text1);
            console.log("ccccccccccccccccccdd");
            console.log(index);
  				}});
  			})
  			.catch(err => {
  				console.log('Error getting documents', err);
  			});
          oncompletion(text1,response);
  	},

      'flats': () => {
  		var text1="";
        if (requestSource === googleAssistantRequest) {

          let responseToUser = {
            //googleRichResponse: googleRichResponse, // Optional, uncomment to enable
  		  /*
  		   var ref = firebase.database().ref("check");
              ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var cKey = childSnapshot.key;
      var cData = childSnapshot.val();
    });
  });
  		  */
            //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
            speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
            text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
          };
          sendGoogleResponse(responseToUser);
        } else {

  		  console.log(parameters);
  		  var i=0;

  		  for (i=0;i<parameters["bhk1"].length;i++ )
  		  {
  			  var par=parameters["bhk1"][i].toUpperCase();
  			  db.collection("one-city").doc("PAoK3J9zYKvNT7C6ALuY").collection('flats').doc(par).get()
  			.then(doc => {
          if (!doc.exists) {
  			text1+="There is no data related to it";
  			oncompletion(text1);
              console.log('No such document!');
          } else {
  			var x=doc.data();
  			console.log("AAAAAAAAA");
  			console.log(par);
  			text1+="There are "+String(x["size"].length)+" "+par+" apartments\n";
  			text1+="\n"
  			var j=0;
  			for (j=0;j<x["size"].length;j++ )
  			{
  				text1+=(String(x["size"][j])+" sqft in tower "+x["place"][j]+" facing "+x["side"][j]);

  			}
              console.log('Document data:', x);
  			console.log(x["size"]);

  			text1+="\n";
  			console.log(text1);
        /////////////////////////////

        				console.log("YESSSSSSSSSSSS");
        			console.log(text1);
        	        let responseToUser = {

                  //data: richResponsesV1, // Optional, uncomment to enable
                  //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
                  speech: text1, // spoken response
                  text: text1// displayed response
                };
                if (typeof responseToUser === 'string') {
              let responseJson = {};
              responseJson.speech = responseToUser; // spoken response
              responseJson.displayText = responseToUser; // displayed response
              response.json(responseJson); // Send response to Dialogflow
            } else {
              // If the response to the user includes rich responses or contexts send them to Dialogflow
              let responseJson = {};
              // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
              responseJson.speech = responseToUser.speech || responseToUser.displayText;
              responseJson.displayText = responseToUser.displayText || responseToUser.speech;
              // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
              responseJson.data = responseToUser.data;
              // Optional: add contexts (https://dialogflow.com/docs/contexts)
              responseJson.contextOut = responseToUser.outputContexts;
              console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
              response.json(responseJson); // Send response to Dialogflow

            }
}

      })
      .catch(err => {
          console.log('Error getting document', err);
      });
  		  }

            console.log("YYYYYYY");
  		console.log(parameters);



        }
      },




    };
    // If undefined or unknown action use the default handler

    if (!actionHandlers[action]) {
      action="input.welcome";
    }

    actionHandlers[action]();
      // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user

    // Function to send correctly formatted responses to Dialogflow which are then sent to the user
    function sendResponse (responseToUser) {
      // if the response is a string send it as a response to the user
      if (typeof responseToUser === 'string') {
        let responseJson = {};
        responseJson.speech = responseToUser; // spoken response
        responseJson.displayText = responseToUser; // displayed response
        response.json(responseJson); // Send response to Dialogflow
      } else {
        // If the response to the user includes rich responses or contexts send them to Dialogflow
        let responseJson = {};
        // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
        responseJson.speech = responseToUser.speech || responseToUser.displayText;
        responseJson.displayText = responseToUser.displayText || responseToUser.speech;
        // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
        responseJson.data = responseToUser.data;
        // Optional: add contexts (https://dialogflow.com/docs/contexts)
        responseJson.contextOut = responseToUser.outputContexts;
        console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
        response.json(responseJson); // Send response to Dialogflow
      }
    }
  }
