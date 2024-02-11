
function colorTrackPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve();
        }, 1000);
    });
}


async function isGraphCyclicTracePath(graphComponentsMatrix, traceSrcPoint) {  // Cycle detection in Directed graph algorithm
    if (!traceSrcPoint) {
        return;
    }

    let [srcr, srcc] = traceSrcPoint;

    let graphVisited = [];  // Keep track of visited vertex( node )
    let dfsVisited = [];  // Keep track of visited vertex( node ) in dfs call

    for (let i = 0;i < rows;i++) {
        let graphRow = [];
        let dfsRow = [];
        for (let j = 0;j < column;j++) {
            graphRow.push(false);
            dfsRow.push(false);
        }
        graphVisited.push(graphRow);
        dfsVisited.push(dfsRow);
    }

    let isCyclic = await cyclicDFSTracePath(graphComponentsMatrix, srcr, srcc, graphVisited, dfsVisited);
    
    if (isCyclic == true) {
        return new Promise((resolve, reject) => resolve(true));
    }

    return new Promise((resolve, reject) => resolve(false));
}


async function cyclicDFSTracePath(graphComponentsMatrix, srcr, srcc, graphVisited, dfsVisited) {


    graphVisited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    // console.log(`${String.fromCharCode(65 + srcc)}${srcr+1}`);

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);

    cell.style.backgroundColor = "lightblue";
    await colorTrackPromise();

    for (let i = 0;i < graphComponentsMatrix[srcr][srcc].length;i++) {
        let neighbour = graphComponentsMatrix[srcr][srcc][i];
        let nbrr = neighbour[0];
        let nbrc = neighbour[1];

        if (graphVisited[nbrr][nbrc] == false) {
            let isCyclic = await cyclicDFSTracePath(graphComponentsMatrix, nbrr, nbrc, graphVisited, dfsVisited);
            if (isCyclic == true) {
                cell.style.backgroundColor = "lightgreen";
                 await colorTrackPromise();   // Returns a promise for slow tracking, with setTimeout usage
                cell.style.backgroundColor = "transparent";
                return new Promise((resolve, reject) => resolve(true));
            }
        }
        else if (dfsVisited[nbrr][nbrc] == true) {  // If visited in both dfs call path and in graph vertex visited, then cycle exists
            let Cycliccell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            Cycliccell.style.backgroundColor = "lightsalmon";    // To highlight the position where cycle formed
             await colorTrackPromise();   // Returns a promise for slow tracking, with setTimeout usage
            Cycliccell.style.backgroundColor = "lightblue";

            cell.style.backgroundColor = "lightgreen";
             await colorTrackPromise();   // Returns a promise for slow tracking, with setTimeout usage
            cell.style.backgroundColor = "transparent";

            return new Promise((resolve, reject) => resolve(true));
        }
    }

    dfsVisited[srcr][srcc] = false;  // Backtrack by unvisiting dfs path
    return new Promise((resolve, reject) => resolve(false));
}