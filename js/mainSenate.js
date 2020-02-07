const senateMembers = data.results[0].members;

printTable(senateMembers, ["D", "R", "I"]);

//Listen to any click on checkboxes, and call the function createTable
let checkBoxGroup = document.getElementsByName("filter");
checkBoxGroup.forEach(checkbox => checkbox.addEventListener("click", () => applyFilters()))
// for (i = 0; i < checkBoxGroup.length; i++) {
//   checkBoxGroup[i].addEventListener("click", a => createTable(senateMembers));
// }

function applyFilters() {
  //get what parties to show (outputs array with ["D", "I"], for example)
  let checkboxFilters = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);
  console.log("Filters: " + checkboxFilters);
  printTable(senateMembers, checkboxFilters)
}

function printTable(members, filter1) {
  //delete old table
  membersShowing.innerHTML = "";

  //create and select where to insert new data, and what jeys to show
  let newBody = document.getElementById("membersShowing");
  let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

  //pick first member i => checks if his/her party is selected in partiesToShow => creates and fills rows and cells 
  // => if first td, and middle name not null, go into the middle name loop (and add URL)
  for (let i = 0; i < members.length; i++) {
    if (filter1.includes(members[i].party) || filter1.length < 1) {
      let newTr = document.createElement("tr");
      for (let j = 0; j < fieldsInserted.length; j++) {
        let dataInserted = fieldsInserted[j];
        let newTd = document.createElement("td");
        // First, middle & last name loop
        if (j == 0) {
          // Anchor tag creation
          let newAnchorTag = document.createElement("a");
          newAnchorTag.setAttribute("href", members[i].url);
          newAnchorTag.setAttribute("target", "_blank");
          newAnchorTag.innerHTML = members[i][dataInserted];
          if (j == 0 && members[i].middle_name != null) {
            fullname = newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].middle_name} ${members[i].last_name}`;
          } else {
            newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].last_name}`;
          }
          newTd.appendChild(newAnchorTag);
        } else {
          newTd.innerHTML = members[i][dataInserted];
        }
        newTr.appendChild(newTd);
      }
      newBody.appendChild(newTr);
    }
  }
  console.log("table changed");
}

//*********** NOTES */

//*********** DELETE TABLE ROWS */

//- another option would be loop through oldBody.rows.length & oldBody.)
//- yet another option would be:
// var oldBody = document.getElementById("all-members");
// while (oldBody.hasChildNodes()) {
//   oldBody.removeChild(oldBody.lastChild);
// }
//- yet anotherrrr option:   $("#all-members tr>td").remove();
//- last one:   $("tbody").children().remove()

//*********** GET CHECKBOX VALUES AND PUT IT INTO AN ARRAY */
function updateFilters() {
  // 1- select all inputs with name filter that are checked ===> returns a node list
  var nodeList = document.querySelectorAll('input[name=filter]:checked');
  // 2- transform node list into array
  var arrayFromNode = Array.from(nodeList); // --------> another way to transform nodes into an array is [...nodeName] AS IN // [...document.getElementsByName('filter')].map(x => x.value)

  // 3-map all the keys with name "value" and return as an array (only checked will be shown because of #1)
  var valuesInArrayFromNode = arrayFromNode.map(checkBoxes => checkBoxes.value);
  console.log(valuesInArrayFromNode);
}

//********** THIS EVENT LISTENER BELOW WORKS FOR INDEPENDENT CHECKBOX */

// let checkBoxListener = document.getElementById("independentFilter");
// checkBoxListener.addEventListener('change', e => {
//   if (e.target.checked || e.target.checked == false) {
//     createTable(senateMembers);
//   }
// });