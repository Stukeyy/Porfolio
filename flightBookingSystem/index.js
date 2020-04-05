
//############################################################ Variables

  var checkHome = ["Belfast", "Dublin", "Galway", "Donegal", "Banbridge", "Cookstown", "Edinburgh", "Glasgow", "Manchester", "Newcastle", "London", "Liverpool", "Leeds"];

  //This contains all the available Home Departure Locations

  var checkDestination = ["Valencia", "Amsterdam", "Berlin", "Ibiza", "Boston", "Miami", "Paris", "Alicante", "Marrakesh", "Oslow", "Rio", "Bogota", "Magnolia"];

  //This contains all the available Destination Locations


//############################################################ Functions

  //Function that when called highlights list element
  //on hover event and then returns element to previous state on leave
  function listHover() {
    $("li").mouseover(function(){
      $(this).css({"background-color": "#EEEEEE", "color": "black"});
    }) .mouseout(function(){
      $(this).css({"background-color": "rgba(0,0,0,0.0)", "color": "white"});
    });
  }

  //Function that when called highlights the element with the attribute type, "button"
  //on hover event and then returns element to previous state on leave
  function inputButtonHighlight() {
    $(function(){
      $("[type='button']").mouseover(function(){
        $(this).css({"background-color": "#5e32a8", "color": "white"});
      }) .mouseout(function(){
        $(this).css({"background-color": "rgba(0,0,0,0)", "color": "#5e32a8"});
      })
    });
  }

//############################################################ JQUERY

//When the input field is hovered over, it will change the background colour of the
//sibling button beside the field and then return to normal on mouse leave to highlight
//extra choices button, also whenever the button itself is hovered over, it calls a
//function to change the background color on mouseover and return on mouse out

  $(function(){
    $(".choice").mouseover(function(){
      $(this).siblings(".extra").css({"background-color": "#5e32a8", "color": "white"});
      inputButtonHighlight();
    }) .mouseout(function(){
      $(this).siblings(".extra").css({"background-color": "rgba(0,0,0,0)", "color": "#5e32a8"});
      inputButtonHighlight();
    })
  });

//############################################################ Home Airport Selection


//############################################################ Home Airport Validation

  $(function() {

      $("#home").blur(function(){

      //When the user exits the Home input field, it will carry out validation on the value input

      var checkInput = $("#home").val();

      //This variable collects the value and stores it

      var re = /[a-zA-Z]/;

      //This is a RegEx variable containing only Letters, lower and upper case

      var checkType = re.test(checkInput);

      //This variable checks to ensure that the Home Input value stored only contains
      //Letters upper or lower case, will return true or false

      var checkList = jQuery.inArray(checkInput, checkHome);

      //This variable checks to see if the Home Input value stored in contained within
      //the Home Locations array at beginning, will return 1 or -1

      if (checkInput == "") {
        $("#homeError").show().html("Please pick a Departing Airport");
        $("#home").css({"borderColor": "#ebb734"});
      }

      //If the Home input value is empty it will highlight the field and show an error message

      else if (!checkType) {
        $("#homeError").show().html("Please use Appropriate Location names");
        $("#home").css({"borderColor": "#ebb734"});
      }

      //If the Home input value is contains Numbers or Symbols it will highlight the field
      //and show an error message

      else if (checkList == '-1') {
        $("#homeError").show().html("Sorry this Location is not Available");
        $("#home").css({"borderColor": "#ebb734"});
      }

      //If the Home input value is not in the Home Array it will highlight the field and show an error message

      else {
        $("#homeError").hide();
        $("#home").css({"borderColor": "#5e32a8"});
      }

        //If the Home input value isn't blank, doesn't contain any Numbers or symbols and is in the
        //Home Array it will remove the highlight and error message

        var homeChoice = $("#home").val();
        localStorage.setItem("home", homeChoice);

        //This variable stores the Home field information input, typed or autocompleted and then stores it
        //in the local storage under the Home name - when put in autocomplete function, the value would only be
        //the letter typed before the autocomplete and not the full Location name, so I had to put it here instead
        //so when the field is clicked off, the value present is set which will be the whole Location name, rather
        //than the autocomplete trigger letters

    });

//############################################################ Home Airport Autocomplete

    $("#home").on('input', function(){

      //When information is input into the Home input field it will carry out the following code

      $("#home").autocomplete({
        source: checkHome
      });

      //If the information input matches any of the values in the Home Array, it will suggest any
      //applicable autocomplete options for the user to choose and finish the input before typing whole word

    });

//############################################################ Home Airport Drawer Show

    $("#openHomeChoices").on("click", function(){

      $(".homeChoices").show("slide", {direction: "right"}, 1000);
      $(".homeExit").show();
      listHover();

      //When the Home Choices button is clicked, it slide a drawer in from the right containing
      //the available Home Locations in a list and also call the listHover highlight function.

      //It will also open a fullscreen transparent 'exit div' behind the drawer, which will be
      //used later on.

    });

//############################################################ Home Airport Drawer List Selection


      $(".home").on("click", function(){

        //When the list item within the drawer div is clicked it will carry out the following code

        var homeChoice = $(this).text();
        $("#home").val(homeChoice);
        localStorage.setItem("home", homeChoice);

        //It will get the value of the clicked list item and store it in the home value input field
        //as well as in the local storage under the Home name, overwrites any previous

        $(".homeChoices").hide();
        $("#homeError").hide();
        $(".homeExit").hide();
        $("#home").css({"borderColor": "#5e32a8"});

        //It will then hide any highlights and errors as there is now a value present and close the drawer and exit div

      });

//############################################################ Home Airport Close Drawer + Validation

      $(".homeExit").on("click", function(){

        //When the exit div opened earlier, behind the drawer div is clicked, it will carry out
        //the following code

        var checkInput = $("#home").val();

        //This variable stores the current value of the home input field

        if (checkInput == "") {

          //If there is no value present and the field is empty, it will highlight and show an error

          $("#homeError").show().html("Please pick a Departing Airport");
          $("#home").css({"borderColor": "#ebb734"});

        }

        else {

          //If the field does have a value by input, autocomplete or set by list click function above,
          //it will close the exit and home drawer div and remove any highlights or errors

          $(".homeChoices").hide()
          $(".homeExit").hide();

          $("#homeError").hide();
          $("#home").css({"borderColor": "#5e32a8"});

        }

      });

  });



//############################################################ Destination Airport Selection


//############################################################ Destination Airport Validation

  $(function() {

      $("#destination").blur(function(){

      //When the user exits the Destination input field, it will carry out validation on the value input

      var checkInput = $("#destination").val();

      //This variable collects the value and stores it

      var re = /[a-zA-Z]/;

      //This is a RegEx variable containing only Letters, lower and upper case

      var checkType = re.test(checkInput);

      //This variable checks to ensure that the Destination Input value stored only contains
      //Letters upper or lower case, will return true or false

      var checkList = jQuery.inArray(checkInput, checkDestination);

      //This variable checks to see if the Destination Input value stored in contained within
      //the Destination Locations array at beginning, will return 1 or -1

      if (checkInput == "") {
        $("#destinationError").show().html("Please pick a Destination Airport");
        $("#destination").css({"borderColor": "#ebb734"});
      }

        //If the Destination input value is empty it will highlight the field and show an error message

      else if (!checkType) {
        $("#destinationError").show().html("Please use Appropriate Destination names");
        $("#destination").css({"borderColor": "#ebb734"});
      }

      //If the Destination input value is contains Numbers or Symbols it will highlight the field
      //and show an error message

      else if (checkList == '-1') {
        $("#destinationError").show().html("Sorry this Destination is not Available");
        $("#destination").css({"borderColor": "#ebb734"});
      }

      //If the Destination input value is not in the Home Array it will highlight the field and show an error message

      else {
        $("#destinationError").hide();
        $("#destination").css({"borderColor": "#5e32a8"});
      }

      //If the Home input value isn't blank, doesn't contain any Numbers or symbols and is in the
      //Home Array it will remove the highlight and error message

      var destinationChoice = $("#destination").val();
      localStorage.setItem("destination", destinationChoice);

      //This variable stores the destination field information input, typed or autocompleted and then stores it
      //in the local storage under the destination name - when put in autocomplete function, the value would only be
      //the letters typed before the autocomplete and not the full destination name, so I had to put it here instead
      //so when the field is clicked off, the value present is set which will be the whole Location name, rather
      //than the autocomplete trigger letters


    });

//############################################################ Destination Airport Autocomplete

    $("#destination").on('input', function(){

      //When information is input into the Destination input field it will carry out the following code

      $("#destination").autocomplete({
        source: checkDestination
      });

      //If the information input matches any of the values in the Destination Array, it will suggest any
      //applicable autocomplete options for the user to choose and finish the input before typing whole word

    });

//############################################################ Destination Airport Drawer Show

    $("#openDestinationChoices").on("click", function(){

      $(".destinationChoices").show("slide", {direction: "left"}, 1000);
      $(".destinationExit").show();
      listHover();

      //When the Destination Choices button is clicked, it slide a drawer in from the right containing
      //the available Destination Locations in a list and also call the listHover highlight function.

      //It will also open a fullscreen transparent 'exit div' behind the drawer, which will be
      //used later on.

    });

    //############################################################ Destination Airport Drawer List Selection

      $(".destination").on("click", function(){

        //When the list item within the drawer div is clicked it will carry out the following code

        var destinationChoice = $(this).text();
        $("#destination").val(destinationChoice);
        localStorage.setItem("destination", destinationChoice);

        //It will get the value of the clicked list item and store it in the destination value input field
        //as well as in the local storage under the destination name, overwrites any previous

        $(".destinationChoices").hide();
        $("#destinationError").hide();
        $(".destinationExit").hide();
        $("#destination").css({"borderColor": "#5e32a8"});

        //It will then hide any highlights and errors as there is now a value present and close the drawer + exit div

      });

//############################################################ Destination Airport Close Drawer + Validation

      $(".destinationExit").on("click", function(){

        //When the exit div opened earlier, behind the drawer div is clicked, it will carry out
        //the following code

        var checkInput = $("#destination").val();

        //This variable stores the current value of the destination input field

        if (checkInput == "") {

          //If there is no value present and the field is empty, it will highlight and show an error

          $("#destinationError").show().html("Please pick a Destination");
          $("#destination").css({"borderColor": "#ebb734"});

        }

        else {

          //If the field does have a value by input, autocomplete or set by list click function above,
          //it will close the exit and destination drawer div and remove any highlights or errors

          $(".destinationChoices").hide();
          $(".destinationExit").hide();

          $("#destinationError").hide();
          $("#destination").css({"borderColor": "#5e32a8"});

        }

      });

  });

//############################################################ Departure Date Picker Drawer Show


  $(function(){

    $("#departure, #checkDepartureDates").on("click", function(){

      //When the departure input children are clicked, the following code will execute

      $(".departureChoices").show("slide", {direction: "right"}, 1000);
      $(".departureExit").show();

      //The Departure Datepicker Drawer will show and a transparent exit div will show behind it, used later on

      $(".departureCalendar").datepicker({

        //Displays Datepicker method from Jquery UI, CDN in HTML and Styled in CSS

        dateFormat: 'dd-mm-yy',
        minDate: 0,

        //Sets format and current date to today

        onSelect: function(departureDate) {

          //When a date is clicked it carrys out the following code

          $("#departure").val(departureDate);
          localStorage.setItem("departureDate", departureDate);

          //It stores the value of the selected item in a variable via function parameter, sets it as the value of the input field
          //and stores that value in Local Storage under departureDate

          $(".departureChoices").hide();
          $(".departureExit").hide();

          //The departureChoices drawer is then hidden

          $("#returningError").hide();
          $("#returning").css({"borderColor": "#5e32a8"});

          //This hides future error that shows if the departure date hasnt been picked yet before picking return date

          //##################################### Update Return MinDate

          //This code depends on future input, when the user picks a departure date,
          //it will be set as the Returing Datepicker mindate later on, however as it can only be set
          //once, if the user goes back and changes the departure date, the returning mindate will not update.
          //This allows the user to pick a return date before the departure date!

          //This code will destroy the Returning Datepicker and clear it's value, so that it is updated with
          //the new departure date as its mindate every time.

          $("#returning").val("");
          $(".returnCalendar").datepicker('destroy');

          //#####################################

          //If the value is set, the highlights and error messages will be hidden

          $("#departureError").hide();
          $("#departure").css({"borderColor": "#5e32a8"});

          //If the field does have a value it will close the exit and drawer div
          //and remove any highlights or errors

        }

      });

    });

//############################################################ Departure Datepicker Close Drawer + Validation

    $(".departureExit").on("click", function(){

      //when the transparent exit div opened before, underneath the departure datepicker, is clicked outside the
      //datepicker drawer, the following code will be executed

      var checkInput = $("#departure").val();

      //This variable stores the current value of the departure date input field

      if (checkInput == "") {

        //If there is no value present and the field is empty, it will highlight and show an error

        $("#departureError").show().html("Please pick a Departure Date");
        $("#departure").css({"borderColor": "#ebb734"});

      }

      else {

        //If the field does have a value input, it will close the exit and datepicker drawer div
        //and remove any highlights or errors

        $(".departureChoices").hide();
        $(".departureExit").hide();

        $("#departureError").hide();
        $("#departure").css({"borderColor": "#5e32a8"});

      }

    });

  });

//############################################################ Return Date Picker Drawer Show


  $(function(){

    $("#returning, #checkReturnDates").on("click", function(){

        //When the returning input children are clicked, the following code will execute

      var setInput = $("#departure").val();

      //This variable gets the value of the previous departure date input field

      if (setInput == "") {

      //If the departure date input field is empty, the returing datepicker drawer will not show and it will be highlighted with an error message to pick an departure date first

        $("#returningError").show().html("Please pick a Departure Date First");
        $("#returning").css({"borderColor": "#ebb734"});

      }

      else {

      //If there is a value in the previous departure date input field, the highlights and errors will be removed and the returning datepicker drawer will be shown as well as the transparent exit div underneath

      $("#returningError").hide();
      $("#returning").css({"borderColor": "#5e32a8"});

      $(".returnChoices").show("slide", {direction: "left"}, 1000);
      $(".returningExit").show();

      //##################################### Set Return MinDate

      var departureDate = $("#departure").val();

      //The Departure date inut value will then be stored in a variable

      var year = parseInt(departureDate.slice(6, 10));
      var month = parseInt(departureDate.slice(3, 5)) - 1;
      var day = parseInt(departureDate.slice(0, 2)) + 1;

      //Each variable above will slice the departure date input variable based on the format, to get the year, month and date as this is reequired in a particular order to set the min date.

      //Also the jQuery UI datepicker widget month array is stored from 0 - 11,
      //thats why you need to - 1 from the departureDate input month value e.g. 10 = Novemeber

      //#####################################

      $(".returnCalendar").datepicker({

        //Displays Datepicker method from Jquery UI, CDN in HTML and Styled in CSS

        dateFormat: 'dd-mm-yy',
        minDate: new Date(year, month, day),

        //Sets format and current date set from values of departure date sliced variables

        onSelect: function(returnDate) {

          //When a date is clicked it carrys out the following code

          $("#returning").val(returnDate);
          localStorage.setItem("returnDate", returnDate);

          //It stores the value of the selected item in a variable via function parameter, sets it as the value of the input field
          //and stores that value in Local Storage under returnDate

          $(".returnChoices").hide();
          $(".returningExit").hide();

          //The returnChoices drawer is then hidden

          $("#returningError").hide();
          $("#returning").css({"borderColor": "#5e32a8"});

          //If the value is set, the highlights and error messages will be hidden
        }

      });

    }

  });



    $(".returningExit").on("click", function(){

      //when the transparent exit div opened before, underneath the dreturn datepicker, is clicked outside the
      //datepicker drawer, the following code will be executed

      var checkInput = $("#returning").val();

      //This variable stores the current value of the departure date input field

      if (checkInput == "") {

        //If there is no value present and the field is empty, it will highlight and show an error

        $("#returningError").show().html("Please pick a Return Date");
        $("#returning").css({"borderColor": "#ebb734"});

      }

      else {

        //If the field does have a value input, it will close the exit and datepicker drawer div
        //and remove any highlights or errors

        $(".returnChoices").hide()
        $(".returningExit").hide();

        $("#returningError").hide();
        $("#returning").css({"borderColor": "#5e32a8"});

      }

    });

  });


//################################################################# Passenger Validation

  $(function(){

    $("input[type='number']").on("input", function() {

      //When elements with the number attribute recieve input, the following code is carried out

        var adults = parseInt($("#adults").val());
        localStorage.setItem("adults", adults );

        var children = parseInt($("#children").val());
        localStorage.setItem("children", children );

        var infants = parseInt($("#infants").val());
        localStorage.setItem("infants", infants );

        var totalPassengers = adults + children + infants;

        //The respective values input are converted to numbers and stored in variables
        //as well as local storgae under the same name. Then all the values are added together
        //to getthe total amount of passengers for later checks

        if ((adults == 0) && (children == 0) && (infants == 0)) { //OR totalPassengers == 0?
          $("#passengerError").show().html("Please pick at least 1 Passenger");
          $("#adults, #children, #infants").css({"borderColor": "#ebb734"})
        }

        else if ((adults == 0) && ((children > 0 ) || (infants > 0))) { //OR totalPassengers == 0?
          $("#passengerError").show().html("Children & Infants must be accompanied by an Adult");
          $("#adults, #children, #infants").css({"borderColor": "#ebb734"})
        }

        else if (totalPassengers > 10) {
          $("#passengerError").show().html("Maximum number of Passengers allowed is 10, Currently you have " + totalPassengers);
          $("#adults, #children, #infants").css({"borderColor": "#ebb734"});
        }

        else {
          $("#passengerError").hide();
          $("#adults, #children, #infants").css({"borderColor": "#5e32a8"});
        }

        //If all fields are equal to 0, then the fields are highlighted and an error occurs, if there
        //are children selected and dno adults present, another error will dispaly and if the total
        //passengers is above the limit of 10 then another error will show, if all if statements are met, then
        //the errors are removed

     });

  });

//############################################################ Form Validation

  $(function() {

    $("#findFlights").on("click", function() {

      //When the submit form button is clicked the following code is run

      var home = $("#home").val();
      var destination = $("#destination").val();
      var departure = $("#departure").val();
      var returning = $("#returning").val();
      var adults = $("#adults").val();
      var children = parseInt($("#children").val());
      var infants = parseInt($("#infants").val());
      var totalPassengers = adults + children + infants;

      //All form element input values are taken and stored in variables

      if (home == "") {
        $("#homeError").show().html("Please pick a Departing Airport");
        $("#home").css({"borderColor": "#ebb734"});
      }

      if (destination == "") {
        $("#destinationError").show().html("Please pick a Destination Airport");
        $("#destination").css({"borderColor": "#ebb734"});
      }

      if (departure == "") {
        $("#departureError").show().html("Please pick a Departure Date");
        $("#departure").css({"borderColor": "#ebb734"});
      }

      if (returning == "") {
        $("#returningError").show().html("Please pick a Return Date");
        $("#returning").css({"borderColor": "#ebb734"});
      }

      //If any of the fields are empty, then the field is highlighted and an error is shown

    });

  });


//############################################################ Form Plugin Validation

  $(function(){

    //The following code is part of a plugin linked via a CDN in the html document

    $.validator.setDefaults({
      highlight: function(element) {
        $(element)
        .addClass("flyError");
      },
      unhighlight: function(element) {
        $(element)
        .removeClass("flyError");
      }
    });

    //if an error occurs then the element is given the flyError class which highlights the field

    $("#holidayPlan").validate({

      //When the form is submitted, the following checks are executed

      rules: {
        home : {
          required: true
        },
        destination : {
          required: true
        },
        departure : {
          required: true
        },
        returning : {
          required: true
        },
        adults : {
          min: 1
        },
        children : {
          max: 9
        },
        infants : {
          max: 9
        }
      },

      //all fields are set to require a value and the passengers have numeric limits

      messages: {
        home : {
          required: ""
        },
        destination : {
          required: ""
        },
        departure : {
          required: ""
        },
        returning : {
          required: ""
        },
        adults : {
          min: ""
        },
        children : {
          max: ""
        },
        infants : {
          max: ""
        }
      }

      //Plugin would make default error messages appear in input field, I didnt like the look of this so
      // I made them empty so no errors would appear, and instead there is other validation jquery rules
      //previously in the file to dispaly error messages, the plugin is just so that everything
      //required is present before submitting, as if any values are empty, you wont be taken to the next page

    });

  });

//############################################################

  $(function(){

    $("#reset").on("click", function(){

      //When the rest button is clicked, all input values are set to empty so that the user can refill form
      //the local storgae is also cleared

      $("#home").val("");
      $("#destination").val("");
      $("#departure").val("");
      $("#returning").val("");
      $("#adults").val("1");
      $("#children").val("0");
      $("#infants").val("0");

      //localStorage.clear();

    });

  });

//####################################################### TESTING

//Remember to mention plugin wouldn't accept homeChoice list selection home input value
//to satisfy input required rule, so instead had to use jQuery

//Next method on findFlights click worked but as the fields were updated, the errors
//would remain until the user clicked the findFlights button again - still worked but I wanted
//the errors to be cleared as the incorrect field inputs were rectified

//this led to me including validation within each of the input field functions
//step by step so that each field needed to be correctly filled in before interacting
//with the next one - more secure and valid but less flexible?

//Can only choose once and then choices are hidden, was tricky to set validation
//on initial off drawer click and hide, on whole input Validation was becomming annoying and happening
//every click previously, have changed it so that the erros dont appear until the end,
//I think this is much nicer but will check with rest of team, change to on keyup for home
//input may be better to show as they type as currently its set to blur when they click off,
//it just depends what is prefered - left Destination as previous to compare!!!!!!

//Managed to set min date by getting value of departure date input, then slicing the value to get
//the year, month and day of the value seperately to set as minDate due to the required format,
//however can only be set ONCE FIRST TIME, if you go back and change departureDate, the minDate wont update,
//you need to refresh page and pick a new depatureDate if you want to set a new Return minDate
//Also the jQuery UI datepicker widget month array is stored from 0 - 11,
//thats why you need to - 1 from the departureDate input month value e.g. 10 = Novemeber

//Set validation to stop people picking dates before departure!

//####Instead of having 2 fields you pick seperately I am going to make it that once one is selected, you
//are automatically taken to the next one all within one function, hopefully return minDate will update each time
//and you can talk about the previous version not working in testing

// as before I couldnt prevent the data, even empty fields being submitted
// - button disabled if input empty, couldnt click on again to check plugin navigates this.

//Exit divs behind to show error
