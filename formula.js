

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < column; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activecell, cellProp] = activeCell(address);
            let enteredData = activecell.innerText;

            if (enteredData === cellProp.value) return;
            cellProp.value = enteredData;
            //    console.log(cellProp);
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;

    if (e.key === "Enter" && formulaBar.value) {

        //if change in formula
        let address = addressBar.value;
        let [cell, cellProp] = activeCell(address);
        if (inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);

        addChildToGraphComponent(inputFormula, address);

        let cycleResponse = isGraphCyclic(graphComponentsMatrix);
        if (cycleResponse){


           let response= confirm("your formula is cyclic. Wanna trace your path!!");
           while(response==true){
           await  isGraphCyclicTracePath(graphComponentsMatrix,cycleResponse);
             response= confirm("your formula is cyclic. Wanna trace your path!!");
           }
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }


        let evaluteformula = evaluteFormula(inputFormula);
        setCellUIAndCellProp(evaluteformula, inputFormula, address);
        addChildToFormula(inputFormula);
        updateChildrenCells(address);
    }
})

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = activeCell(parentAddress);

    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let { childCell, childCellProp } = activeCell(childAddress);

        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluteFormula(childFormula);

        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);

    }

}

function addChildToFormula(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}


function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function evaluteFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodeFormula = encodedFormula.join(" ");
    return eval(decodeFormula);
}


function setCellUIAndCellProp(evaluteFormula, formula, address) {

    let [cell, cellProp] = activeCell(address);

    cell.innerText = evaluteFormula;
    cellProp.value = evaluteFormula;
    cellProp.formula = formula;
}

function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddressed(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddressed(encodedFormula[i]);

            graphComponentsMatrix[prid][pcid].push([crid, ccid]);

        }
    }
}

function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddressed(childAddress);
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddressed(encodedFormula[i]);

            graphComponentsMatrix[prid][pcid].pop();

        }
    }

}

