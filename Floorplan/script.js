//########################################################################## Variables

var page = 0; //Sets page index
var edit = 0; //Sets edit button index
var last = 0; //Sets new page index after addPage is clicked

var book = ["Index.html"]; //Whole list of Page names in footer that are added
// TODO : Remember to put whatever default starting pages in book array

var names = []; //Page names on Sitemap stage array

var position = []; //Name of Page on Sitemap Stage and its offset position
var points = []; //New Link modal SVG line points array

var links = 0; //SVG line index
var relationship = []; //Shows the pages linked together in pairs

var newModal = '<div class="modal"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title"> Edit Page Name </h5> <button type="button" class="closeX" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <input class="editName form-control" type="text" placeholder="Page Name"> </input> <textarea class="editDescription form-control" placeholder="Description" readonly="readonly"></textarea> <button class="updateDescription btn btn-secondary"> Edit </button> </div> <div class="modal-footer"> <button type="button" class="closeB btn btn-secondary">Close</button> <button class="updateEdit btn btn-primary" type="button">Update</button> </div> </div> </div>'; //New Page Modal

var newLinkModal = '<div class="modalLink"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title"> </h5> <button type="button" class="closeX" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="form-group"> <label for="pageLinks"> Link To: </label> <select class="pageLinkOptions form-control" id="pageLinks"> </select> </div> </div> <div class="modal-footer"> <button type="button" class="closeB btn btn-secondary">Close</button> <button class="updateLink btn btn-primary" type="button">Link</button> </div> </div> </div>'; //New Link Modal

var newPage = "<div class='page'> <p class='pageName'>New Page</p> <button class=link>/</button> <button class='edit' data-toggle='modal' data-target='#modal'> $ </button> <button class='remove'> X </button> </div>"; //New Page Div

var link = '<line x1="0" y1="0" x2="0" y2="0" stroke="black" />'; //SVG line


//########################################################################## Functions

function bobTheBuilder() {

  //This function adds the pages from the footer onto the sitemap stage

  $(function() {

    $(".page").draggable({
      cursor: "-webkit-grabbing",
      containment: "#map",
      scroll: true,
      start: function(event, ui) {
        brick = $(this);
      }
    });

    //the page divs are draggable, when they begin to be dragged, they are stored in the
    //brick variable. SCROLL doesnt work in containment div

    $("#map").droppable({
      drop: function() {

        wipe();

        var set = $(brick).offset(); //gets div postion X & Y
        var name = $(brick).find("p").text(); //gets page name

        var height = $(brick).height(); //gets page height
        var width = $(brick).width(); //gets page width
        var x = set.left + width; //adds page width to offset left position to get center
        var y = set.top + height; //adds page height to offset top position to get center

        var check = position.indexOf(name); //gets index of dropped page name in position array
        var yco = check + 1; //gets index of Y offset co-ordinate
        var xco = check + 2; //gets index of X offset co-ordinate

        if (check == -1) {
          position.push(name);
          position.push(y);
          position.push(x);
          names.push(name);

          //if the page is not in the position array, then the name, X & Y co-ordinates are added to it
          //as well as the name added to the names array
        } else {

          position[check] = name;
          position[yco] = y;
          position[xco] = x;

          //if the dropped page is already in the position array, then using its index with the addition of the X and Y co-ordinate indexes, the new values are updated in the array

          trustMeD();

          //calls the remove link function as if a page is moved on the stage that is already
          //in the position array, then it may currently have a link, so if it is moved
          //it's link will be removed
        }


        //because the scroll on draggable was not working, this function adds to teh sitemap stage
        //so that there is enough room for all the pages

        var map = $(this).height(); //gets height of sitemap stage
        var svg = $("svg").height(); //gets height of svg element

        var edge = map - 100; //gets within the edge of the sitemap stage value
        var scrollMap = map + 200; //adds 200 to the height of the sitemap stage
        var scrollLine = svg + 200; //adds 200 to the svg element

        if (y > edge) {

          //if the page Y top offset position is within the edge of the sitemap stage

          $(this).css("height", scrollMap); //increase the height of the stage
          $("svg").css("height", scrollLine); //increase the height of the svg element

        }

        $(brick).remove(); //removes brick from footer
        $(this).append(brick); //adds brick to the sitemap stage

        //This function sets the new X & Y offset postion of the page when it is dropped in the
        //sitempa stage

        $(brick).css({
          "position": "absolute",
          "left": set.left,
          "top": set.top
        });

      }
    });

  });
}

//######################################################################################

function linkUpYG() {

  //Adds links between pages

  $(function() {

    $(".link").off("click").on("click", function() {

      var name = $(this).siblings("p").text();
      var check = position.indexOf(name);

      //The name of the page that the link button is clicked on is found
      //it is then searched for in the position array
      //this holds the postions of all pages on the sitemap stage

      var ySetStart = position[(check + 1)];
      var xSetStart = position[(check + 2)];

      //The X & Y co-ordinates of the initial page are found in the
      //position array by taking the next 2 values beside the name index,
      //as the name, Y offset position and X offset position are stored in that order
      //in groups of 3 in the position array
      //[0 = Name, 1 = Yposition, 2 = Xposition]

      relationship.push(name); //The page name is added to the relationship array

      points.push(ySetStart);
      points.push(xSetStart);

      //The X & Y offset postions of the page the link button is clicked on
      //from the position array are added to the points array
      //these will be used as the starting points for drawing the link

      $("body").append(newLinkModal);
      $(".modalLink").css("display", "block");
      $(".modal-title").html("Create " + name + " Link");

      //When the link button is clicked and the variables are read and stored,
      //the choose link modal will appear it will display the name of the page
      //that the link is starting from in the link modal title

      $.each(names, function(index, value) {
        $("select").append("<option>" + value + "</option>");
      });

      //This each function adds the new page names added to the Sitemap stage from the names array
      //to the link selector option menu in the link modal

    });

    $(".updateLink").off("click").on("click", function() {

      var select = $(".pageLinkOptions").val();
      var check = position.indexOf(select);

      //When the update link button is clicked in the new link modal, the option name
      //chosen in the selector is found in the position array

      var ySetStart = position[(check + 1)];
      var xSetStart = position[(check + 2)];

      //The X & Y co-ordinates of the selected option page are found in the
      //position array by taking the next 2 values beside the name index,
      //as the name, Y offset position and X offset position are stored in that order
      //in groups of 3 in the position array
      //[0 = Name, 1 = Yposition, 2 = Xposition]

      relationship.push(select);
      //relationship.push("|");

      //The selected option page name is then added to the relationship array with a |
      //divider so that I can see the link relationships of each page clearly

      points.push(ySetStart);
      points.push(xSetStart);

      //The X & Y offset postions of the selected option
      //from the position array are added to the points array
      //these will be used as the ending points for drawing the link

      $(document.createElementNS('http://www.w3.org/2000/svg', 'line')).attr({
        x1: points[1],
        y1: points[0],
        x2: points[3],
        y2: points[2]
      }).appendTo("svg");

      //This function adds a line with the X & Y co-ordinates from the page that the link button
      //was clicked on to the X & Y co-ordinates of the page option selected in the modal and adds
      //it to the SVG element in the html page

      links++; //The link index is incremented each time a line is added to the SVG

      points = []; //The points array is cleared for a new pair of pages co=ordinates to be linked

      $(".modalLink").remove(); //The link modal is then removed

    });

  });

}


//######################################################################################

function trustMeD() {

  //This function removes the SVG line that links 2 pages when one of them is moved
  //It is called during the bobTheBuilder function

  $(function() {

    console.log(relationship);

    var present = $(brick).children("p").text();
    console.log(present);
    var stage = relationship.indexOf(present);
    console.log(stage);

    // TODO : If a page has multiple links, you need to remove all instances of it

    //The page that is dragged within the bobTheBuilder function is stored in the brick
    //variable called here set by the previous function, this variable then gets the name of that page

    var start = 0; //First page link button clicked
    var end = 1; //Second page option selected in link modal
    var split = 2; //covers the index of the Name, X & Y offset position co-ordinates
    var pick = 0; //Line index
    var jump = 2; //relationship index

    for (i = 0; i < links; i++) {

      //while i is less than the amount of links on the page, complete the following
      //and after add 1 to i

      if ((stage == start) || (stage == end)) {

        //if the index of the page name moved is in the relationship array,
        //if it is = to 0 or 1 as in the first page name or second page name


        $("line").eq(pick).remove();

        //then remove the line at index 0

        // TODO: Fix Line Removal method

        relationship.splice(start, split);

        //################################################################

        var stage = relationship.includes(present);

        //this variable checks again to see if the page has any other links in the relationship array

        while (stage == true) {

          //while it is tru that the page has other links on the sitemap stage and in the relationship array

          trustMeD();

          //it runs through itself again to remove the other links from the same page

          break;

          //then breaks out of the loop
        }

        //################################################################

        //and splice the page names out of the relationship array

        break;

        //and quit the loop
      } else {

        //if the index of the page name moved is in the relationship array,
        //if it is NOT = to 0 or 1 as in the first page name or second page name

        start += jump;
        end += jump;
        split += jump;

        //then add 2 to the start and end, this will get the next linked pair in the relationship
        //array as well as updating the split for the next splice

        pick++; //then increment pick so that the next line can be removed and the previous remains

      }

    }

  });

}

function wipe() {

  $(".edit").eq(page).hide();
  $(".remove").eq(page).hide();
  $(".link").eq(page).hide();

  //Removes all the buttons when no mouseover the page divs

}

//##############################################################################

$(function() {

  $(".page").mouseover(function() {
    page = $(".page").index(this);
    var description = $(".editDescription").eq(page).val();
    var footer = $(this).parent("#footer").attr("id");

    $(".edit").eq(page).show();
    $(".remove").eq(page).show();

    if (footer == "footer") {
      $(".link").eq(page).hide();
    } else {
      $(".link").eq(page).show();
    }

    if (description == "") {
      $('#showDescription').html("Pages");
    } else {
      $('#showDescription').html(description);
    }

  }).mouseout(function() {
    $('#showDescription').html("Pages");
    wipe();
  });

  $(".edit").off("click").on("click", function() {
    wipe();
    $("body").append(newModal);
    var name = $(this).siblings("p").text();
    edit = $(".edit").index(this);
    $(".modal").eq(edit).css("display", "block");
    $(".editName").attr("value", name);
  });

  bobTheBuilder();
  linkUpYG();

});


$(function() {

  $('#addPage').on('click', function() {
    wipe();
    $("footer").append(newPage);
    $("body").append(newModal);

    last = $(".page").length - 1;
    $(".modal").css("display", "block");

  });

  //This just applies the above function to dynamically added elements, just copy and paste in all above, as below, when ready and it will take effect on the new elements

  $(document).on("mouseover", ".page", function() {
    $(".page").off("mouseover").on("mouseover", function() {
      page = $(".page").index(this);
      var description = $(".editDescription").eq(page).val();
      var footer = $(this).parent("#footer").attr("id");

      $(".edit").eq(page).show();
      $(".remove").eq(page).show();

      if (footer == "footer") {
        $(".link").eq(page).hide();
      } else {
        $(".link").eq(page).show();
      }

      if (description == "") {
        $('#showDescription').html("Pages");
      } else {
        $('#showDescription').html(description);
      }
    }).mouseout(function() {
      $('#showDescription').html("Pages");
      wipe();
    });
  });

  $(document).on("mouseover", ".edit", function() {
    $(".edit").off("click").on("click", function() {
      wipe();
      $("body").append(newModal);
      var name = $(this).siblings("p").text();
      edit = $(".edit").index(this);
      $(".modal").eq(edit).css("display", "block");
      $(".editName").attr("value", name);

    });
  });

  $(document).on("mouseover", ".link", function() {
    $(".link").off("click").on("click", function() {
      wipe();
      $("body").append(newLinkModal);
      $(".modalLink").css("display", "block");

    });
  });

  $(document).on("mouseover", ".updateDescription", function() {
    $(".updateDescription").on("click", function() {
      $(".editDescription").removeAttr("readonly", "readonly");
    });
  });


  $(document).on("mouseover", ".updateEdit", function() {
    $(".updateEdit").off("click").on("click", function() {
      wipe();

      if(last > 0) {
        var updateName = $(".editName").val();
        var check = book.includes(updateName);

        if(check == false) {
          var updateName = $(".editName").val();
          $(".pageName").eq(last).html(updateName);
          $(".editDescription").attr("readonly", "readonly");
          $(".modal").remove();
          book.push(updateName);
          last = 0;

        }
        else {
          alert("Please choose a different name");
        }
      }

      else {
        var updateName = $(".editName").eq(edit).val();
        var check = book.includes(updateName);

        if (check == false) {
          var updateName = $(".editName").eq(edit).val();
          $(".pageName").eq(edit).html(updateName);
          $(".editDescription").attr("readonly", "readonly");
          $(".modal").remove();
          book.push(updateName);
        }
        else {
          alert("Please choose a different name");
        }
      }

    });
  });

  $(document).on("mouseover", ".closeX, .closeB", function() {
    $(".closeX, .closeB").off("click").on("click", function() {
      var nameEmptySet = $(".editName").eq(edit).val();
      var nameNew = $(".pageName").eq(last).text();
      var nameEmptyNew = $(".editName").val();
      console.log(nameNew);
      wipe();

      if ((nameNew == "New Page")||(nameEmptySet == "")||(nameEmptyNew == "")) {
        alert("Please choose a different name");
      }
      else {
        $(".modalLink").remove();
        $(".modal").remove();
      }

    });
  });

  $(document).on("mouseover", ".remove", function() {
    $(".remove").off("click").on("click", function() {
      var name = $(".pageName").eq(page).text();
      var check = book.indexOf(name);

      book.splice(check, check + 1);
      $(".page").eq(page).remove();
    });
  });

  $(document).on("mouseover", function() {
    bobTheBuilder();
    linkUpYG();
  });

});
