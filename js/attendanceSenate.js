const senateMembers = data.results[0].members;

//****** CREATE LIST FOR EACH PARTY */
//initialize new array lists with name of parties
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
//go through all members in senate
for (let i = 0; i < senateMembers.length; i++) {
  //if party === republican, push to republicanMembers array list
  if (senateMembers[i].party === "R") {
    republicanMembers.push(senateMembers[i]);
  } else if (senateMembers[i].party === "D") {
    democratMembers.push(senateMembers[i]);
  } else {
    independentMembers.push(senateMembers[i]);
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
  independentTotal: independentMembers.length,
  republicanAvgVotesWithParty: averageVotesWithParty(republicanMembers).toFixed(2),
  democratAvgVotesWithParty: averageVotesWithParty(democratMembers).toFixed(2),
  independentAvgVotesWithParty: averageVotesWithParty(independentMembers).toFixed(2)
};

createDataAtGlance();

//****** SHOW STATS AT SENATE AT GLANCE TABLE*/
function createDataAtGlance() {
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
  newTd.innerHTML = senateMembers.length;
  totalAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = (
    (stats.republicanTotal * stats.republicanAvgVotesWithParty +
      stats.democratTotal * stats.democratAvgVotesWithParty +
      stats.independentTotal * stats.independentAvgVotesWithParty) /
    senateMembers.length
  ).toFixed(2);
  totalAtGlance.appendChild(newTd);
}
//****** 10% LEAST & MOST ENGAGED*/
// create sorted list by missed votes in percentage
let senateMembersSorted = senateMembers.sort((a, b) => {
  return b.missed_votes_pct - a.missed_votes_pct;
});

// create least and most engaged lists
let leastEngaged = [];
let missedVotesLeastEngaged = [];
for (let i = 0; i < senateMembers.length; i++) {
  // add members until it reaches (current sum of missed_votes_pct)/ <= 10% of members
  if (leastEngaged.length < Math.round(senateMembers.length * 0.1) || missedVotesLeastEngaged.includes(senateMembersSorted[i].missed_votes_pct)) {
    leastEngaged.push(senateMembersSorted[i]);
    missedVotesLeastEngaged.push(senateMembersSorted[i].missed_votes_pct);
  }
}

let mostEngaged = [];
let missedVotesMostEngaged = [];
for (let i = senateMembers.length - 1; i >= 0; i--) {
  // add members until it reaches (current sum of missed_votes_pct)/ >= 10% of members
  if (mostEngaged.length < Math.round(senateMembers.length * 0.1) || missedVotesMostEngaged.includes(senateMembersSorted[i].missed_votes_pct)) {
    mostEngaged.push(senateMembersSorted[i]);
    missedVotesMostEngaged.push(senateMembersSorted[i].missed_votes_pct);
  }
}

// create HTML table and show these members
let fieldsInserted = ["first_name", "missed_votes", "missed_votes_pct"];

// append variables to HTML elements & ultimately to table
let tBody2 = document.getElementById("senate-least-engaged");
for (let i = 0; i < leastEngaged.length; i++) {
  let newTr = document.createElement("tr");
  for (let j = 0; j < fieldsInserted.length; j++) {
    let dataInserted = fieldsInserted[j];
    let newTd = document.createElement("td");
    // if in position j=0 (name), <a href="member.url">name</a> (insert name as innetHTML of atag)
    if (j == 0) {
      let newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", leastEngaged[i].url);
      newAnchorTag.innerHTML = leastEngaged[i][dataInserted];
      if (j == 0 && leastEngaged[i].middle_name != null) {
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
for (let i = 0; i < mostEngaged.length; i++) {
  let newTr = document.createElement("tr");
  for (let j = 0; j < fieldsInserted.length; j++) {
    let dataInserted = fieldsInserted[j];
    let newTd = document.createElement("td");
    if (j == 0) {
      let newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", mostEngaged[i].url);
      newAnchorTag.innerHTML = mostEngaged[i][dataInserted];
      if (j == 0 && mostEngaged[i].middle_name != null) {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostEngaged[i].middle_name} ${mostEngaged[i].last_name}`;
      } else {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mostEngaged[i].last_name}`;
      }
      newTd.appendChild(newAnchorTag);
    } else {
      newTd.innerHTML = mostEngaged[i][dataInserted];
    }
    newTr.appendChild(newTd);
  }
  tBody3.appendChild(newTr);
}
