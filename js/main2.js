const myHouseMembers = dataHouse113.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

let tBody = document.getElementById("house-data");

for (let i=0; i< myHouseMembers.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      newTd.innerHTML = myHouseMembers[i][dataInserted]
      if (j==0 && myHouseMembers[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${myHouseMembers[i].middle_name} ${myHouseMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${myHouseMembers[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}