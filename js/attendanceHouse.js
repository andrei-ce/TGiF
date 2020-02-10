const houseMembers = data.results[0].members;
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
let memberListSorted = [];
let leastEngaged = [];
let mostEngaged = [];
let leastEngagedHouse = document.getElementById("house-least-engaged");
let mostEngagedHouse = document.getElementById("house-most-engaged");
let fieldsInserted = ["first_name", "missed_votes", "missed_votes_pct"];
let stats = {};

init(houseMembers);

function init(members) {
  generatePartyLists(members);
  setStats();
  printDataAtGlance();
  sortMembers(members);
  generateLeastEngaged(members);
  printLeastEngaged();
  generateMostEngaged(members);
  printMostEngaged();
}

function setStats() {
  stats.republicanTotal = republicanMembers.length;
  stats.democratTotal = democratMembers.length;
  stats.independentTotal = independentMembers.length;
  stats.republicanAvgVotesWithParty = averageVotesWithParty(republicanMembers).toFixed(2);
  stats.democratAvgVotesWithParty = averageVotesWithParty(democratMembers).toFixed(2);
  stats.independentAvgVotesWithParty = averageVotesWithParty(independentMembers).toFixed(2);
}

function generatePartyLists(memberList) {
  for (let i = 0; i < memberList.length; i++) {
    //if party === republican, push to republicanMembers array list
    if (memberList[i].party === "R") {
      republicanMembers.push(memberList[i]);
    } else if (memberList[i].party === "D") {
      democratMembers.push(memberList[i]);
    } else {
      independentMembers.push(memberList[i]);
    }
  }
}

function averageVotesWithParty(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].votes_with_party_pct;
  }
  average = sum / arr.length;
  return average;
}

//How to refactor/shortenq this?
function printDataAtGlance() {
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
  newTd.innerHTML = '--';
  indAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = '--';
  indAtGlance.appendChild(newTd);

  let totalAtGlance = document.getElementById("total-at-glance");
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = houseMembers.length;
  totalAtGlance.appendChild(newTd);
  var newTd = document.createElement("td");
  newTd.className = "text-center";
  newTd.innerHTML = (
    (stats.republicanTotal * stats.republicanAvgVotesWithParty +
      stats.democratTotal * stats.democratAvgVotesWithParty) /
    houseMembers.length
  ).toFixed(2) + '%';
  totalAtGlance.appendChild(newTd);
}

//----> Possibly make a sort function that takes ascending or descending as argument (then for loop is same in both cases)
function sortMembers(memberList) {
  memberListSorted = memberList.sort((a, b) => {
    return b.missed_votes_pct - a.missed_votes_pct;
  });
}

function generateLeastEngaged(memberList) {
  let missedVotesLeastEngaged = [];
  for (let i = 0; i < memberList.length; i++) {
    // add members until it reaches (current sum of missed_votes_pct)/ <= 10% of members
    if (leastEngaged.length < Math.round(memberList.length * 0.1) || missedVotesLeastEngaged.includes(memberListSorted[i].missed_votes_pct)) {
      leastEngaged.push(memberListSorted[i]);
      missedVotesLeastEngaged.push(memberListSorted[i].missed_votes_pct);
    }
  }
}

function generateMostEngaged(memberList) {
  let missedVotesMostEngaged = [];
  for (let i = memberList.length - 1; i >= 0; i--) {
    // add members until it reaches (current sum of missed_votes_pct)/ >= 10% of members
    if (mostEngaged.length < Math.round(memberList.length * 0.1) || missedVotesMostEngaged.includes(memberListSorted[i].missed_votes_pct)) {
      mostEngaged.push(memberListSorted[i]);
      missedVotesMostEngaged.push(memberListSorted[i].missed_votes_pct);
    }
  }
}

function printLeastEngaged() {
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
      else if (j === 2) {
        newTd.innerHTML = leastEngaged[i][dataInserted] + '%';
      } else {
        newTd.innerHTML = leastEngaged[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    // <tr><td><a href="member.url">name</a></td></tr>
    leastEngagedHouse.appendChild(newTr);
  }
}

function printMostEngaged() {
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
      } else if (j === 2) {
        newTd.innerHTML = mostEngaged[i][dataInserted] + '%';
      } else {
        newTd.innerHTML = mostEngaged[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    mostEngagedHouse.appendChild(newTr);
  }
}