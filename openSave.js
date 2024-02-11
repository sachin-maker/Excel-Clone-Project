let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

downloadBtn.addEventListener("click", (e) => {
    let jsonData = JSON.stringify([sheetDB, graphComponentsMatrix]);
  
    let file = new Blob([jsonData], { type: "application/json" });
  
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "sheetData.json";
    a.click();
  });

  openBtn.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
  
    input.addEventListener("change", (e) => {
      let fr = new FileReader();
      let files = input.files;
      let fileObj = files[0];
  
      fr.readAsText(fileObj);
      fr.addEventListener("load", (e) => {
        let readSheetData = JSON.parse(fr.result);
        addSheetBtn.click();
        sheetDB = readSheetData[0];
        graphComponentsMatrix = readSheetData[1];
        collectedSheetDB[collectedSheetDB.length - 1] = sheetDB;
        colletedGraphComponent[colletedGraphComponent.length - 1] =
        graphComponentsMatrix;
        handleSheetProperties();
      });
    });
  });