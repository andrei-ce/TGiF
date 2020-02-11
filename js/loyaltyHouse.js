const houseMembers = data.results[0].members;
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
let memberListSorted = [];
let leastLoyal = [];
let mostLoyal = [];
let leastLoyalHouse = document.getElementById("house-least-loyal");
let mostLoyalHouse = document.getElementById("house-most-loyal");
let fieldsInserted = ["first_name", "votes_with_party_abs", "votes_with_party_pct"];
let stats = {};

init(houseMembers);

function init(members) {
  generatePartyLists(members);
  setStats();
  printDataAtGlance();
  sortMembers(members);
  generateLeastLoyal(members);
  printLeastLoyal();
  generateMostLoyal(members);
  printMostLoyal();
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
    return a.votes_with_party_pct - b.votes_with_party_pct;
  });
}

function generateLeastLoyal(memberList) {
  let votesWithPartyLeastLoyal = [];
  for (let i = 0; i < memberList.length; i++) {
    // add members until it reaches (current sum of votes_with_party_pct)/ <= 10% of members
    if (leastLoyal.length < Math.round(memberList.length * 0.1) || votesWithPartyLeastLoyal.includes(memberListSorted[i].votes_with_party_pct)) {
      leastLoyal.push(memberListSorted[i]);
      votesWithPartyLeastLoyal.push(memberListSorted[i].votes_with_party_pct);
    }
  }
  leastLoyal.forEach(m => {
    m.votes_with_party_abs = Math.round((m.total_votes - m.missed_votes) * (m.votes_with_party_pct / 100))
  });
}

function generateMostLoyal(memberList) {
  let votesWithPartyMostLoyal = [];
  for (let i = memberList.length - 1; i >= 0; i--) {
    // add members until it reaches (current sum of votes_with_party_pct)/ >= 10% of members
    if (mostLoyal.length < Math.round(memberList.length * 0.1) || votesWithPartyMostLoyal.includes(memberListSorted[i].votes_with_party_pct)) {
      mostLoyal.push(memberListSorted[i]);
      votesWithPartyMostLoyal.push(memberListSorted[i].votes_with_party_pct);
    }
  }
  mostLoyal.forEach(m => {
    m.votes_with_party_abs = Math.round((m.total_votes - m.missed_votes) * (m.votes_with_party_pct / 100))
  });
}

function printLeastLoyal() {
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
      else if (j === 2) {
        newTd.innerHTML = leastLoyal[i][dataInserted] + '%';
      } else {
        newTd.innerHTML = leastLoyal[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    // <tr><td><a href="member.url">name</a></td></tr>
    leastLoyalHouse.appendChild(newTr);
  }
}

function printMostLoyal() {
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
    mostLoyalHouse.appendChild(newTr);
  }
}