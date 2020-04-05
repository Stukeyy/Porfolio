
//##################################################################Variables

var ticketDepartureDate = localStorage.getItem("departureDate");
var returnTicketDepartureDate = localStorage.getItem("returnDate");

var ticketDepartureSeats = localStorage.getItem("departingSeats");
var returnTicketSeats = localStorage.getItem("seats");

var ticketHome = localStorage.getItem("home");
var ticketDepartureTime = localStorage.getItem("departingDepartureTime");
var returnTicketDepartureTime = localStorage.getItem("returnDepartureTime");

var passName = localStorage.getItem("firstName");
var passSurname = localStorage.getItem("surName");

var ticketReturnDate = localStorage.getItem("returnDate");
var ticketreturnSeats = localStorage.getItem("seats");

var ticketDestination = localStorage.getItem("destination");
var ticketArrivalTime = localStorage.getItem("departingArrivalTime");
var returnTicketArrivalTime = localStorage.getItem("returnArrivalTime");

var passNumber = localStorage.getItem("number");
var passEmail = localStorage.getItem("email");

var ticketAdults = parseInt(localStorage.getItem("adults"));
var ticketChildren = parseInt(localStorage.getItem("children"));
var ticketInfants = parseInt(localStorage.getItem("infants"));
var totalPassengers = ticketAdults + ticketChildren + ticketInfants;

var departingPrice = parseInt(localStorage.getItem("departingTotalPrice"));
var returningPrice = parseInt(localStorage.getItem("totalReturnPrice"));
var totalPrice = departingPrice + returningPrice;

//All of these variable simply get the information from Local Sotrage of the respective keys and store them

//##################################################################JQuery

  $(function(){

    $("#ticketDepartureDate").html(ticketDepartureDate);
    $("#ticketChosenSeats").html(ticketDepartureSeats);

    $("#ticketHome").html(ticketHome);
    $("#ticketDeparture").html(ticketDepartureTime);

    $("#ticketDestination").html(ticketDestination);
    $("#ticketArrival").html(ticketArrivalTime);

    $("#ticketName").html(passName);
    $("#ticketSurname").html(passSurname);

    $("#ticketNumber").html(passNumber);
    $("#ticketEmail").html(passEmail);

    $("#returnTicketDepartureDate").html(returnTicketDepartureDate);
    $("#returnTicketChosenSeats").html(ticketreturnSeats);

    $("#returnTicketHome").html(ticketHome);
    $("#returnTicketDeparture").html(returnTicketDepartureTime);

    $("#returnTicketDestination").html(ticketDestination);
    $("#returnTicketArrival").html(returnTicketArrivalTime);

    $("#returnTicketName").html(passName);
    $("#returnTicketSurname").html(passSurname);

    $("#returnTicketNumber").html(passNumber);
    $("#returnTicketEmail").html(passEmail);

    $("#finalPassengers").html(totalPassengers);
    $("#price").html("£" + totalPrice);

    //All of these statements simply display the information stored as variables from local storage in html in the id elements stated

  });

  $(function(){

    $("#departingTicket").mouseover(function(){
      $(this).find("p:even").css("background-color", "rgba(94, 50, 168, 0.85)");
      $(this).find("p:odd").css("background-color", "rgba(94, 50, 168, 0.57)");
    }) .mouseout(function(){
      $(this).find("p:even").css("background-color", "rgba(94, 50, 168, 0.57)");
      $(this).find("p:odd").css("background-color", "rgba(94, 50, 168, 0.85)");
    });

    //When the departing ticket div is hovered over, the p children elements that are even within this div are given a background colour and then the p children odd elements within this div are given a different background colour to create a zebra effect,
    //This is then returned to normal when the mouse is moved off the div to give the section a zebra hover effect making the content more interactive

    $("#returningTicket").mouseover(function(){
      $(this).find("p:even").css("background-color", "rgba(94, 50, 168, 0.85)");
      $(this).find("p:odd").css("background-color", "rgba(94, 50, 168, 0.57)");
    }) .mouseout(function(){
      $(this).find("p:even").css("background-color", "rgba(94, 50, 168, 0.57)");
      $(this).find("p:odd").css("background-color", "rgba(94, 50, 168, 0.85)");
    });

    //When the returning ticket div is hovered over, the p children elements that are even within this div are given a background colour and then the p children odd elements within this div are given a different background colour to create a zebra effect,
    //This is then returned to normal when the mouse is moved off the div to give the section a zebra hover effect making the content more interactive

  });

  $(function(){
    $("#newFlight").on("click", function(){
      localStorage.clear();
    });

    //When the element with the newFlight id is clicked, the local storage is cleared and in html the user is taken back to the index page, this clears all of the content generated on each page and allows the user to pick a new flight

  });
