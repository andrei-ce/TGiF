// document.getElementById("id");
// element.innerHTML;
// document.createElement("p");
// element.appendChild(node);
// element.setAttribute("name", "value");

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
      newTd.innerHTML = mySenateMembers[i][dataInserted]
      if (j==0 && mySenateMembers[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${mySenateMembers[i].middle_name} ${mySenateMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${mySenateMembers[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}
