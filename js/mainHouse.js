const houseMembers = data.results[0].members;

createTableAllMembers(houseMembers);

function createTableAllMembers(members) {
  let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
  let tBody = document.getElementById("all-members");

  for (let i = 0; i < members.length; i++) {
    let newTr = document.createElement("tr");
    for (let j = 0; j < fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      if (j == 0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href", members[i].url);
        newAnchorTag.innerHTML = members[i][dataInserted];
        if (j == 0 && members[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].middle_name} ${members[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].last_name}`;
        }
        newTd.appendChild(newAnchorTag);
      } else {
        newTd.innerHTML = members[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
    tBody.appendChild(newTr);
  }
}
