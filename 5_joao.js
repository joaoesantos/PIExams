function listenerOnHeading(th, colIdx) {
    let sortBy = Object.keys(dataSource[0])[colIdx];
    th.addEventListener("click",function(){
        dataSource = dataSource.sort((a,b) => {
            if(a[sortBy] > b[sortBy]){
                return 1;
            }

            if(a[sortBy] < b[sortBy]){
                return -1;
            }

            return 0;
        });
    });
}


function renderInput(td, rowIdx, colIdx) {
    td.innerHTML = `<input type='text' value='${dataSource[rowIdx][Object.keys(dataSource[0])[colIdx]]}'>`
    td
    .querySelector("input")
    .addEventListener("click", (ev) => { 
    ev.preventDefault()
    const val =  td.querySelector("input").value
    td.innerHTML = val
    const item = dataSource[rowIdx]
    const prop = Object.keys(dataSource[0])[colIdx]
    const backup = item[prop]
    item[prop] = isNaN(val) ? val : Number(val)
    listenerOnData(td, rowIdx, colIdx)
    const options = {
        method: PUT,
        headers: new Headers().append('Content-Type', 'application/json'),
        body: JSON.stringify(item),
    }
    const path = url
    const resp = await fetch(path, options)
    if (resp.status != 200 ) {
        alert(resp.message);
        td.innerHTML = backup;
    }
    })
    }