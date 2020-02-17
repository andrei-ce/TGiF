// GLOBAL VARIABLES
let partySelector = document.querySelectorAll('input[type=checkbox]');
let stateSelector = document.querySelector('#stateSelector');
let newBody = document.querySelector('#membersShowing');
let noResults = document.querySelector('#noResults');
let loader = document.querySelectorAll('.loader');
let stateList = []; //if generateStateList() and printSelectOptions are joined, no global variable is needed
let fieldsInserted = ['first_name', 'party', 'state', 'seniority', 'votes_with_party_pct'];

//URL WINDOW READER
let url = window.location.pathname.split("/").pop();
let chamber;
if (url === "senate.html") {
  chamber = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (url === "house.html") {
  chamber = "https://api.propublica.org/congress/v1/113/house/members.json"
}

//FETCH DATA ACCORDING TO HTML WINDOW LOCATION
fetch(chamber, {
  method: "GET",
  headers: {
    'X-API-KEY': "lbIexHSOJM4TcjsZnHyF1WYVzjkAaZsYzncPFRJn"
  }
}).then((res) => {
  if (res.ok) { //if response.ok exists, transform response into a json object
    return res.json();
  }
  throw new Error(res.statusText) //will throw error only if an error exists (else, res.statusText = OK)
}).then((data) => {
  originalMembers = data.results[0].members;
  loader.forEach(l => l.style.display = 'none')
  init(originalMembers);
}).catch(function (error) {
  console.log("Request failed: " + error.message);
});

function init(members) {
  printTable(members);
  generateStateList(members);
  printSelectOptions();
  setupPartyListener();
  setupStateListener();
}

//LISTEN TO DROPDOWN SELECTOR FORM
function setupStateListener() {
  stateSelector.addEventListener("input", function () { filterParty(originalMembers) });
}
//LISTEN TO CHECKBOX FORMS
function setupPartyListener() {
  partySelector.forEach(box => box.addEventListener("click", function () { filterParty(originalMembers) }));
}

//THIS IS THE FIRST FILTER no matter what form you interact with
function filterParty(members) {
  //read party filter values into array form
  var partyValues = [...(document.querySelectorAll('input[name=filter]:checked'))].map(x => x.value);
  membersFilteredByParty = []; //temporary array of members
  //for every letter ["D","I","R"], filter member by party
  for (i = 0; i < members.length; i++) {
    if (partyValues.length < 1 || partyValues.includes(members[i].party)) {
      membersFilteredByParty.push(members[i]);
    }
  }
  // pass into the SECOND FILTER BELOW
  filterState(membersFilteredByParty);
}

//THIS IS THE SECOND FILTER no matter what form you interact with (using membersFilteredByParty)
function filterState(members) {
  // read value from dropdown
  var selectedState = stateSelector.value;
  membersFilteredByState = [];
  if (!selectedState) {
    printTable(members); //If "All" (value=""), print same array of members as input
  } else { //Else, for every match of state, pass onto a new array
    for (var i = 0; i < members.length; i++) {
      if (members[i].state === selectedState) {
        membersFilteredByState.push(members[i]);
      }
    }
    printTable(membersFilteredByState); //Print new member array with second filter applied
  }
}

function printTable(members) {
  newBody.innerHTML = ""; //delete old table
  //creates and fills rows and cells for every member found
  for (let i = 0; i < members.length; i++) {
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
        //Add percentage sign after votes with party stat (last position)
      } else if (j == 4) {
        newTd.textContent = members[i][dataInserted] + "%";
        //Else, just print as it comes
      } else {
        newTd.innerHTML = members[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    newBody.appendChild(newTr);
  }
  //If no row was printed, display no results message
  newBody.rows.length < 1 ? noResults.style.display = 'block' : noResults.style.display = 'none';
}

function generateStateList(members) {
  //delete previous list
  stateList = []; //global variable
  //for every member passed as input, create a state list without repeated values
  for (var i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state)) {
      stateList.push(members[i].state);
    }
  }
  stateList.sort();
}

function printSelectOptions() {
  //delete old list of states
  for (i = stateSelector.length - 1; i > 0; i--) { //mandatory to begin by last item as an item is deleted on each loop
    stateSelector.options[i].remove();
  }
  //print new options under selector, based on stateList (global variable)
  for (var i = 0; i < stateList.length; i++) {
    var op = document.createElement("option");
    op.textContent = stateList[i];
    stateSelector.appendChild(op);
  }
}

// ================================
// Scroll to top button
// ================================
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    $('.btn-warning').css("display", "block");
  } else {
    $('.btn-warning').css("display", "none");
  }
}

$('#buttonTop').click(() => {
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.body.scrollTop = 0; // For Safari
});