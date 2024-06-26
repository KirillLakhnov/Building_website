import button_add_to_card from "./generate_button_add_to_card.js";

const STATUS_DELIVERY = {MYSELF: 0, CDEK: 1};

export default function buy_products(total_price, div_shopping_cart_modal_window, location_info)
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
        <input type=\"text\" name=\"name\" id=\"name\" placeholder=\"ФИО\">\
        <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"E-mail\">\
        <input type=\"text\" name=\"phone\" id=\"phone\" placeholder=\"Телефон\">\
    ";
    div_shopping_cart_modal_window.append(form_contatiner);

    let div_label_type_shipment = document.createElement("div");
    div_label_type_shipment.className = "label_type_shipment";
    div_label_type_shipment.innerHTML = "\
        <label><input type=\"checkbox\" class=\"check\" id=\"check_myself\"><p><strong>Заберу самостоятельно</strong></p></label>\
        <label><input type=\"checkbox\" class=\"check\" id=\"check_CDEK\"><p><strong>Доставка до дома</strong></p></label>\
    ";
    form_contatiner.append(div_label_type_shipment);

    let check_CDEK = document.getElementById("check_CDEK");
    let check_myself = document.getElementById("check_myself");

    let check_CDEK_status = 0;
    let check_myself_status = 0;

    check_CDEK.addEventListener("change", function () 
    {
        if (this.checked) {
            check_CDEK_status = 1;

            if (check_myself_status == 1)
            {
                check_myself.checked = 0;
            }

            let div_cdek = document.createElement("div");
            div_cdek.className = "cdek_send";
            div_cdek.setAttribute("id", "cdek_send");
            div_cdek.innerHTML = "\
                <input type=\"text\" name=\"city\" id=\"city\" placeholder=\"Город\">\
                <input type=\"text\" name=\"address\" id=\"address\" placeholder=\"Адрес\">\
            ";
            div_label_type_shipment.after(div_cdek);

        } else {
            check_CDEK_status = 0;
            form_contatiner.removeChild(document.getElementById("cdek_send"));
        }
    })
    check_myself.addEventListener("change", function () 
    {
        if (this.checked) 
        {
            check_myself_status = 1;

            if (check_CDEK_status == 1)
            {
                check_CDEK.checked = 0;
                let div_cdek = document.getElementById("cdek_send");
                if (div_cdek)
                {
                    form_contatiner.removeChild(div_cdek);
                }
            }
        } 
        else 
        {
            check_myself_status = 0;
        }
    })

    let submit_button = document.createElement("input");
    submit_button.className = "submit_button";
    submit_button.setAttribute("type", "submit");
    form_contatiner.append(submit_button);

    form_contatiner.addEventListener("submit", function(event)
    {
        event.preventDefault();
        if(validation_form(form_contatiner, div_shopping_cart_modal_window, check_CDEK_status) == true)
        {
            processing_form_data(form_contatiner, div_shopping_cart_modal_window, location_info);
            transfer_data_to_seller(form_contatiner, location_info);

            while (localStorage.length != 0)
            {
                const key = localStorage.key(0);
                const product_obj = JSON.parse(localStorage.getItem(key));
                localStorage.removeItem(key);
                        
                let prev_button_div = document.getElementById("info-price-" + product_obj.product[1]);  
                if (prev_button_div != null)
                {
                    prev_button_div.removeChild(document.getElementById("buttons_num_" + product_obj.product[1]));
                    button_add_to_card(product_obj.product, prev_button_div, 0);
                }
            }
        }
    })
}

async function processing_form_data(form, div_shopping_cart_modal_window, location_info)
{
    let products_in_card = local_storage_processing(localStorage.length);
    let products_in_card_json = JSON.stringify(products_in_card);

    let form_data = new FormData(form);
    form_data.append("products_in_card", products_in_card_json)

    div_shopping_cart_modal_window.classList.add("sending");
    let response = await fetch(location_info + "php/sendmail.php", {
        method: "POST",
        body: form_data,
    });
    if (response.ok)
    {
        div_shopping_cart_modal_window.classList.remove("sending"); 
        alert("Заказ отправлен на обработку");
        document.body.removeChild(document.getElementById("modal_win"));
    }
    else
    {
        div_shopping_cart_modal_window.classList.remove("sending");
        alert("Ошибка, попробуйте еще раз");
        form.reset();
    }
}

function validation_form(form, parent_form, check_CDEK_status)
{
    let return_value = true;

    let form_data = new FormData(form);

    const name  = form_data.get("name");
    const email = form_data.get("email");
    const phone = form_data.get("phone");

    let input_name  = document.getElementById("name");
    let input_email = document.getElementById("email");
    let input_phone = document.getElementById("phone");
    
    if (document.getElementById("validation_info") != null)
    {
        document.getElementById("validation_info").remove();
    }

    let div_validation_info = document.createElement("div");
    div_validation_info.className = "validation_info";
    div_validation_info.setAttribute("id", "validation_info");
    div_validation_info.innerHTML = "";
    parent_form.append(div_validation_info);

    if(name == "")
    {
        input_name.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ИМЯ. ";
        return_value = false;
    }
    else
    {
        input_name.setAttribute("style", "border: 2px solid #585e5b");
    }
    if(email == "")
    {
        input_email.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ EMAIL. ";
        return_value = false;
    }
    else
    {
        input_email.setAttribute("style", "border: 2px solid #585e5b");
    }
    if(phone == "")
    {
        input_phone.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕЛЕФОН. ";
        return_value = false;
    }
    else
    {
        input_phone.setAttribute("style", "border: 2px solid #585e5b");
    }
    if(check_CDEK_status == 1)
    {
        const city    = form_data.get("city");
        const address = form_data.get("address");

        let input_city    = document.getElementById("city");
        let input_address = document.getElementById("address");

        if(city == "")
        {
            input_city.setAttribute("style", "border: 3px solid #c36464");

            div_validation_info.innerHTML += "ВВЕДИТЕ ГОРОД. ";
            return_value = false;
        }
        else
        {
            input_city.setAttribute("style", "border: 2px solid #585e5b");
        }
        if(address == "")
        {
            input_address.setAttribute("style", "border: 3px solid #c36464");

            div_validation_info.innerHTML += "ВВЕДИТЕ АДРЕС. ";
            return_value = false;
        }
        else
        {
            input_address.setAttribute("style", "border: 2px solid #585e5b");
        }
    }

    return return_value;
}

async function transfer_data_to_seller(form, location_info)
{
    let products = local_storage_processing(localStorage.length);
    let body = new FormData(form);
    body.append("products_in_card", JSON.stringify(products))

    let response = await fetch(location_info + "php/transfer_data_to_seller.php", {
        method: "POST",
        body: body,
    });
    if (!(response.ok))
    {
        alert("Ошибка: " + response.status);
    }
}

function local_storage_processing(fields_count)
{
    let products = [];

    for (let i = 0; i < fields_count; i++)
    {
        const key = localStorage.key(i);
        const product_obj = JSON.parse(localStorage.getItem(key));
        
        products.push(product_obj);
    }

    return products;
}