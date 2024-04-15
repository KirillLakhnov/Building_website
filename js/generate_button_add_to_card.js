const ADD_TO_CARD_BUTTON = {OUT: 0, IN: 1};

export default function button_add_to_card(product, prev_div, ADD_TO_CARD_BUTTON_POSITION)
{
    if (+product[4] != 0)
    {
        let product_obj_json = localStorage.getItem(product);

        if (product_obj_json != null)
        {
            let product_obj = JSON.parse(product_obj_json);

            let div_buttons_num = document.createElement("div");
            div_buttons_num.className = "buttons_num";
            if (ADD_TO_CARD_BUTTON_POSITION == ADD_TO_CARD_BUTTON.OUT)
            {
                div_buttons_num.setAttribute("id", "buttons_num_" + product[2]);
            }
            prev_div.append(div_buttons_num);

            let button_plus = document.createElement("button");
            button_plus.className = "add-to-cart";
            button_plus.innerHTML = "<p><strong>+</strong></p>";

            button_plus.onclick = () => {
                product_obj = JSON.parse(localStorage.getItem(product));
                product_obj.number += 1;
                localStorage.setItem(product_obj.product, JSON.stringify(product_obj));

                let number_product_elements = document.getElementsByClassName("number_product_" + product[2]);
                for (let i = 0; i < number_product_elements.length; i++)
                {
                    number_product_elements[i].innerHTML = product_obj.number + "шт";
                }
            }
            div_buttons_num.append(button_plus);

            let number_product = document.createElement("h3");
            number_product.className = "number_product_" + product[2];
            number_product.innerHTML = product_obj.number + "шт";
            div_buttons_num.append(number_product);

            let button_minus = document.createElement("button");
            button_minus.className = "add-to-cart";
            button_minus.innerHTML = "<p><strong>-</strong><p>";
            button_minus.onclick = () => {
                product_obj = JSON.parse(localStorage.getItem(product));
                product_obj.number -= 1;

                if (product_obj.number <= 0)
                {
                    prev_div.removeChild(div_buttons_num);
                    localStorage.removeItem(product_obj.product);

                    button_add_to_card(product, prev_div, ADD_TO_CARD_BUTTON_POSITION);

                    if (ADD_TO_CARD_BUTTON_POSITION == ADD_TO_CARD_BUTTON.IN)
                    {
                        let prev_div_out = document.getElementById("info-price-" + product[2]);
                        let button_num_out = document.getElementById("buttons_num_" + product[2]);
                        prev_div_out.removeChild(button_num_out);
                        button_add_to_card(product, prev_div_out, ADD_TO_CARD_BUTTON.OUT);
                    }
                }
                else
                {
                    localStorage.setItem(product_obj.product, JSON.stringify(product_obj));

                    let number_product_elements = document.getElementsByClassName("number_product_" + product[2]);
                    for (let i = 0; i < number_product_elements.length; i++)
                    {
                        number_product_elements[i].innerHTML = product_obj.number + "шт";
                    }
                }
            }
            div_buttons_num.append(button_minus);
        }
        else
        {
            let button_price = document.createElement("button");
            button_price.className = "add-to-cart";
            button_price.innerHTML = "<i class=\"fa-solid fa-cart-shopping\"></i>";

            if (ADD_TO_CARD_BUTTON_POSITION == ADD_TO_CARD_BUTTON.OUT)
            {
                button_price.setAttribute("id", "add-to-cart-" + product[2]);
            }
            button_price.onclick = () => {
                add_shopping_cart(product);
                prev_div.removeChild(button_price);
                button_add_to_card(product, prev_div, ADD_TO_CARD_BUTTON_POSITION);

                if (ADD_TO_CARD_BUTTON_POSITION == ADD_TO_CARD_BUTTON.IN)
                {
                    let prev_div_out = document.getElementById("info-price-" + product[2]);
                    let button_price_out = document.getElementById("add-to-cart-" + product[2]);
                    prev_div_out.removeChild(button_price_out);
                    button_add_to_card(product, prev_div_out, ADD_TO_CARD_BUTTON.OUT);
                }
            }
            prev_div.append(button_price);
        }
    }
    else
    {
        let div_product_missing = document.createElement("div");
        div_product_missing.className = "product_missing";
        div_product_missing.innerHTML = "<p>Товара нет в наличии</p>"
        prev_div.append(div_product_missing);
    }
}

/** 
 * add_shopping_cart(product) - добавляет выбранный продукт в корзину, 
 *                              используя "localStorage".
 **/
function add_shopping_cart(product)
{
    if (localStorage.getItem(product) == null)
    {
        let product_obj = {
            product: product,
            number: 1, 
        }

        localStorage.setItem(product, JSON.stringify(product_obj));
    }
    else
    {
        let product_obj = JSON.parse(localStorage.getItem(product));
        product_obj.number += 1;
        localStorage.setItem(product, JSON.stringify(product_obj));
    }
}