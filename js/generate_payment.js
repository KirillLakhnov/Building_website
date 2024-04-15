export default function buy_products(total_price, div_shopping_cart_modal_window)
{    
    while(div_shopping_cart_modal_window.hasChildNodes())
    {
        div_shopping_cart_modal_window.removeChild(div_shopping_cart_modal_window.firstChild);
    }

    let button_close = document.createElement("button");
    button_close.className = "btn_close";
    button_close.innerHTML = "x";
    button_close.onclick = () => document.body.removeChild(document.getElementById("modal_win"));
    div_shopping_cart_modal_window.append(button_close);

    let h2 = document.createElement("h2");
    h2.innerHTML = "Оформление заказа " + "<small><i class=\"fa-solid fa-money-check-dollar\"></i></small>";
    div_shopping_cart_modal_window.append(h2);

    let form_contatiner = document.createElement("form");
    form_contatiner.className = "contatiner_form_payment";
    form_contatiner.innerHTML = "\
        <input type=\"text\" class=\"name\" placeholder=\"ФИО\">\
        <input type=\"email\" class=\"mail\" placeholder=\"E-mail\">\
        <input type=\"text\" class=\"phone\" placeholder=\"Телефон\">\
    ";
    div_shopping_cart_modal_window.append(form_contatiner);

    let div_label_type_shipment = document.createElement("div");
    div_label_type_shipment.className = "label_type_shipment";
    div_label_type_shipment.innerHTML = "\
        <label>Заберу самостоятельно<input type=\"checkbox\" id=\"check_myself\"></label>\
        <label>Доставка CDEK<input type=\"checkbox\" id=\"check_CDEK\"></label>\
    ";
    form_contatiner.append(div_label_type_shipment);

    let check_CDEK = document.getElementById("check_CDEK");
    let check_myself = document.getElementById("check_myself");

    let check_CDEK_status = 0;
    let check_myself_status = 0;

    check_CDEK.addEventListener("change", function () {
        if (this.checked) {
            check_CDEK_status = 1;

            if (check_myself_status == 1)
            {
                check_myself.checked = 0;
            }

            let div_cdek = document.createElement("div");
            div_cdek.className = "cdeck_send";
            div_cdek.setAttribute("id", "cdeck_send");
            div_cdek.innerHTML = "\
                <input type=\"text\" class=\"city\" placeholder=\"Город\">\
                <input type=\"text\" class=\"address\" placeholder=\"Адрес\">\
            ";
            div_label_type_shipment.after(div_cdek);
            console.log(form_contatiner);
        } else {
            check_CDEK_status = 0;
            form_contatiner.removeChild(document.getElementById("cdeck_send"));
        }
    })
    check_myself.addEventListener("change", function () {
        if (this.checked) {
            check_myself_status = 1;

            if (check_CDEK_status == 1)
            {
                check_CDEK.checked = 0;
                let div_cdek = document.getElementById("cdeck_send");
                if (div_cdek)
                {
                    form_contatiner.removeChild(div_cdek);
                }
            }
        } else {
            check_myself_status = 0;
        }
    })

    let submit_button = document.createElement("input");
    submit_button.className = "submit_button";
    submit_button.setAttribute("type", "submit");
    form_contatiner.append(submit_button);

    //доавить бекэнд
}

function remove_cdeck_send(div_shopping_cart_modal_window)
{
    div_shopping_cart_modal_window.removeChild(document.getElementById("cdeck_send"));
}