let myMembers = data.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

let tBody = document.getElementById("house-data");

for (let i=0; i< myMembers.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      newTd.innerHTML = myMembers[i][dataInserted]
      if (j==0 && myMembers[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].middle_name} ${myMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}