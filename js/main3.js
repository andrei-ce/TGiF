const mySenateMembers = dataSenate113.results[0].members;

//****** CREATE LIST FOR EACH PARTY */
//initialize new array lists with name of parties
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
//go through all members in senate
for (let i = 0; i < mySenateMembers.length; i++) {
//if party === republican, push to republicanMembers array list
  if (mySenateMembers[i].party === "R") {
    republicanMembers.push(mySenateMembers[i]);
  } else if (mySenateMembers[i].party === "D") {
    democratMembers.push(mySenateMembers[i]);
  } else {
    independentMembers.push(mySenateMembers[i]);
  }
}

//****** AVERAGE VOTED_WITH_PARTY FOR ANY PARTY ARRAY*/
function averageVotesWithParty(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
  sum += arr[i].votes_with_party_pct;
}
  average = sum/arr.length;
  return average;
}

//****** STORE STATS INSIDE OBJECT*/
let stats = {
  "republicanTotal": republicanMembers.length,
  "democratTotal": democratMembers.length,
  "independentTotal": independentMembers.length,
  "republicanAvgVotesWithParty": averageVotesWithParty(republicanMembers).toFixed(2),
  "democratAvgVotesWithParty": averageVotesWithParty(democratMembers).toFixed(2),
  "independentAvgVotesWithParty": averageVotesWithParty(independentMembers).toFixed(2),
}

let dataAtGlance = ["","","","","",""] //maybe loop through the data needed in the "at glance" table?

//****** SHOW STATS AT SENATE AT GLANCE TABLE*/
let repAtGlance = document.getElementById("rep-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.republicanTotal;
repAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.republicanAvgVotesWithParty;
repAtGlance.appendChild(newTd);

let demAtGlance = document.getElementById("dem-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.democratTotal;
demAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.democratAvgVotesWithParty;
demAtGlance.appendChild(newTd);

let indAtGlance = document.getElementById("ind-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.independentTotal;
indAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = stats.independentAvgVotesWithParty;
indAtGlance.appendChild(newTd);

// let indAtGlance = document.getElementById("ind-at-glance");
// var newTd = document.createElement("td");
// newTd.className = "text-center"
// newTd.innerHTML = stats.independentTotal;
// indAtGlance.appendChild(newTd);
// var newTd = document.createElement("td");
// newTd.className = "text-center"
// newTd.innerHTML = stats.independentAvgVotesWithParty;
// indAtGlance.appendChild(newTd);
//****** CALCULATE NUMBER 10% LEAST ENGAGED*/

// create sorted list by missed votes in percentage
let mySenateMembersSorted = mySenateMembers.sort((a,b) => {
  return b.missed_votes_pct - a.missed_votes_pct;
});

// create least and most engaged lists
let leastEngaged = [];
for (let i = 0; i < mySenateMembers.length; i++) {
// add members until it reaches (current sum of missed_votes_pct)/(total missed votes) <= 10%
  if (leastEngaged.length < (mySenateMembers.length * 0.1)) {
    leastEngaged.push(mySenateMembersSorted[i]);
  }
}

let mostEngaged  = [];
for (let i = mySenateMembers.length - 1; i >= 0; i--) {
// add members until it reaches (current sum of missed_votes_pct)/(total missed votes) <= 10%
  if (mostEngaged.length < (mySenateMembers.length * 0.1)) {
    mostEngaged.push(mySenateMembersSorted[i]);
  }
}

// create HTML table and show these members

let fieldsInserted = ["first_name", "missed_votes", "missed_votes_pct"];

let tBody2 = document.getElementById("senate-least-engaged");
for (let i=0; i< leastEngaged.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      newTd.innerHTML = leastEngaged[i][dataInserted]
      if (j==0 && leastEngaged[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${leastEngaged[i].middle_name} ${leastEngaged[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${leastEngaged[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody2.appendChild(newTr);
}

let tBody3 = document.getElementById("senate-most-engaged");
for (let i=0; i< mostEngaged.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      newTd.innerHTML = mostEngaged[i][dataInserted]
      if (j==0 && mostEngaged[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${mostEngaged[i].middle_name} ${mostEngaged[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${mostEngaged[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody3.appendChild(newTr);
}