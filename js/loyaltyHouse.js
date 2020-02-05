const houseMembers = data.results[0].members;

//****** CREATE LIST FOR EACH PARTY */
//initialize new array lists with name of parties
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
//go through all members in senate
for (let i = 0; i < houseMembers.length; i++) {
  //if party === republican, push to republicanMembers array list
  if (houseMembers[i].party === "R") {
    republicanMembers.push(houseMembers[i]);
  } else if (houseMembers[i].party === "D") {
    democratMembers.push(houseMembers[i]);
  } else {
    independentMembers.push(houseMembers[i]);
  }
}

//****** AVERAGE VOTED_WITH_PARTY FOR ANY PARTY ARRAY*/
function averageVotesWithParty(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].votes_with_party_pct;
  }
  average = sum / arr.length;
  return average;
}

//****** STORE STATS INSIDE OBJECT*/
let stats = {
  republicanTotal: republicanMembers.length,
  democratTotal: democratMembers.length,
  independentTotal: "--",
  republicanAvgVotesWithParty: averageVotesWithParty(republicanMembers).toFixed(2),
  democratAvgVotesWithParty: averageVotesWithParty(democratMembers).toFixed(2),
  independentAvgVotesWithParty: "--"
};

let dataAtGlance = ["", "", "", "", "", ""]; //maybe loop through the data needed in the "at glance" table?

//****** SHOW STATS AT SENATE AT GLANCE TABLE*/
let repAtGlance = document.getElementById("rep-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.republicanTotal;
repAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.republicanAvgVotesWithParty;
repAtGlance.appendChild(newTd);

let demAtGlance = document.getElementById("dem-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.democratTotal;
demAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.democratAvgVotesWithParty;
demAtGlance.appendChild(newTd);

let indAtGlance = document.getElementById("ind-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.independentTotal;
indAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = stats.independentAvgVotesWithParty;
indAtGlance.appendChild(newTd);

let totalAtGlance = document.getElementById("total-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = houseMembers.length;
totalAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center";
newTd.innerHTML = (
  (stats.republicanTotal * stats.republicanAvgVotesWithParty + stats.democratTotal * stats.democratAvgVotesWithParty) /
  houseMembers.length
).toFixed(2);
totalAtGlance.appendChild(newTd);

// create sorted list by least votes_with_party
let houseMembersSorted = houseMembers.sort((a, b) => {
  return b.votes_with_party_pct - a.votes_with_party_pct;
});

// create least and most engaged lists
let leastLoyal = [];
let againstVotesLeastLoyal = [];
for (let i = 0; i < houseMembers.length; i++) {
  // add members until it reaches (current sum of votes_with_party_pct)/ <= 10% of members
  if (leastLoyal.length < Math.round(houseMembers.length * 0.1) || againstVotesLeastLoyal.includes(houseMembersSorted[i].votes_with_party_pct)) {
    leastLoyal.push(houseMembersSorted[i]);
    againstVotesLeastLoyal.push(houseMembersSorted[i].votes_with_party_pct);
  }
}

let mostLoyal = [];
let againstVotesMostLoyal = [];
for (let i = houseMembers.length - 1; i >= 0; i--) {
  // add members until it reaches (current sum of votes_with_party_pct) >= 10% of members
  if (mostLoyal.length < Math.round(houseMembers.length * 0.1) || againstVotesMostLoyal.includes(houseMembersSorted[i].votes_with_party_pct)) {
    mostLoyal.push(houseMembersSorted[i]);
    againstVotesMostLoyal.push(houseMembersSorted[i].votes_with_party_pct);
  }
}

// create HTML table and show these members
let fieldsInserted = ["first_name", "missed_votes", "votes_with_party_pct"];

// append variables to HTML elements & ultimately to table
let tBody2 = document.getElementById("house-least-loyal");
for (let i = 0; i < leastLoyal.length; i++) {
  let newTr = document.createElement("tr");
  for (let j = 0; j < fieldsInserted.length; j++) {
    let dataInserted = fieldsInserted[j];
    let newTd = document.createElement("td");
    // if in position j=0 (name), <a href="member.url">name</a> (insert name as innetHTML of atag)
    if (j == 0) {
      let newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", leastLoyal[i].url);
      newAnchorTag.innerHTML = leastLoyal[i][dataInserted];
      if (j == 0 && leastLoyal[i].middle_name != null) {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastLoyal[i].middle_name} ${leastLoyal[i].last_name}`;
      } else {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastLoyal[i].last_name}`;
      }
      // <td><a href="member.url">name</a></td>
      newTd.appendChild(newAnchorTag);
    }
    // <td>name</td>
    else {
      newTd.innerHTML = leastLoyal[i][dataInserted];
    }
    newTr.appendChild(newTd);
  }
  // <tr><td><a href="member.url">name</a></td></tr>
  tBody2.appendChild(newTr);
}

let tBody3 = document.getElementById("house-most-loyal");
for (let i = 0; i < mostLoyal.length; i++) {
  let newTr = document.createElement("tr");
  for (let j = 0; j < fieldsInserted.length; j++) {
    let dataInserted = fieldsInserted[j];
    let newTd = document.createElement("td");
    if (j == 0) {
      let newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", mostLoyal[i].url);
      newAnchorTag.innerHTML = mostLoyal[i][dataInserted];
      if (j == 0 && mostLoyal[i].middle_name != null) {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostLoyal[i].middle_name} ${mostLoyal[i].last_name}`;
      } else {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostLoyal[i].last_name}`;
      }
      newTd.appendChild(newAnchorTag);
    } else {
      newTd.innerHTML = mostLoyal[i][dataInserted];
    }
    newTr.appendChild(newTd);
  }
  tBody3.appendChild(newTr);
}
