const houseMembers = data.results[0].members;

//Loads initial table
printTable(houseMembers, ["D", "R", "I"]);

//Event listener on checkboxes
let checkBoxGroup = document.getElementsByName("filter");
checkBoxGroup.forEach(checkbox => checkbox.addEventListener("click", () => applyFilters()))

function applyFilters() {
  let checkBoxFilters = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);
  printTable(houseMembers, checkBoxFilters)
}

function printTable(members, filter1) {
  membersShowing.innerHTML = "";

  let newBody = document.getElementById("membersShowing");
  let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

  for (let i = 0; i < members.length; i++) {
    if (filter1.includes(members[i].party) || filter1.length < 1) {
      let newTr = document.createElement("tr");
      for (let j = 0; j < fieldsInserted.length; j++) {
        let dataInserted = fieldsInserted[j];
        let newTd = document.createElement("td");
        if (j == 0) {
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
      newBody.appendChild(newTr);
    }
  }
}
