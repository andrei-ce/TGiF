const houseMembers = data.results[0].members;

//Loads initial table
createTable(houseMembers);

//Event listener on checkboxes
let checkBoxGroup = document.getElementsByName("filter");
for (i = 0; i < checkBoxGroup.length; i++) {
  checkBoxGroup[i].addEventListener("click", a => createTable(houseMembers));
}

function createTable(members) {
  membersShowing.innerHTML = "";

  var partiesToShow = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);

  var newBody = document.getElementById("membersShowing");
  let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

  for (let i = 0; i < members.length; i++) {
    if (partiesToShow.includes(members[i].party) || partiesToShow.length < 1) {
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
