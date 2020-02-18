// ===================================================================
// GLOBAL VARIABLES
// ===================================================================
let republicanMembers = [];
let democratMembers = [];
let independentMembers = [];
let memberListSorted = [];
let fieldsLoyalty = ["first_name", "votes_with_party_abs", "votes_with_party_pct"];
let fieldsAttendance = ["first_name", "missed_votes", "missed_votes_pct"];
let stats = {};
let loader = document.querySelectorAll('.loader');

// ===================================================================
// URL WINDOW READER
// ===================================================================
let url = window.location.pathname.split("/").pop();
let chamber;
let localName;
if (url === "senate_att.html" || url === "senate_loyalty.html") {
  chamber = "https://api.propublica.org/congress/v1/113/senate/members.json";
  localName = "dataSenate";
} else if (url === "house_att.html" || url === "house_loyalty.html") {
  chamber = "https://api.propublica.org/congress/v1/113/house/members.json";
  localName = "dataHouse";
}

// ==========================================================================
// FETCH DATA & INITIALIZE ACCORDING TO HTML WINDOW LOCATION & LOCAL STORAGE
// ==========================================================================
if (!localStorage[localName]) {
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
    localStorage.setItem(localName, JSON.stringify(data.results[0].members));
    var originalMembers = JSON.parse(localStorage.getItem(localName));
    loader.forEach(l => l.style.display = 'none');
    init(originalMembers);                                        //initialization
  }).catch(function (error) {
    console.log("Request failed: " + error.message);
  });
} else {
  init(JSON.parse(localStorage.getItem(localName)));             //else, initialization
  loader.forEach(l => l.style.display = 'none');
}

//INITIALIZATION DEPENDS ON ATTENDANCE/LOYALTY
function init(members) {
  if (url.split("_").pop() === "att.html") {
    generatePartyLists(members);
    setStats();
    printDataAtGlance(members);
    generateLeastAndMost(members, "least", "descending", "missed_votes_pct", fieldsAttendance); //list, group, order, stat, fields
    generateLeastAndMost(members, "most", "ascending", "missed_votes_pct", fieldsAttendance);
  } else if (url.split("_").pop() === "loyalty.html") {
    generatePartyLists(members);
    setStats();
    printDataAtGlance(members);
    generateLeastAndMost(members, "least", "ascending", "votes_with_party_pct", fieldsLoyalty); //list, group, order, stat, fields
    generateLeastAndMost(members, "most", "descending", "votes_with_party_pct", fieldsLoyalty);
  }
}

// ===================================================================
// STATISTIC OBJECT FUNCTIONS & PRINT DATA AT GLANCE
// ===================================================================
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

function setStats() {
  stats.republicanTotal = republicanMembers.length;
  stats.democratTotal = democratMembers.length;
  stats.independentTotal = independentMembers.length;
  stats.republicanAvgVotesWithParty = averageVotesWithParty(republicanMembers).toFixed(2);
  stats.democratAvgVotesWithParty = averageVotesWithParty(democratMembers).toFixed(2);
  stats.independentAvgVotesWithParty = averageVotesWithParty(independentMembers).toFixed(2);
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

// ===================================================================
// SORT VARIABLE, SORT ORDER, SELECT MOST&LEAST, ADD VOTES_W_PARTY_ABS
// ===================================================================
function sortMembers(list, order, stat) {
  if (order === "ascending") {
    memberListSorted = list.sort((a, b) => {
      return a[stat] - b[stat];
    })
  }
  else if (order === "descending") {
    memberListSorted = list.sort((a, b) => {
      return b[stat] - a[stat];
    })
  };
}

function generateLeastAndMost(memberList, group, order, stat, fields) {
  sortMembers(memberList, order, stat)
  let orderedMembers = [];
  let repreatCheck = [];
  for (let i = 0; i < memberList.length; i++) {
    if (orderedMembers.length < Math.round(memberList.length * 0.1) || repreatCheck.includes(memberListSorted[i][stat])) {
      orderedMembers.push(memberListSorted[i]);
      repreatCheck.push(memberListSorted[i][stat]);
    }
  }
  orderedMembers.forEach(m => {
    m.votes_with_party_abs = Math.round((m.total_votes - m.missed_votes) * (m.votes_with_party_pct / 100))
  });
  print(orderedMembers, group, fields);
}

// ===================================================================
// PRINT OUTPUTS FROM MOST-LEAST-ARRAYS ON MOST-LEAST-TABLES
// ===================================================================
function print(memberList, where, fields) {
  let table = document.getElementById(where);
  for (let i = 0; i < memberList.length; i++) {
    let newTr = document.createElement("tr");
    for (let j = 0; j < fields.length; j++) {
      let dataInserted = fields[j];
      let newTd = document.createElement("td");
      // if in position j=0 (name), <a href="member.url">name</a> (insert name as innetHTML of atag)
      if (j == 0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href", memberList[i].url);
        newAnchorTag.setAttribute("target", "_blank");
        newAnchorTag.innerHTML = memberList[i][dataInserted];
        if (j == 0 && memberList[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${memberList[i].middle_name} ${memberList[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${memberList[i].last_name}`;
        }
        // <td><a href="member.url">name</a></td>
        newTd.appendChild(newAnchorTag);
      } else if (j === 2) {
        newTd.innerHTML = memberList[i][dataInserted] + '%';
      } else {
        newTd.innerHTML = memberList[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    // <tr><td><a href="member.url">name</a></td></tr>
    table.appendChild(newTr);
  }
}