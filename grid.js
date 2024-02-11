let rows=100;
let column=26;

let addressColCont =document.querySelector(".address-col-cont");
let addressRowCont =document.querySelector(".address-row-cont");
let cellsCont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar");

for(let i=0;i<rows;i++){
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<column;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65 + i );
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowCount=document.createElement("div");
    rowCount.setAttribute("class","row-container")
    for(let j=0;j<column;j++){
     let cell =document.createElement("div");
     cell.setAttribute("class","cell");
     cell.setAttribute("contenteditable","true");
     cell.setAttribute("spellcheck","false");

     // for cell and storage identification
     cell.setAttribute("rid",i);
     cell.setAttribute("cid",j);


     rowCount.appendChild(cell);
     addListenerForAddressDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCount);
}

function addListenerForAddressDisplay(cell,i,j){
  cell.addEventListener("click" , (e) => {
      let rowID = i +1;
      let columnID=String.fromCharCode(65 + j );
      addressBar.value =`${columnID}${rowID}`;
  })
}

