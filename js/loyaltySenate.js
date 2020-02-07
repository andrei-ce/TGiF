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
let senateStats = {
  republicanTotal: republicanMembers.length,
  democratTotal: democratMembers.length,
  independentTotal: independentMembers.length,
  republicanAvgVotesWithParty: averageVotesWithParty(republicanMembers).toFixed(2),
  democratAvgVotesWithParty: averageVotesWithParty(democratMembers).toFixed(2),
  independentAvgVotesWithParty: averageVotesWithParty(independentMembers).toFixed(2)
};

printSenateAtGlance(senateStats);
//****** SHOW STATS AT SENATE AT GLANCE TABLE*/
function printSenateAtGlance(stats) {
  let repAtGlance = document.getElementById("rep-at-glance");
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.republicanTotal;
  repAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.republicanAvgVotesWithParty + '%';
  repAtGlance.appendChild(newTd);

  let demAtGlance = document.getElementById("dem-at-glance");
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.democratTotal;
  demAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.democratAvgVotesWithParty + '%';
  demAtGlance.appendChild(newTd);

  let indAtGlance = document.getElementById("ind-at-glance");
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.independentTotal;
  indAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = stats.independentAvgVotesWithParty + '%';
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
  ).toFixed(2) + '%';
  totalAtGlance.appendChild(newTd);

}

// create sorted list by least votes_with_party
let senateMembersSorted = senateMembers.sort((a, b) => {
  return a.votes_with_party_pct - b.votes_with_party_pct;
});

// create least and most engaged lists
let leastLoyal = [];
let againstVotesLeastLoyal = [];
for (let i = 0; i < senateMembers.length; i++) {
  // add members until it reaches (current sum of votes_with_party_pct)/ <= 10% of members
  if (leastLoyal.length < Math.round(senateMembers.length * 0.1) || againstVotesLeastLoyal.includes(senateMembersSorted[i].votes_with_party_pct)) {
    leastLoyal.push(senateMembersSorted[i]);
    againstVotesLeastLoyal.push(senateMembersSorted[i].votes_with_party_pct);
  }
}
// add votes with party in absolute value, as a key in each member object
leastLoyal.forEach(m => {
  m.votes_with_party_abs = Math.round((m.total_votes - m.missed_votes) * (m.votes_with_party_pct / 100))
});

let mostLoyal = [];
let againstVotesMostLoyal = [];
for (let i = senateMembers.length - 1; i >= 0; i--) {
  // add members until it reaches (current sum of votes_with_party_pct) >= 10% of members
  if (mostLoyal.length < Math.round(senateMembers.length * 0.1) || againstVotesMostLoyal.includes(senateMembersSorted[i].votes_with_party_pct)) {
    mostLoyal.push(senateMembersSorted[i]);
    againstVotesMostLoyal.push(senateMembersSorted[i].votes_with_party_pct);
  }
}
// add votes with party in absolute value, as a key in each member object
mostLoyal.forEach(m => {
  m.votes_with_party_abs = Math.round((m.total_votes - m.missed_votes) * (m.votes_with_party_pct / 100))
});

// create HTML table and show these members
let fieldsInserted = ["first_name", "votes_with_party_abs", "votes_with_party_pct"];

// append variables to HTML elements & ultimately to table
let tBody2 = document.getElementById("senate-least-loyal");
for (let i = 0; i < leastLoyal.length; i++) {
  let newTr = document.createElement("tr");
  for (let j = 0; j < fieldsInserted.length; j++) {
    let dataInserted = fieldsInserted[j];
    let newTd = document.createElement("td");
    // if in position j=0 (name), <a href="member.url">name</a> (insert name as innetHTML of atag)
    if (j === 0) {
      let newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", leastLoyal[i].url);
      newAnchorTag.innerHTML = leastLoyal[i][dataInserted];
      if (j === 0 && leastLoyal[i].middle_name != null) {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastLoyal[i].middle_name} ${leastLoyal[i].last_name}`;
      } else {
        newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${leastLoyal[i].last_name}`;
      }
      newTd.appendChild(newAnchorTag);
    }
    else if (j === 2) {
      newTd.innerHTML = leastLoyal[i][dataInserted] + '%';
    } else {
      newTd.innerHTML = leastLoyal[i][dataInserted];
    }
    newTr.appendChild(newTd);
  }
  tBody2.appendChild(newTr);
}

let tBody3 = document.getElementById("senate-most-loyal");
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
    } else if (j === 2) {
      newTd.innerHTML = mostLoyal[i][dataInserted] + '%';
    } else {
      newTd.innerHTML = mostLoyal[i][dataInserted];
    }
    newTr.appendChild(newTd);
  }
  tBody3.appendChild(newTr);
}
