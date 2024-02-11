let collectedSheetDB =[];

let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icons");
    addSheetBtn.click();
    // handleSheetProperties();
}

// for (let i = 0; i < rows; i++) {
//     let sheetRow = [];
//     for (let j = 0; j < column; j++) {
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             align: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             bgColor: "#000000",
//             value :"",
//             formula:"",
//             children:[]
//         };
//         sheetRow.push(cellProp);

//     }
//     sheetDB.push(sheetRow);
// }

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underlined");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".color-font-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// let addressBar=document.querySelector(".address-bar");
let activeColorProp = "#079992";
let inactiveColorProp = "#dfe4ea"


bold.addEventListener("click", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "Normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})
italic.addEventListener("click", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "Normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underline.addEventListener("click", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);

    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;

})
fontFamily.addEventListener("change", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;

})
fontColor.addEventListener("change", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;

})
bgColor.addEventListener("change", (e) => {
    let addressed = addressBar.value;
    let [cell, cellProp] = activeCell(addressed);

    cellProp.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;

})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let addressed = addressBar.value;
        let [cell, cellProp] = activeCell(addressed);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;

            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar=document.querySelector(".formula-bar");
        formulaBar.value=cellProp.formula;
        cell.innerText = cellProp.value;
    })
})

let allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);

}


function activeCell(addressed) {
    let [rid, cid] = decodeRIDCIDFromAddressed(addressed);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}
function decodeRIDCIDFromAddressed(addressed) {
    let rid = Number(addressed.slice(1) - 1);
    let cid = Number(addressed.charCodeAt(0)) - 65;
    return [rid, cid];
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let addressedd = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddressed(addressedd);
        let cellProp = sheetDB[rid][cid];

        cell.style.fontWeight = cellProp.bold ? "bold" : "Normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "Normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor==="#000000" ? "transparent" : cellProp.value;
        cell.style.textAlign = cellProp.alignment;


        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;

        switch (cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;

            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;

            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        let formulaBar=document.querySelector(".formula-bar");
        formulaBar.value=cellProp.formula;
        cell.innerText=cellProp.value;


    })
}