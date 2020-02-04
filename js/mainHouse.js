const myHouseMembers = dataHouse113.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

let tBody = document.getElementById("house-data");

for (let i=0; i< myHouseMembers.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      if (j==0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href",myHouseMembers[i].url);
        newAnchorTag.innerHTML = myHouseMembers[i][dataInserted];
        if (j==0 && myHouseMembers[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${myHouseMembers[i].middle_name} ${myHouseMembers[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${myHouseMembers[i].last_name}`;
        }
        newTd.appendChild(newAnchorTag);
      }
      else {
        newTd.innerHTML = myHouseMembers[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}