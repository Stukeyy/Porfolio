
//############################################################ Variables

  var dawn = 0 + Math.floor(Math.random() * 4);
  var morning = 6 + Math.floor(Math.random() * 3);
  var brunch = 10 + Math.floor(Math.random() * 2);
  var afternoon = 13 + Math.floor(Math.random() * 3);
  var evening = 17 + Math.floor(Math.random() * 3);
  var dusk = 21 + Math.floor(Math.random() * 3);

  //These variables generate random numbers which will be used for Departure and Arrival times later on

  var dayTime = ["dawn", "morning", "brunch", "afternoon", "evening", "dusk"];
  var departureTime = [dawn, morning, brunch, afternoon, evening, dusk];

  //These arrays set the time of day and also stores all the random number times generated above

  var localReturningDate = localStorage.getItem("returnDate");
  var localHome = localStorage.getItem("home");
  var localDestination = localStorage.getItem("destination");
  var localAdults = parseInt(localStorage.getItem("adults"));
  var localChildren = parseInt(localStorage.getItem("children"));
  var localInfants = parseInt(localStorage.getItem("infants"));
  var totalPassengers = localAdults + localChildren + localInfants;

  //These variables get their values from local storage set by the form from the page before

  var closeDestination = ["Valencia", "Amsterdam", "Berlin", "Paris"];
  var closeFlight = jQuery.inArray(localDestination, closeDestination);
  var closeTime = 1 + Math.floor(Math.random() * 3);

  //These variables contain the data for close destinations selected, including an array of certain
  //destinations, whether the destination from local storage is in this array and then a random number limit
  //for the flight time

  var midDestination = ["Ibiza", "Alicante", "Oslow"];
  var midFlight = jQuery.inArray(localDestination, midDestination);
  var midTime = 6 + Math.floor(Math.random() * 2);

  //These variables contain the data for midway destinations selected, including an array of certain
  //destinations, whether the destination from local storage is in this array and then a random number limit
  //for the flight time

  var farDestination = ["Boston", "Miami", "Rio", "Marrakesh", "Bogota", "Magnolia"];
  var farFlight = jQuery.inArray(localDestination, farDestination);
  var farTime = 10 + Math.floor(Math.random() * 2);

  //These variables contain the data for far destinations selected, including an array of certain
  //destinations, whether the destination from local storage is in this array and then a random number limit
  //for the flight time

//############################################################ Functions

  function flightHighlight() {
    $(function(){
      $(".flight").mouseover(function(){
        $(this).css({"backgroundColor": "#5e32a8", "color": "white"});
      }) .mouseout(function(){
        $(this).css({"backgroundColor": "rgba(255, 253, 245, 0.79)", "color": "#5e32a8"});
      });
    });
  }

  //Function that when called highlights the element with flight class
  //on hover event and then returns element to previous state on leave

//################################################################ Get Local Storage and Set Travel Times

  $(function() {

    flightHighlight();

    $("#localReturningDate").html(localReturningDate);
    $("#localDestination").html(localDestination);
    $("#localHome").html(localHome);

    //Updates the html elements with the same ID with the variables that contain the Local Storage
    //values

    if ((localAdults)&&(localChildren)&&(localInfants) > 0) {
      $("#passengers").html(localAdults + " Adults " + localChildren + " Children " + localInfants + " Infants ");
    }
    else if ((localAdults)&&(localChildren) > 0) {
      $("#passengers").html(localAdults + " Adults " + localChildren + " Children ");
    }
    else if ((localAdults)&&(localInfants) > 0) {
      $("#passengers").html(localAdults + " Adults " + localInfants + " Infants ");
    }
    else if ((localAdults) > 0) {
      $("#passengers").html(localAdults + " Adults ");
    }

    //Updates Passenger information depending on the values from Local Storage, adding in the Passenger
    //type if present

    //################################################################ Close Flight Time

    if (closeFlight !== -1) {

      //The above variable is declared at the beginning of the document and checks if the destination from
      //local Storage is in the Close Destination variable array previously stated and if it's in the list it will return a 0 which will trigger the following code as it's not equal to -1 which means it isnt present in the list so therefore wouldnt fire

      for (i = 0; i < dayTime.length; i++) {

        //This for statement loops through the whole dayTime variable array declared above and carries out the
        //following code each time and then increases the index until it reaches the end of the array

        var closePrice = 50 + Math.floor(Math.random() * 50);

        //This variable creates a random number for the price each time

        $("#" + dayTime[i]).html(departureTime[i] + ":00");
        $("#" + dayTime[i] + "FlightTime").html(departureTime[i] + closeTime + ":00");
        $("#" + dayTime[i] + "Price").html(closePrice);

        //These statements use the value from the dayTime array each time the index increases
        //to display content in the respective html elements with the same ID for each time frame so
        //that multiple options are generated

        //They display the departure time which is gotten from the departureTime array declared above, which
        //hosts all of the random number times for each section of the day via the initial random number variables
        //getting a random number for each time frame. It is the same length as the
        //dayTime array so that when the index increases, the correctly time frame is used

        //They display the returning time which is generated by adding the close time variable value generated above,
        //to each departure time in the array selected by the index in the loop

        //They also display the price of the flight, which is again declared above in a random number variable, and is //then displayed in each html element that matches the array value being called at each index in the loop

        if (departureTime[i] < 10) {
            $("#" + dayTime[i]).html("0" + departureTime[i] + ":00");
        }

        //if the depature time is before 10, in the morning, then a 0 is added before the time as I am using the 24 hour time format

        var overnight = departureTime[i] + closeTime;

        //This varible adds the departure time and the flight time to each value in the array based on the loop index

        //When the timings show that the flight will be over night passed midnight and into the next day, the following code is executed

        if (overnight == 24) {
          $("#" + dayTime[i] + "FlightTime").html("0:00");
        }

        //Firstly, if the time = 24 then 0:00 is displayed instead as you can't have a time of 24:00

        var nextDay =  overnight - 24;

        //This variable takes 24 away from the flight time added to the departure time,
        //to get the remaining time, that the flight will arrive the next day

        if ((overnight > 24)&&(nextDay < 10)) {
          $("#" + dayTime[i] + "FlightTime").html("0" + nextDay + ":00");
        }
        else if ((overnight > 24)&&(nextDay > 9)) {
          $("#" + dayTime[i] + "FlightTime").html(nextDay + ":00");
        }

        //If the flight duration and departure time mean it is overnight, and if the arrival time is before 10, then
        //it will display the time with a 0 before it, generally for the early morning times e.g. 4:00 - 04:00, as I use 24 hour timings

      }

    }

    //################################################################ Midway Flight Time

    if (midFlight !== -1) {

      //The above variable is declared at the beginning of the document and checks if the destination from
      //local Storage is in the Mid Destination variable array previously stated and if it's in the list it will return a 0 which will trigger the following code as it's not equal to -1 which means it isnt present in the list so therefore wouldnt fire

      for (i = 0; i < dayTime.length; i++) {

        //This for statement loops through the whole dayTime variable array declared above and carries out the
        //following code each time and then increases the index until it reaches the end of the array

        var midPrice = 100 + Math.floor(Math.random() * 50);

        //This variable creates a random number for the price each time

        $("#" + dayTime[i]).html(departureTime[i] + ":00");
        $("#" + dayTime[i] + "FlightTime").html(departureTime[i] + midTime + ":00");
        $("#" + dayTime[i] + "Price").html(midPrice);

        //These statements use the value from the dayTime array each time the index increases
        //to display content in the respective html elements with the same ID for each time frame so
        //that multiple options are generated

        //They display the departure time which is gotten from the departureTime array declared above, which
        //hosts all of the random number times for each section of the day via the initial random number variables
        //getting a random number for each time frame. It is the same length as the
        //dayTime array so that when the index increases, the correctly time frame is used

        //They display the returning time which is generated by adding the close time variable value generated above,
        //to each departure time in the array selected by the index in the loop

        //They also display the price of the flight, which is again declared above in a random number variable, and is //then displayed in each html element that matches the array value being called at each index in the loop

        if (departureTime[i] < 10) {
            $("#" + dayTime[i]).html("0" + departureTime[i] + ":00");
        }

        //if the depature time is before 10, in the morning, then a 0 is added before the time as I am using the 24 hour time format

        var overnight = departureTime[i] + midTime;

        //This varible adds the departure time and the flight time to each value in the array based on the loop index

        //When the timings show that the flight will be over night passed midnight and into the next day, the following code is executed

        if (overnight == 24) {
          $("#" + dayTime[i] + "FlightTime").html("0:00");
        }

        //Firstly, if the time = 24 then 0:00 is displayed instead as you can't have a time of 24:00

        var nextDay =  overnight - 24;

        //This variable takes 24 away from the flight time added to the departure time,
        //to get the remaining time, that the flight will arrive the next day

        if ((overnight > 24)&&(nextDay < 10)) {
          $("#" + dayTime[i] + "FlightTime").html("0" + nextDay + ":00");
        }
        else if ((overnight > 24)&&(nextDay > 9)) {
          $("#" + dayTime[i] + "FlightTime").html(nextDay + ":00");
        }

        //If the flight duration and departure time mean it is overnight, and if the arrival time is before 10, then
        //it will display the time with a 0 before it, generally for the early morning times e.g. 4:00 - 04:00, as I use 24 hour timings

      }

    }

    //################################################################ Far Flight Time

    if (farFlight !== -1) {

      //The above variable is declared at the beginning of the document and checks if the destination from
      //local Storage is in the Far Destination variable array previously stated and if it's in the list it will return a 0 which will trigger the following code as it's not equal to -1 which means it isnt present in the list so therefore wouldnt fire

      for (i = 0; i < dayTime.length; i++) {

        //This for statement loops through the whole dayTime variable array declared above and carries out the
        //following code each time and then increases the index until it reaches the end of the array

        var farPrice = 150 + Math.floor(Math.random() * 50);

        //This variable creates a random number for the price each time

        $("#" + dayTime[i]).html(departureTime[i] + ":00");
        $("#" + dayTime[i] + "FlightTime").html(departureTime[i] + farTime + ":00");
        $("#" + dayTime[i] + "Price").html(farPrice);

        //These statements use the value from the dayTime array each time the index increases
        //to display content in the respective html elements with the same ID for each time frame so
        //that multiple options are generated

        //They display the departure time which is gotten from the departureTime array declared above, which
        //hosts all of the random number times for each section of the day via the initial random number variables
        //getting a random number for each time frame. It is the same length as the
        //dayTime array so that when the index increases, the correctly time frame is used

        //They display the returning time which is generated by adding the close time variable value generated above,
        //to each departure time in the array selected by the index in the loop

        //They also display the price of the flight, which is again declared above in a random number variable, and is //then displayed in each html element that matches the array value being called at each index in the loop

        if (departureTime[i] < 10) {
            $("#" + dayTime[i]).html("0" + departureTime[i] + ":00");
        }

        //if the depature time is before 10, in the morning, then a 0 is added before the time as I am using the 24 hour time format

        var overnight = departureTime[i] + farTime;

        //This varible adds the departure time and the flight time to each value in the array based on the loop index

        //When the timings show that the flight will be over night passed midnight and into the next day, the following code is executed

        if (overnight == 24) {
          $("#" + dayTime[i] + "FlightTime").html("0:00");
        }

        //Firstly, if the time = 24 then 0:00 is displayed instead as you can't have a time of 24:00

        var nextDay =  overnight - 24;

        //This variable takes 24 away from the flight time added to the departure time,
        //to get the remaining time, that the flight will arrive the next day

        if ((overnight > 24)&&(nextDay < 10)) {
          $("#" + dayTime[i] + "FlightTime").html("0" + nextDay + ":00");
        }
        else if ((overnight > 24)&&(nextDay > 9)) {
          $("#" + dayTime[i] + "FlightTime").html(nextDay + ":00");
        }

        //If the flight duration and departure time mean it is overnight, and if the arrival time is before 10, then
        //it will display the time with a 0 before it, generally for the early morning times e.g. 4:00 - 04:00, as I use 24 hour timings

      }

    }

  });

//################################################################ Choosing and Displaying Lowest Fare

  $(function() {

    var farPrice = [];

    //an empty variable array is created

    for (i = 0; i < dayTime.length; i++) {

      //For each value in the dayTime variable, which has each time frame of the day that a flight can leave from, the following code is applied to each

      var farFlightPrice = parseInt($("#" + dayTime[i] + "Price").html());

      //This variable get the value of the information in the day time html ID element Price area, generated later on in code  and converts it into a number using parseInt

      farPrice.push(farFlightPrice);

      //It then adds each value to the empty array set above using push, this gets the price of each flight (which is set later on) and includes them all in an array

    }

    var lowestFare = Math.min.apply(null, farPrice);

    //This variable finds the lowest number in the array and stores it as its value

    for (i = 0; i < dayTime.length; i++) {

      //For each value in the dayTime variable, which has each time frame of the day that a flight can leave from, the following code is applied to each

      var priceComp = $(".price").eq(i).html();

      //this variable holds the price value of the current dayTime value used in the loop

      if (priceComp == lowestFare) {
        $(".valueBanner").eq(i).show();
      }

      //if the current day Time value price is equal to the lowest number in the array stated above then
      //the valueBanner class element is shown to display the lowest price

    }

  });

//################################################################ Storing and Displaying Selected Flight Info

  $(function(){

    $(".flight").on("click", function() {

      //When the element with the flight class is clicked, the following code executes

      var departureTime = $(this).children("p").eq(0).text();
      var arrivalTime = $(this).children("p").eq(1).text();
      var ticketCost = $(this).children("p").eq(2).text();

      //The variables above get the information of the children p elements within the parent .flight class element that have been generated elsewhere in the document

      localStorage.setItem("returnDepartureTime", departureTime);
      localStorage.setItem("returnArrivalTime", arrivalTime);

      //The variables containing the flight information are then put into Local Storage

      var localReturnDeparture = localStorage.getItem("returnDepartureTime");
      var localReturnArrival = localStorage.getItem("returnArrivalTime");

      //These variables get the newly updated Local Storage values

      var use = ticketCost.slice(3);

      //This variable gets rid of the pound sign included from value of Price child to use later on

      var totalReturnPrice = use * totalPassengers;
      localStorage.setItem("totalReturnPrice", totalReturnPrice);

      //This variable multiplies the price by the amount of passengers that the user selected previously and then stores it in Local Sotrage

      $("#localDeparture").html(localReturnDeparture + " / ");
      $("#localArrival").html(localReturnArrival);
      $("#totalPrice").html("£ " + totalReturnPrice);

      //These statements display the information from the variables and local storage in the html elements

      $("#chooseSeats").show("slide", {direction: "right"}, 1000);

      //This statement then reveals a button only after a flight has been selected

    });

  });

//################################################################ Show Seats Hide Flights

  $(function() {

    $("#chooseSeats").on("click", function(){

      //When the choose seats button is shown after flight selection, after being clicked the following code is executed

      $(".flights").hide();

      //This hides the flight selection area so the user can go to the next stage

      $("#chooseSeats").hide();

      //This hides the choose seats button

      $("#seats").show("slide", {direction: "right"}, 1000);

      //The seats html element is now shown and slides in from the right

    });

  });

//################################################################ Selecting Seats

  $(function() {

    var i = 0;
    var seats = [];

    //These variables create an index and an empty array

    $("td").on("click", function() {

      //when the table field is clicked, the following code executes

      var seatCheck = $(this).children("img").attr("src");

      //This variable holds the value of the src attribute of the image element which is the child of the td element

        if (seatCheck == "images/fullChair.png") {

          //If the image src is == fullChair then the following code is executed

          $(this).children("img").attr("src", "images/emptyChair.png");

          //The image src is changed to emptyChair, this allows the user to unselect a seat

          var seatNumber = $(this).attr("data-seatNumber");

          //This variable gets the data attribute seatNumber value of the td element

          seats.pop(seatNumber);

          //This removes the value from the array

          i --;
          //this decrements the i value

        }

        else if (i < totalPassengers) {

          //If the index value is less than the total amount of passengers selected, the following code is executed

          $(this).children("img").attr("src", "images/fullChair.png");

          //The img src is changed to fullChair

          var seatNumber = $(this).attr("data-seatNumber");

          //This variable holds the value of the data attribute seatNumber

          seats.push(" " + seatNumber);

          //this adds the value to the array

          i ++;

          //this adds 1 to the value of i
        }

        localStorage.setItem("seats", seats);
        var chosenSeats = localStorage.getItem("seats");
        $("#chosenSeats").html(chosenSeats);

        //The array values are then stored in Local Storage and displayed in html

        if (seats.length == totalPassengers) {
          $("#bookingInfo").show("slide", {direction: "left"}, 1000);
        }
        else {
          $("#bookingInfo").hide("slide", {direction: "left"}, 1000);
        }

        //if the length of the array is equal to the total passengers selected - all seats required have been picked the return button is shown, if the array is not equal, - seats have been unpicked and passengers do not have a seat, then the button is hidden

    });

  });
