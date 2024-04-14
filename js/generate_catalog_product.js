import "./js_libs/xlsx.min.js";
import button_add_to_card from "./generate_button_add_to_card.js";

/**
 * generate_product_page(i) - гененерирует каталог товаров, определенной группы, 
 *                            которые выбираются с помощью параметра "i". 
 */
export default function generate_product_page(index) 
{
    const req = new XMLHttpRequest();
    req.open('GET', '../../catalog.xlsx', true);
    req.responseType = 'arraybuffer';
    req.send();
    req.onload = function() 
    {
        //Обработка базы данных представленной в виде xlsx-файла.
        const workBook = XLSX.read(req.response, {type:'array'});
        const allSheets = Object.keys(workBook.Sheets).map((sheet) => 
        {
            return {
                sheet: sheet,
                rows: sheet2arr(workBook.Sheets[sheet])
            };
        });
        const current_sheet = allSheets[index];

        //Генерирует карточки товаров по данным из базы данных.
        let i = 0;
        while (typeof current_sheet.rows[i] != "undefined")
        {
            const col = i;
               
            let button_product = document.createElement("button");
            button_product.className = "product";
            button_product.setAttribute("id", "button_product" + current_sheet.rows[i][2]);
            button_product.onclick = () => product_card(current_sheet.rows[col]);
            container.append(button_product);

            let div_image = document.createElement("div");
            div_image.className = "image";
            div_image.innerHTML = "<img src=\"../../" + current_sheet.rows[i][5] + "\" alt=\"\">";
            button_product.append(div_image);

            let div_info = document.createElement("div");
            div_info.className = "info";
            div_info.innerHTML = "<h3>" + current_sheet.rows[i][2] + "</h3>";
            button_product.append(div_info);

            let div_price = document.createElement("div");
            div_price.className = "info-price";
            div_price.setAttribute("id", "info-price-" + current_sheet.rows[i][2]);
            div_info.append(div_price);

            let span_price = document.createElement("span");
            span_price.className = "price";
            span_price.innerHTML = current_sheet.rows[i][3] + "<small> ₽/</small>шт";
            div_price.append(span_price);

            button_add_to_card(current_sheet.rows[i], div_price, 0);

            i++;
        }
    }
}

/**
 * sheet2arr(sheet) - обрабатывает данные выбранного листа из базы данных.
 * Возвращается: двумерный массив данных (таблица).
 **/
function sheet2arr(sheet)
{
    const result = [];
    let row;
    let row_num;
    let col_num;
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for(row_num = range.s.r + 1; row_num <= range.e.r; row_num++) 
    {
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
            } 
            else 
            {
                row.push(nextCell.w);
            }
        }          
        result.push(row);
    }
    return result;
}

/** 
 * product_page() - генерирует модальное окно с информацией о выбранном товаре.
 **/
function product_card(product)
{
    let div_modal = document.createElement("div");
    div_modal.className = "modal";
    div_modal.setAttribute("id", "modal_win");
    document.body.append(div_modal);

    let div_modal_window = document.createElement("div");
    div_modal_window.className = "modaL_window";
    div_modal.append(div_modal_window);

    let button_close = document.createElement("button");
    button_close.className = "btn_close";
    button_close.innerHTML = "x";
    button_close.onclick = () => document.body.removeChild(document.getElementById("modal_win"));
    div_modal_window.append(button_close);

    let h2 = document.createElement("h2");
    h2.innerHTML = product[2];
    div_modal_window.append(h2);

    let div_general_info = document.createElement("div");
    div_general_info.className = "general_info";
    div_modal_window.append(div_general_info);

    let div_description = document.createElement("div");
    div_description.className = "description_card";
    div_description.innerHTML = "<div class=\"description_card_text\"><h3>Описание</h3><p>" + product[6] + "</p></div>";
    div_general_info.append(div_description);

    let div_image = document.createElement("div");
    div_image.className = "image_card";
    div_image.innerHTML = "<img src=\"../../" + product[5] + "\" alt=\"\">";
    div_description.prepend(div_image);

    let div_characteristic = document.createElement("div");
    div_characteristic.className = "characteristic_card";
    div_characteristic.innerHTML = "<h3>Характеристика</h3><p>" + product[7] + "</p>";
    div_general_info.append(div_characteristic);

    let div_price = document.createElement("div");
    div_price.className = "by_card";
    div_modal_window.append(div_price);

    let span_price = document.createElement("span");
    span_price.className = "price";
    span_price.innerHTML = "<h3>Цена: " + product[3] + "<small> ₽/</small>шт</h3>";
    div_price.append(span_price);

    button_add_to_card(product, div_price, 1);
}