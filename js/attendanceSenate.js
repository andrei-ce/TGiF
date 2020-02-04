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

let totalAtGlance = document.getElementById("total-at-glance");
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = mySenateMembers.length;
totalAtGlance.appendChild(newTd);
var newTd = document.createElement("td");
newTd.className = "text-center"
newTd.innerHTML = (((stats.republicanTotal * stats.republicanAvgVotesWithParty)+(stats.democratTotal * stats.democratAvgVotesWithParty)+(stats.independentTotal * stats.independentAvgVotesWithParty))/ 
mySenateMembers.length).toFixed(2);
totalAtGlance.appendChild(newTd);

//****** 10% LEAST & MOST ENGAGED*/
// create sorted list by missed votes in percentage
let mySenateMembersSorted = mySenateMembers.sort((a,b) => {
  return b.missed_votes_pct - a.missed_votes_pct;
});

// create least and most engaged lists
let leastEngaged = [];
let missedVotesLeastEngaged = [];
for (let i = 0; i < mySenateMembers.length; i++) {
// add members until it reaches (current sum of missed_votes_pct)/(total missed votes) <= 10%
  if (leastEngaged.length < Math.round(mySenateMembers.length * 0.1)
      || missedVotesLeastEngaged.includes(mySenateMembersSorted[i].missed_votes_pct)) {
    leastEngaged.push(mySenateMembersSorted[i]);
    missedVotesLeastEngaged.push(mySenateMembersSorted[i].missed_votes_pct);
  }
}

let mostEngaged  = [];
let missedVotesMostEngaged = [];
for (let i = mySenateMembers.length - 1; i >= 0; i--) {
// add members until it reaches (current sum of missed_votes_pct)/(total missed votes) >= 10%
  if (mostEngaged.length < Math.round(mySenateMembers.length * 0.1)
      || missedVotesMostEngaged.includes(mySenateMembersSorted[i].missed_votes_pct)) {
    mostEngaged.push(mySenateMembersSorted[i]);
    missedVotesMostEngaged.push(mySenateMembersSorted[i].missed_votes_pct);
  }
}

// create HTML table and show these members
let fieldsInserted = ["first_name", "missed_votes", "missed_votes_pct"];

// append variables to HTML elements & ultimately to table
let tBody2 = document.getElementById("senate-least-engaged");
for (let i=0; i< leastEngaged.length; i++) {
  let newTr = document.createElement("tr");
    for (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
// if in position j=0 (name), <a href="member.url">name</a> (insert name as innetHTML of atag)
      if (j==0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href",leastEngaged[i].url);
        newAnchorTag.innerHTML = leastEngaged[i][dataInserted];
        if (j==0 && leastEngaged[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastEngaged[i].middle_name} ${leastEngaged[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastEngaged[i].last_name}`;
        }
// <td><a href="member.url">name</a></td>
        newTd.appendChild(newAnchorTag);
      }
// <td>name</td>
      else {
        newTd.innerHTML = leastEngaged[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
// <tr><td><a href="member.url">name</a></td></tr>
  tBody2.appendChild(newTr);
}

let tBody3 = document.getElementById("senate-most-engaged");
for (let i=0; i< mostEngaged.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      if (j==0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href",mostEngaged[i].url);
        newAnchorTag.innerHTML = mostEngaged[i][dataInserted];
        if (j==0 && mostEngaged[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostEngaged[i].middle_name} ${mostEngaged[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostEngaged[i].last_name}`;
        }
        newTd.appendChild(newAnchorTag);
      }
      else {
        newTd.innerHTML = mostEngaged[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
  tBody3.appendChild(newTr);
}

//****** 10% LEAST & MOST VOTES WITH PARTY*/

//create sorted list by votes_with_party in percentage
// let mySenateMembersSorted2 = mySenateMembers.sort((a,b) => {
//   return b.votes_with_party_pct - a.votes_with_party_pct;
// });

