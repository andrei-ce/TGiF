// document.getElementById("id");
// element.innerHTML;
// document.createElement("p");
// element.appendChild(node);
// element.setAttribute("name", "value");

//Select where to insert all data - in this case tbody
  // -- LOOP HERE -- {
  //Create TR
    // -- LOOP HERE -- {
      //Select what data to insert
      //Create TD
      //Insert data in TD
      //Append TD to TR
  //}
  //Append TR to Table
//}  

var myMembers = data.results[0].members;
var fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
var tBody = document.getElementById("senate-data");

for (i=0; i< myMembers.length; i++) {
  var newTr = document.createElement("tr");

    for  (j=0; j< fieldsInserted.length; j++) {
      var dataInserted = fieldsInserted[j];
      var newTd = document.createElement("td");
      newTd.innerHTML = myMembers[i][dataInserted]
      if (j==0){
        newTd.innerHTML = newTd.innerHTML + " " + myMembers[i].last_name;
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}
