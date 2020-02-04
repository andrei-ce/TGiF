//Select where to insert all data - in this case tbody
  // Loop through all members in array
    //Create new <tr> for every member until i<number of members
      //Loop through all data to be inserted (5 in total - the columns)
      //Create <td>
      //Insert data in <td>
      //Append <td> to <tr> 
    //}
  //Append <tr> to Table
//}  

const mySenateMembers = dataSenate113.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

let tBody = document.getElementById("senate-data");

for (let i=0; i< mySenateMembers.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      if (j==0) {
        let newAnchorTag = document.createElement("a");
        newAnchorTag.setAttribute("href",mySenateMembers[i].url);
        newAnchorTag.innerHTML = mySenateMembers[i][dataInserted];
        if (j==0 && mySenateMembers[i].middle_name != null) {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mySenateMembers[i].middle_name} ${mySenateMembers[i].last_name}`;
        } else {
          newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${mySenateMembers[i].last_name}`;
        }
        newTd.appendChild(newAnchorTag);
      }
      else {
        newTd.innerHTML = mySenateMembers[i][dataInserted];
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}
