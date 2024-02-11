let sheetsFolderCont = document.querySelector(".sheet-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icons");


addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFloder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFloder.length);
    sheet.innerHTML = `
    <div class="sheet-content">Sheet${allSheetFloder.length + 1}</div>
    ` ;

    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();

})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button !==2) return;

        let allSheetFloder = document.querySelectorAll(".sheet-folder");
        if(allSheetFloder.length===1){
            alert("you must have atleast one sheet !!");
            return;
        }
        let response= confirm("Your sheet remove permantly ,are you sure ?")
        if(response===false) return;

        let sheetIdx = Number(sheet.getAttribute("id"));

        collectedSheetDB.splice(sheetIdx,1);
        colletedGraphComponent.splice(sheetIdx,1);
        handleSheetUIRemoval(sheet);
        

        sheetDB=collectedSheetDB[0];
        graphComponentsMatrix=colletedGraphComponent[0];
        handleSheetProperties();

    })
}

function handleSheetUIRemoval(sheet){

    sheet.remove();
    let allSheetFloder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFloder.length;i++){
        allSheetFloder[i].setAttribute("id",i);
        let sheetContent =allSheetFloder[i].querySelector(".sheet-content");
        sheetContent.innerText =`Sheet${i+1}`;
        allSheetFloder[i].style.backgroundColor="transparent";
    }
    allSheetFloder[0].style.backgroundColor="#079992";
}


function handleSheetDB(sheetIdx) {

    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentsMatrix = colletedGraphComponent[sheetIdx];

}

function handleSheetUI(sheet){
    let allSheetFloder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFloder.length;i++){
        allSheetFloder[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor="#079992";
}

function handleSheetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);

    })
}

function createSheetDB() {
    let sheetDB = [];

    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < column; j++) {
            let cellProp = {
                value:0,
                bold: false,
                italic: false,
                underline: false,
                align: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                bgColor: "#000000",
                value: "",
                formula: "",
                children: []
            };
            sheetRow.push(cellProp);

        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponentsMatrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < column; j++) {
            row.push([]);
        }
        graphComponentsMatrix.push(row);
    }
    colletedGraphComponent.push(graphComponentsMatrix);

}