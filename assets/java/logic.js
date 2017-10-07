var config = {
    apiKey: "AIzaSyBQDUuNDkfVzcJz69QmO9n4ak6tNdKbSv4",
    authDomain: "train-firebase-rutgers.firebaseapp.com",
    databaseURL: "https://train-firebase-rutgers.firebaseio.com",
    projectId: "train-firebase-rutgers",
    storageBucket: "train-firebase-rutgers.appspot.com",
    messagingSenderId: "70232655452"
};

firebase.initializeApp(config);


var database = firebase.database();

var name = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

$("#addTrain").on("click", function(e) {

    e.preventDefault();

    name = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
});

var firstTrain1;
var frequency1;
var diffTime;
var minutesTillTrain;
var trainComing;
var nextTrain;
var name1;
var destination1;



var a;

database.ref().on("child_added", function(childSnapshot) {

    firstTrain1 = moment(childSnapshot.val().firstTrain, "hh:mm");

    frequency1 = childSnapshot.val().frequency

    diffTime = moment().diff(moment(firstTrain), "minutes");

    minutesTillTrain = frequency1 - (diffTime % frequency1);

    trainComing = moment().add(minutesTillTrain, "minutes");

    nextTrain = moment(trainComing).format("hh:mm");
    name1 = childSnapshot.val().name;

    destination1 = childSnapshot.val().destination;

    a = $("<tr>");
    var b = $("<td>").html(name1);
    var c = $("<td>").html(destination1);
    var d = $("<td>").html(frequency1);
    var e = $("<td>").html(nextTrain);
    var f = $("<td>").html(minutesTillTrain);

    a.append(b);
    a.append(c);
    a.append(d);
    a.append(e);
    a.append(f);
    $("#info").append(a);


});