const senateMembers = data.results[0].members;
let partySelector = document.querySelectorAll('input[type=checkbox]');
let stateSelector = document.querySelector('#stateSelector');
let selectedState = "";
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
let newBody = document.getElementById("membersShowing");
let noResults = document.querySelector('#noResults');
let stateList = [];
let membersFilteredByParty = senateMembers;
let membersFilteredByState = [];

init();

function init() {
  printTable(senateMembers);
  generateStateList(senateMembers);
  printSelectOptions();
  setupPartyListener();
  setupStateListener();
}

function setupStateListener() {
  stateSelector.addEventListener("input", function () { filterState(membersFilteredByParty) });
}

function setupPartyListener() {
  partySelector.forEach(box => box.addEventListener("click", function () { filterParty(senateMembers) }
  ));
}

function filterState(members) { //THIS IS THE SECOND FILTER (using membersFilteredByParty), in the script order
  var selectedState = stateSelector.value;
  membersFilteredByState = [];
  if (!selectedState) {
    filterParty(senateMembers);
  } else {
    for (var i = 0; i < members.length; i++) {
      if (members[i].state === selectedState) {
        membersFilteredByState.push(members[i]);
      }
    }
    printTable(membersFilteredByState);
    generateStateList(membersFilteredByParty);
  }
}

function filterParty(members) {  //THIS IS THE FIRST FILTER (using senateMembers), in the script order
  //read party filter values
  var partyValues = [...(document.querySelectorAll('input[name=filter]:checked'))].map(x => x.value);
  //delete default value (default value for case user begins filtering by state)
  membersFilteredByParty = [];
  //read new inputs from checkboxes and call the function printTable with them
  for (i = 0; i < members.length; i++) {
    if (partyValues.length < 1 || partyValues.includes(members[i].party)) {
      membersFilteredByParty.push(members[i]);
    }
  }
  generateStateList(membersFilteredByParty);
  printSelectOptions();
  printTable(membersFilteredByParty);
  newBody.rows.length < 1 ? noResults.style.display = 'block' : noResults.style.display = 'none';
  console.log("filterParty() run")
}

function printTable(members) {
  //delete old table
  newBody.innerHTML = "";
  //pick first member i => checks if his/her party is selected in partiesToShow => creates and fills rows and cells 
  // => if first td, and middle name not null, go into the middle name loop (and add URL)
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
      } else if (j == 4) {
        newTd.textContent = members[i][dataInserted] + "%";
      } else {
        newTd.innerHTML = members[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    newBody.appendChild(newTr);
  }
}

function generateStateList(members) {
  //delete previous list
  stateList = [];
  for (var i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state)) {
      stateList.push(members[i].state);
    }
  }
  stateList.sort();
}

function printSelectOptions() {
  //delete old print (has to start from bottom otherwise error.)
  for (i = stateSelector.length - 1; i > 0; i--) {
    stateSelector.options[i].remove();
  }
  //print new options based on stateList
  for (var i = 0; i < stateList.length; i++) {
    var op = document.createElement("option");
    op.textContent = stateList[i];
    stateSelector.appendChild(op);
  }
}