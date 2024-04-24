import button_add_to_card from "./generate_button_add_to_card.js";
import buy_products from "./generate_payment.js";

export default function generate_shopping_cart(location_info)
{
    let div_shopping_cart_modal = document.createElement("div");
    div_shopping_cart_modal.className = "shopping_cart_modal";
    div_shopping_cart_modal.setAttribute("id", "modal_win");
    document.body.append(div_shopping_cart_modal);

    let div_shopping_cart_modal_window = document.createElement("div");
    div_shopping_cart_modal_window.className = "shopping_cart_modal_window";
    div_shopping_cart_modal.append(div_shopping_cart_modal_window);

    let button_close = document.createElement("button");
    button_close.className = "btn_close";
    button_close.innerHTML = "x";
    button_close.onclick = () => document.body.removeChild(div_shopping_cart_modal);
    div_shopping_cart_modal_window.append(button_close);

    let h2 = document.createElement("h2");
    h2.innerHTML = "Корзина " + "<small><i class=\"fa-solid fa-cart-shopping\"></i></small>";
    div_shopping_cart_modal_window.append(h2);

    const fields_count = localStorage.length;
    const products = local_storage_processing(fields_count);

    let ul_shopping_cart = document.createElement("ul");
    ul_shopping_cart.className = "ul_shopping_cart";
    div_shopping_cart_modal_window.append(ul_shopping_cart);

    for (let i = 0; i < fields_count; i++)
    {
        let li_shopping_cart = document.createElement("li");
        li_shopping_cart.className = "li_shopping_cart";
        li_shopping_cart.setAttribute("id", products[i].product[1]);
        ul_shopping_cart.append(li_shopping_cart);

        let div_image = document.createElement("div");
        div_image.className = "image_shopping_cart";
        div_image.innerHTML = "<img src=\"../../" + products[i].product[4] + "\" alt=\"\">";
        li_shopping_cart.append(div_image);

        let div_info = document.createElement("div");
        div_info.className = "info_shopping_cart";
        div_info.innerHTML = "<h3>" + products[i].product[1] + "</h3>";
        li_shopping_cart.append(div_info);

        let div_quantity_change = document.createElement("div");
        div_quantity_change.className = "quantity_change";
        li_shopping_cart.append(div_quantity_change);

        let button_plus = document.createElement("button");
        button_plus.innerHTML = "<h3>+</h3>";
        button_plus.onclick = () => {
            product_quantity_measurement(products[i], 1); 
            number_product.innerHTML = products[i].number + "шт";
            span_price.innerHTML = total_price_count(products, fields_count) + "<small> ₽</small>";

            let number_product_elements = document.getElementsByClassName("number_product_" + products[i].product[1]);
            for (let i = 0; i < number_product_elements.length; i++)
            {
                number_product_elements[i].innerHTML = products[i].number + "шт";
            }

            if_total_price_zero(products, fields_count, div_info_total_price, span_price);
        };
        div_quantity_change.append(button_plus);

        let number_product = document.createElement("h3");
        number_product.innerHTML = products[i].number + "шт";
        div_quantity_change.append(number_product);

        let button_minus = document.createElement("button");
        button_minus.innerHTML = "<h3>-</h3>";
        button_minus.onclick = () => {
            product_quantity_measurement(products[i], -1); 
            number_product.innerHTML = products[i].number  + "шт";
            span_price.innerHTML = total_price_count(products, fields_count) + "<small> ₽</small>";

            let number_product_elements = document.getElementsByClassName("number_product_" + products[i].product[1]);
            for (let i = 0; i < number_product_elements.length; i++)
            {
                number_product_elements[i].innerHTML = products[i].number + "шт";
            }

            if (products[i].number <= 0)
            {
                ul_shopping_cart.removeChild(document.getElementById(products[i].product[1]));
                localStorage.removeItem(JSON.stringify(products[i].product[1]));

                let info_price_add_to_card_out = document.getElementById("info-price-" + products[i].product[1]);
                let button_add_to_card_out = document.getElementById("buttons_num_" + products[i].product[1]);
                if (button_add_to_card_out != null)
                {
                    info_price_add_to_card_out.removeChild(button_add_to_card_out);
                    button_add_to_card(products[i].product, info_price_add_to_card_out, 0);
                }
            }

            if_total_price_zero(products, fields_count, div_info_total_price, span_price);
        };
        div_quantity_change.append(button_minus);
    }

    let total_price = total_price_count(products, fields_count);

    let div_info_total_price = document.createElement("div");
    let span_price = document.createElement("h3");
    let button_price = document.createElement("button");

    if (total_price == 0)
    {
        div_info_total_price.className = "info_total_price_no";
        div_info_total_price.innerHTML = "<h3>Вы ничего пока что не выбрали</h3>"; 
        div_shopping_cart_modal_window.append(div_info_total_price);
    }
    else
    {
        div_info_total_price.className = "info_total_price";
        div_shopping_cart_modal_window.append(div_info_total_price);
    
        span_price.className = "total_price";
        span_price.innerHTML = total_price + "<small> ₽</small>";
        div_info_total_price.append(span_price);
    
        button_price.className = "buy_btn";
        button_price.setAttribute("id", "buy_btn");
        button_price.innerHTML = "<h3>Купить</h3>";
        button_price.onclick = () => buy_products(total_price, div_shopping_cart_modal_window, location_info);
        div_info_total_price.append(button_price);
    }
}

function if_total_price_zero(products, fields_count, div_info_total_price, span_price)
{
    if (total_price_count(products, fields_count) == 0)
    {
        div_info_total_price.removeChild(document.getElementById("buy_btn"));
        div_info_total_price.className = "info_total_price_no";
        span_price.innerHTML = "";
        div_info_total_price.innerHTML = "<h3>Вы ничего пока что не выбрали</h3>";
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

function total_price_count(products, fields_count)
{
    let total_price = 0;

    for (let i = 0; i < fields_count; i++)
    {
        total_price += (+products[i].product[2])*(+products[i].number);
    }
    return total_price;
}

function product_quantity_measurement(product_obj, change_number)
{
    product_obj.number += change_number;
    
    localStorage.setItem(JSON.stringify(product_obj.product[1]), JSON.stringify(product_obj));
}