const senateMembers = data.results[0].members;

createTableAllMembers(senateMembers);

function createTableAllMembers(members) {
  let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
  let tBody = document.getElementById("all-members");

  for (let i = 0; i < members.length; i++) {
    let newTr = document.createElement("tr");
    for (let j = 0; j < fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      // First, middle & last name loop
      if (j == 0) {
        // Anchor tag creation
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href", members[i].url);
        newAnchorTag.setAttribute("target", "_blank");
        newAnchorTag.innerHTML = members[i][dataInserted];
        if (j == 0 && members[i].middle_name != null) {
          fullname = newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].middle_name} ${members[i].last_name}`;
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
