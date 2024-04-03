import {html, Component, render, useState, useEffect} from "./js_libs/htm-preact.min.js";

import "./js_libs/shim.min.js";
import "./js_libs/xlsx.min.js";

function sheet2arr(sheet)
{
    const result = [];
    let row;
    let row_num;
    let col_num;
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for(row_num = range.s.r; row_num <= range.e.r; row_num++) {
        row = [];
        for(col_num = range.s.c; col_num <= range.e.c; col_num++)
        {
            const nextCell = sheet
            [
                XLSX.utils.encode_cell({ r: row_num, c: col_num })
            ];
            if(typeof nextCell === 'undefined') 
            {
                row.push(void 0);
            } else 
            {
                row.push(nextCell.w);
            }
        }
        result.push(row);
    }
    return result;
}

function App() 
{
    const [sheets, setSheets] = useState(null);
    const [currentSheet, setCurrentSheet] = useState(null);

    useEffect(() => {
        loadFile();
    }, []);

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function loadFile() 
    {
        const req = new XMLHttpRequest();
        req.open('GET', './price.xlsx', true);
        req.responseType = 'arraybuffer';
        req.onload = function(e) {
            const workBook = XLSX.read(req.response, { type:'array' });
            const allSheets = Object.keys(workBook.Sheets).map((sheet) => 
            {
                return {
                    sheet: sheet,
                    rows: sheet2arr(workBook.Sheets[sheet])
                        .filter(row => row[1] && isNumber(row[1]))
                        .map(row => {
                            row[1] = +row[1];
                            return row;
                        }),
                };
            });
            setSheets(allSheets);
            setCurrentSheet(allSheets[0]);
        }
        req.send();
    }

    if(!currentSheet) 
    {
        return 'Загрузка...';
    } else 
    {
        return html`
            <div>
                <ul>
                    ${sheets.map(sheet => html`<li><button onClick=${() => setCurrentSheet(sheet)}>${sheet.sheet}</button></li>`)}
                </ul>
                <ul>
                    ${currentSheet.rows.map(row => html`<li>
                        ${row[0]} -	${row[1]}
                    </li>`)}
                </ul>
            </div>
        `;
    }
}

render(html`<${app}/>`, document.body);
