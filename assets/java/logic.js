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

$("#addTrain").on("click", function() {

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

database.ref().on("child_added", function(childSnapshot) {

    var firstTrain = moment(childSnapshot.val().firstTrain, "hh:mm");

    var frequency = childSnapshot.val().frequency

    var diffTime = moment().diff(moment(firstTrain), "minutes");

    var minutesTillTrain = frequency - (diffTime % frequency);

    var trainComing = moment().add(minutesTillTrain, "minutes");

    var nextTrain = moment(trainComing).format("hh:mm");

    console.log(nextTrain)




    var a = $("<tr>");
    var b = $("<td>").html(childSnapshot.val().name);
    var c = $("<td>").html(childSnapshot.val().destination);
    var d = $("<td>").html(childSnapshot.val().frequency);
    var e = $("<td>").html(nextTrain);
    var f = $("<td>").html(minutesTillTrain);


    a.append(b);
    a.append(c);
    a.append(d);
    a.append(e);
    a.append(f);
    $("#info").append(a);

});