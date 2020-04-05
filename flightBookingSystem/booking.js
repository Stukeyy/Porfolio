

//################################################################################################# Booking Validation

  $(function() {

//################################################################################################# First Name

      $("#fName").blur(function(){

      //When the user exits the First Name input field, it will carry out validation on the value input

      var nameRegex = /^([a-z]|[A-Z]){1}[a-z]{2,16}$/gm;
      var noCapital = /^[a-z]{3,16}$/;
      var checkInput = $(this).val();

      //This variable collects the value and stores it
      //There are also Regex variables, the first one accepts either a lower case or upper case letter
      //as the first input, then all other following letters up until 16, html validation prevents from going above anyway
      //the noCapital Regex variable only accepts all lower case letters up until 16 and will be used later on

      var checkType = nameRegex.test(checkInput);

      //This variable checks to see if the value input in first name contains the arguments within the nameRegex variable mentioned above, if it consists of only lower or upper case letters it will return true. If it contains any numbers or symbols, it will return false.

      if (checkInput == "") {
        $("#fNameError").show().html("Please provide a First Name");
        $("#fName").css({"borderColor": "#ebb734"});
      }

      //If the firstName input value is empty it will highlight the field and show an error message

      else if (!checkType) {
        $("#fNameError").show().html("Please use an Appropriate Name (Letters only)");
        $("#fName").css({"borderColor": "#ebb734"});
      }

      //If the checkType variable returns false and the input value contains Numbers or Symbols it will highlight the field and show an error message

      else {
        $("#fNameError").hide();
        $("#fName").css({"borderColor": "#5e32a8"});

        //If the value only contains letters checkType will return true and no highlight or error will show


        var fNameChoice = $("#fName").val();
        localStorage.setItem("firstName", fNameChoice);

        //This variable takes the value and stores it in local storage under the firstName key
      }

      if (noCapital) {

        //If the value input in the fName field doesnt contain any capital letters, then the noCapital regex variable will return true and carry out the following code

        var capital = checkInput.slice(0,1);
        var rest = checkInput.slice(1);
        var grammar = capital.toUpperCase();
        var update = grammar + rest;
        $("#fName").val(update);

        //the first variable will slice the input and get the first letter, whihc will be lower case
        //the second input will then store the rest of the value after from the 1 index
        //the third variable converst the lower case letter sliced from the first variable to an Upper case letter
        //the fourth variable merges the string together with the new capital, so that it is still the same input with a capital
        //the last jquery statment puts this newly updated value in the input field
        //this allows users to input a lower case name and it is fixed and updated automatically client side without having to show an error

        var fNameChoice = $("#fName").val();
        localStorage.setItem("firstName", fNameChoice);

        //This variable takes the value and stores it in local storage under the firstName key
      }

    });

//################################################################################################# Surname

    $("#sName").blur(function(){

    //When the user exits the Surname input field, it will carry out validation on the value input

    var nameRegex = /^([a-z]|[A-Z]){1}[a-z]{2,15}$/gm;
    var noCapital = /^[a-z]{3,16}$/;
    var checkInput = $(this).val();

    //This variable collects the value and stores it
    //There are also Regex variables, the first one accepts either a lower case or upper case letter
    //as the first input, then all other following letters up until 16, html validation prevents from going above anyway
    //the noCapital Regex variable only accepts all lower case letters up until 16 and will be used later on


    var checkType = nameRegex.test(checkInput);

    //This variable checks to see if the value input in  surname contains the arguments within the nameRegex variable mentioned above, if it consists of only lower or upper case letters it will return true. If it contains any numbers or symbols, it will return false.

    if (checkInput == "") {
      $("#sNameError").show().html("Please provide a Surname");
      $("#sName").css({"borderColor": "#ebb734"});
    }

      //If the surName input value is empty it will highlight the field and show an error message

    else if (!checkType) {
      $("#sNameError").show().html("Please use an Appropriate Name (Letters only)");
      $("#sName").css({"borderColor": "#ebb734"});
    }

    //If the checkType variable returns false and the input value contains Numbers or Symbols it will highlight the field and show an error message

    else {
      $("#sNameError").hide();
      $("#sName").css({"borderColor": "#5e32a8"});

        //If the value only contains letters checkType will return true and no highlight or error will show

      var sNameChoice = $("#sName").val();
      localStorage.setItem("surName", sNameChoice);

      //This variable takes the value and stores it in local storage under the firstName key
    }

    if (noCapital) {

      //If the value input in the fName field doesnt contain any capital letters, then the noCapital regex variable will return true and carry out the following code

      var capital = checkInput.slice(0,1);
      var rest = checkInput.slice(1);
      var grammar = capital.toUpperCase();
      var update = grammar + rest;
      $("#sName").val(update);

      //the first variable will slice the input and get the first letter, whihc will be lower case
      //the second input will then store the rest of the value after from the 1 index
      //the third variable converst the lower case letter sliced from the first variable to an Upper case letter
      //the fourth variable merges the string together with the new capital, so that it is still the same input with a capital
      //the last jquery statment puts this newly updated value in the input field
      //this allows users to input a lower case name and it is fixed and updated automatically client side without having to show an error



      var sNameChoice = $("#sName").val();
      localStorage.setItem("surName", sNameChoice);

      //This variable takes the value and stores it in local storage under the firstName key
    }

    });

//################################################################################################# Expiry Date

    $("#expiry").on("input", function(){

      var checkInput = $(this).val();

      if (checkInput.length == 2) {
        $("#expiry").val(checkInput + " / ");
      }

    });

    //When the user inputs information into the expiry date field, when the input reaches an index of 2, meaning that the month has been typed, then a slash is input to split it from the year, this helps the user write the expiry date in the right format and to make it a clearer input

    $("#expiry").blur(function(){

      //When the user exits the expiry input field, it will carry out validation on the value input

      var dateRegex = /^[0-9]{2}(\/|-|\s){3}[0-9]{2}$/gm;
      var checkInput = $(this).val();
      var month = parseInt(checkInput.slice(0,2));

      //These variable collect the value and store it
      //the first regex variable accepts numbers as the first 2 values, then a space, dash or slash as the next 3 values which accepts the statement above whihc automaticcaly adds the spaces and slashes in, and then the last 2 values as also numbers
      //the last variable takes the input and slices the first 2 numbers which are the month date and makes them an integer

      var checkDate = dateRegex.test(checkInput);

      //This variable checks to see if the value input in expiry contains the arguments within the dateRegex variable mentioned above, if it consists of only the arguments mentioned it will return true. If it contains any letters, it will return false.

      if (checkInput == "") {
        $("#cardError").show().html("Please provide a valid Expiry Date");
        $("#expiry").css({"borderColor": "#ebb734"});
      }

        //If the expiry input value is empty it will highlight the field and show an error message

      else if (month > 12) {
        $("#cardError").show().html("Please select an Valid Month Date (mm/yy)");
        $("#expiry").css({"borderColor": "#ebb734"});
      }

      //if the month variable sliced from the input above is greater than 12, then it will highlight the field and show an error message

      else if (!checkDate) {
        $("#cardError").show().html("Please use an Appropriate Expiry Date (mm/yy)");
        $("#expiry").css({"borderColor": "#ebb734"});
      }

      //If the checkDate variable returns false and the input value contains Letters or Symbols it will highlight the field and show an error message

      else {
        $("#cardError").hide();
        $("#expiry").css({"borderColor": "#5e32a8"});
      }

      //If the value contains only numbers and spaces checkDate will return true and no highlight or error will show

    });

    //################################################################################################# Long Number

      $("#longNumber").on("input", function(){

        var checkInput = $(this).val();

        if((checkInput.length == 4)||(checkInput.length == 9)||(checkInput.length == 14)) {
          $("#longNumber").val(checkInput + " ");
        }

      });

      //As the user inputs values into the longNumber field, when the value reaches a certain index this statement adds in a space, this helps to seperate each 4 digit card section to make it a clearer input


      $("#longNumber").blur(function(){

        //When the user exits the longNumber input field, it will carry out validation on the value input


        var cardRegex = /^[0-9]{4}(\/|-|\s)[0-9]{4}(\/|-|\s)[0-9]{4}(\/|-|\s)[0-9]{4}$/gm;
        var checkInput = $(this).val();


        //This variable collects the value and stores it
        //The regex variable only accepts the first 4 values as a number, then a space value repeated 4 times for each card section

        var checkCard = cardRegex.test(checkInput);

        //This variable checks to see if the value input in longNumber contains the arguments within the cardRegex variable mentioned above, if it consists of only the arguments mentioned it will return true. If it contains any letters, it will return false.

        if (checkInput == "") {
          $("#cardError").show().html("Please provide a valid Card Number");
          $("#longNumber").css({"borderColor": "#ebb734"});
        }

        //If the input is empty then the field will be highlighted and ana error message  will show

        else if (!checkCard) {
          $("#cardError").show().html("Please use an valid Card Number <br> (1234 1234 1234 1234)");
          $("#longNumber").css({"borderColor": "#ebb734"});
        }

        //If the checkCard variable returns false and the input value contains Letters or Symbols it will highlight the field and show an error message

        else {
          $("#cardError").hide();
          $("#longNumber").css({"borderColor": "#5e32a8"});
        }

        //If the value contains only numbers and spaces checkDate will return true and no highlight or error will show

      });

//############################################################ Security Code

      $("#secCode").blur(function(){

      //When the user exits the secCode input field, it will carry out validation on the value input

        var codeRegex = /^[0-9]{3}$/gm;
        var checkInput = $(this).val();


        //This variable collects the value and stores it
        //The regex variable only accepts the first 3 values as a number, also html validation to limit input

        var checkCode = codeRegex.test(checkInput);

        //This variable checks to see if the value input in expiry contains the arguments within the codeRegex variable mentioned above, if it consists of only the arguments mentioned it will return true. If it contains any letters, it will return false.

        if (checkInput == "") {
          $("#cardError").show().html("Please provide a valid Security Code");
          $("#secCode").css({"borderColor": "#ebb734"});
        }

        //If the input is empty then the field will be highlighted and ana error message will show

        else if (!checkCode) {
          $("#cardError").show().html("Please use an valid Security Code (123)");
          $("#secCode").css({"borderColor": "#ebb734"});
        }

        //If the checkCode variable returns false and the input value contains Letters or Symbols it will highlight the field and show an error message

        else {
          $("#cardError").hide();
          $("#secCode").css({"borderColor": "#5e32a8"});
        }

        //If the value only contains numbers checkCode will return true and no highlight or error will show


      });

//############################################################ Phone Number

      $("#number").blur(function(){

        //When the user exits the number input field, it will carry out validation on the value input

        var phoneRegex = /^[0-9]{11}$/gm;
        var checkInput = $(this).val();

        //This variable collects the value and stores it
        //The regex variable only accepts the first 11 values as a number, also html validation to limit input

        var checkPhone = phoneRegex.test(checkInput);

        //This variable checks to see if the value input in number contains the arguments within the phoneRegex variable mentioned above, if it consists of only the arguments mentioned it will return true. If it contains any letters, it will return false.

        if (checkInput == "") {
          $("#numberError").show().html("Please provide a valid Phone Number");
          $("#number").css({"borderColor": "#ebb734"});
        }

        //If the input is empty then the field will be highlighted and ana error message will show

        else if (!checkPhone) {
          $("#numberError").show().html("Please enter a valid Phone Number (11 digits)");
          $("#number").css({"borderColor": "#ebb734"});
        }

        //If the checkPhone variable returns false and the input value contains Letters or Symbols it will highlight the field and show an error message

        else {
          $("#numberError").hide();
          $("#number").css({"borderColor": "#5e32a8"});

          var number = $("#number").val();
          localStorage.setItem("number", number);

          //If the value contains only numbers checkPhone will return true and no highlight or error will show, the value will also be input to local storage under the number key
        }

      });

//############################################################ Email

      $("#mail").blur(function(){

        //When the user exits the mail input field, it will carry out validation on the value input

        var emailRegex = /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,5})(\.[a-z]{2-5})?$/igm;
        var checkInput = $(this).val();

        //This variable collects the value and stores it
        //The regex variable accepts letters, numbers, dots and dashes up until as many are input, then the next value must be an @ symbol, the section after that can contain any letters, numbers, dots or dashes, as many are needed for the domain name, then the next must be a dot, and the final section is letters up until 5, to accomodate the extension mostly .com, and then another optional section for an extra extension e.g .co.uk

        var checkEmail = emailRegex.test(checkInput);

        //This variable checks to see if the value input in email contains the arguments within the emailRegex variable mentioned above, if it consists of only the arguments mentioned it will return true. If it contains any letters, it will return false.

        if (checkInput == "") {
          $("#emailError").show().html("Please provide a valid Email Address");
          $("#mail").css({"borderColor": "#ebb734"});
        }

        //If the input is empty then the field will be highlighted and ana error message will show

        else if (!checkEmail) {
          $("#emailError").show().html("Please enter a valid Email Address <br> user@mail.com");
          $("#mail").css({"borderColor": "#ebb734"});
        }

        //If the checkEmail variable returns false it will highlight the field and show an error message

        else {
          $("#emailError").hide();
          $("#mail").css({"borderColor": "#5e32a8"});

          var email = $("#mail").val();
          localStorage.setItem("email", email);

          //If the value satisfies emailRegex then checkEmail will return true and no highlight or error will show, the value will also be input to local storage under the number key
        }

      });


//############################################################ Reset

    $("#clean").on("click", function() {

      //When the button with the id clean is clicked the following code is executed

      $("#fName").val("");
      $("#sName").val("");
      $("#expiry").val("");
      $("#longNumber").val("");
      $("#secCode").val("");
      $("#number").val("");
      $("#mail").val("");

      //Each field value is rest to nothing

    });

  });

//############################################################ Validation on Submit Button Click

$(function() {

  $("#book").on("click", function() {

    //When the submit form button is clicked the following code is run

    var fName = $("#fName").val();
    var sName = $("#sName").val();
    var expiry = $("#expiry").val();
    var longNumber = $("#longNumber").val();
    var secCode = $("#secCode").val();
    var number = $("#number").val();
    var email = $("#mail").val();


    //All form element input values are taken and stored in variables

    if (fName == "") {
      $("#fNameError").show().html("Please enter a valid First Name");
      $("#fName").css({"borderColor": "#ebb734"});
    }

    if (sName == "") {
      $("#sNameError").show().html("Please enter a valid Surname");
      $("#sName").css({"borderColor": "#ebb734"});
    }

    if ((expiry == "")||(longNumber == "")||(secCode == "")) {
      $("#cardError").show().html("Please provide valid Card Details");
      $("#expiry, #longNumber, #secCode").css({"borderColor": "#ebb734"});
    }


    if (number == "") {
      $("#numberError").show().html("Please provide a valid Contact Number");
      $("#number").css({"borderColor": "#ebb734"});
    }

    if (email == "") {
      $("#emailError").show().html("Please provide a valid Email Address");
      $("#mail").css({"borderColor": "#ebb734"});
    }

    //If any of the fields are empty, then the field is highlighted and an error is shown

  });

});

//############################################################ Validation Plugin

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

  $("#info").validate({

    //When the form is submitted, the following checks are executed

    rules: {
      fName : {
        required: true
      },
      sName : {
        required: true
      },
      expiry : {
        required: true
      },
      longNumber : {
        required: true
      },
      secCode : {
        required: true
      },
      number : {
        required: true
      },
      email : {
        required: true
      }
    },

    //all fields are set to require a value

    messages: {
      fName : {
        required: ""
      },
      sName : {
        required: ""
      },
      expiry : {
        required: ""
      },
      longNumber : {
        required: ""
      },
      secCode : {
        required: ""
      },
      number : {
        required: ""
      },
      email : {
        required: ""
      }
    }

    //Plugin would make default error messages appear in input field, I didnt like the look of this so
    //I made them empty so no errors would appear, and instead there is other validation jquery rules
    //previously in the file to display error messages, the plugin is just so that everything
    //required is present before submitting, as if any values are empty, you wont be taken to the next page

  });

});
