/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

let sidebar = document.querySelector(".sidebar open");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}



  // Start counting from the third row
  var counter = 3;

  $("#insertRow").on("click", function (event) {
      event.preventDefault();

      var newRow = $("<tr>");
      var cols = '';

      // Table columns
      cols += '<th scrope="row">' + counter + '</th>';
      cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="First name"></td>';
      cols += '<td><input class="form-control rounded-0" type="text" name="lastname" placeholder="Last name"></td>';
      cols += '<td><input class="form-control rounded-0" type="text" name="handle" placeholder="Handle"></td>';
      cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';

      // Insert the columns inside a row
      newRow.append(cols);

      // Insert the row inside a table
      $("table").append(newRow);

      // Increase counter after each row insertion
      counter++;
  });

  // Remove row when delete btn is clicked
  $("table").on("click", "#deleteRow", function (event) {
      $(this).closest("tr").remove();
      counter -= 1
  });