//GLOBAL VARIABLES
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
let memberListSorted = [];
let leastLoyal = [];
let mostLoyal = [];
let fieldsLoyalty = ["first_name", "votes_with_party_abs", "votes_with_party_pct"];
let stats = {};
let leastLoyalTable = document.getElementById("least-loyal");
let mostLoyalTable = document.getElementById("most-loyal");
let loader = document.querySelectorAll('.loader');

//URL WINDOW READER
let url = window.location.pathname.split("/").pop();
let chamber;
if (url === "senate_att.html" || url === "senate_loyalty.html") {
  chamber = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (url === "house_att.html" || url === "house_loyalty.html") {
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
  generatePartyLists(members);
  setStats();
  printDataAtGlance(members);
  sortMembersPartyVotes(members);
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

function printDataAtGlance(members) {
  let dataAtGlance = document.querySelector('#dataAtGlance');
  //Republicans row
  var newTr = document.createElement("tr");
  var newTd1 = document.createElement("td");
  newTd1.textContent = "Republicans";
  var newTd2 = document.createElement("td");
  newTd2.className = "text-center";
  newTd2.innerHTML = stats.republicanTotal;
  var newTd3 = document.createElement("td");
  newTd3.className = "text-center";
  newTd3.innerHTML = stats.republicanAvgVotesWithParty + '%';
  newTr.appendChild(newTd1);
  newTr.appendChild(newTd2);
  newTr.appendChild(newTd3);
  dataAtGlance.appendChild(newTr);
  //Democrats row
  var newTr = document.createElement("tr");
  var newTd1 = document.createElement("td");
  newTd1.textContent = "Democrats";
  var newTd2 = document.createElement("td");
  newTd2.className = "text-center";
  newTd2.innerHTML = stats.democratTotal;
  var newTd3 = document.createElement("td");
  newTd3.className = "text-center";
  newTd3.innerHTML = stats.democratAvgVotesWithParty + '%';
  newTr.appendChild(newTd1);
  newTr.appendChild(newTd2);
  newTr.appendChild(newTd3);
  dataAtGlance.appendChild(newTr);
  //Independent row
  var newTr = document.createElement("tr");
  var newTd1 = document.createElement("td");
  newTd1.textContent = "Independent";
  var newTd2 = document.createElement("td");
  newTd2.className = "text-center";
  if (!independentMembers.length) {
    newTd2.textContent = "--";
  } else { newTd2.textContent = stats.independentTotal };
  newTd2.innerHTML = '--';
  var newTd3 = document.createElement("td");
  newTd3.className = "text-center";
  if (!independentMembers.length) {
    newTd3.textContent = "--";
  } else { newTd3.textContent = stats.independentAvgVotesWithParty + '%' };
  newTr.appendChild(newTd1);
  newTr.appendChild(newTd2);
  newTr.appendChild(newTd3);
  dataAtGlance.appendChild(newTr);
  //Total row
  var newTr = document.createElement("tr");
  var newTd1 = document.createElement("td");
  newTd1.textContent = "TOTAL";
  var newTd2 = document.createElement("td");
  newTd2.className = "text-center";
  newTd2.innerHTML = members.length;
  var newTd3 = document.createElement("td");
  newTd3.className = "text-center";
  if (!independentMembers.length) {
    newTd3.textContent = ((stats.republicanTotal * stats.republicanAvgVotesWithParty + stats.democratTotal * stats.democratAvgVotesWithParty) / members.length).toFixed(2) + '%'
  } else { newTd3.innerHTML = ((stats.republicanTotal * stats.republicanAvgVotesWithParty + stats.democratTotal * stats.democratAvgVotesWithParty + stats.independentTotal * stats.independentAvgVotesWithParty) / members.length).toFixed(2) + '%'; }
  newTr.appendChild(newTd1);
  newTr.appendChild(newTd2);
  newTr.appendChild(newTd3);
  dataAtGlance.appendChild(newTr);
}

//----> Possibly make a sort function that takes ascending or descending as argument (then for loop is same in both cases)
function sortMembersPartyVotes(memberList) {
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
    for (let j = 0; j < fieldsLoyalty.length; j++) {
      let dataInserted = fieldsLoyalty[j];
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
    leastLoyalTable.appendChild(newTr);
  }
}

function printMostLoyal() {
  for (let i = 0; i < mostLoyal.length; i++) {
    let newTr = document.createElement("tr");
    for (let j = 0; j < fieldsLoyalty.length; j++) {
      let dataInserted = fieldsLoyalty[j];
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
    mostLoyalTable.appendChild(newTr);
  }
}