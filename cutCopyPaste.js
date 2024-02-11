let ctrKey;
document.addEventListener("keydown", (e) => {
    ctrKey = e.ctrlKey;
})

document.addEventListener("keyup", (e) => {
    ctrKey = e.ctrlKey;
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let copyBtn = document.querySelector(".copy")
let cutBtn = document.querySelector(".cut")
let pasteBtn = document.querySelector(".paste")



let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {

        if (!ctrKey) return;
        if (rangeStorage.length >= 2) {
            defaultSelectedCellUI();
            rangeStorage = [];
        }

        cell.style.border = "3px solid #4cd137";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));

        rangeStorage.push([rid, cid]);


    })
}

function defaultSelectedCellUI() {
    for (let i = 0; i < rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);

        cell.style.border = "1px solid lightgrey";


    }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
    if (rangeStorage < 2) return;
    copyData = [];
    let strow = rangeStorage[0][0];
    let stcol = rangeStorage[0][1];
    let endrow = rangeStorage[1][0];
    let endcol = rangeStorage[1][1];

    for (let i = strow; i <= endrow; i++) {
        let copyRow = [];
        for (let j = stcol; j <= endcol; j++) {

            let  {...cellProp} = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    defaultSelectedCellUI();

})

cutBtn.addEventListener("click", (e) => {
    if (rangeStorage < 2) return;
    copyData = [];
    copyBtn.click();


    let strow = rangeStorage[0][0];
    let stcol = rangeStorage[0][1];
    let endrow = rangeStorage[1][0];
    let endcol = rangeStorage[1][1];

    for (let i = strow; i <= endrow; i++) {

        for (let j = stcol; j <= endcol; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            //DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = "14";
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.bgcolor = "#000000";
            cellProp.alignment = "left";

            cell.click();

        }
    }
    
    defaultSelectedCellUI();
})

pasteBtn.addEventListener("click", (e) => {
    if (rangeStorage < 2) return;

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    let address = addressBar.value;

    let [stRow, stCol] = decodeRIDCIDFromAddressed(address);

    for (let i = stRow,r = 0; i <= stRow+rowDiff; i++,r++) {

        for (let j = stCol, c = 0; j <= stCol+colDiff ; j++,c++) {

            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell) continue;

            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.bgcolor = data.bgcolor;
            cellProp.alignment = data.alignment;

            cell.click();

        }
    }
    

})