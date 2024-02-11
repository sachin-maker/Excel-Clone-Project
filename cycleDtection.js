
let colletedGraphComponent=[];

let graphComponentsMatrix = [];

// for (let i = 0;i < rows;i++) {
//     let row = [];
//     for (let j = 0;j < column;j++) {
//         row.push([]);
//     }
//     graphComponentsMatrix.push(row);
// }

function isGraphCyclic(graphComponentsMatrix) {  // Cycle detection in Directed graph algorithm
    let visited = [];  // Keep track of visited vertex( node )
    let dfsVisited = [];  // Keep track of visited vertex( node ) in dfs call

    for (let i = 0;i < rows;i++) {

        let visitedRow = [];
        let dfsVisitedRow = [];

        for (let j = 0;j < column;j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0;i < rows;i++) {
        for (let j = 0;j < column;j++) {

            if (visited[i][j] == false) {
                if (cyclicDFS(graphComponentsMatrix, i, j, visited, dfsVisited) == true) {
                    return  [i,j];
                        // srcr: i,
                        // srcc: j
                    // Returns cycle path src point for color tracking
                }
            }
        }
    }

    return null;
}

function cyclicDFS(graphComponentsMatrix, srcr, srcc, graphVisited, dfsVisited) {
    graphVisited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    for (let children = 0;children < graphComponentsMatrix[srcr][srcc].length;children++) {
        let [crid,ccid] = graphComponentsMatrix[srcr][srcc][children];
        // let nbrr = neighbour[0];
        // let nbrc = neighbour[1];
 
        if (graphVisited[crid][ccid] == false) {
            if (cyclicDFS(graphComponentsMatrix, crid, ccid, graphVisited, dfsVisited) == true) {
                return true;
            }
        }
        else if (dfsVisited[crid][ccid] == true) {  // If visited in both dfs call path and in graph vertex visited, then cycle exists
            return true;
        }
    }

    dfsVisited[srcr][srcc] = false;  // Backtrack by unvisiting dfs path
    return false;
}