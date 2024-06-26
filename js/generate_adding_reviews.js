export default function adding_reviews(location_info)
{
    let reviews_item = document.getElementById("reviews_item");
    
    let reviews_link = document.createElement("div");
    reviews_link.className = "reviews_link";
    reviews_link.innerHTML = "Добавить отзыв";
    reviews_link.onclick = () => window_adding_rewiews(location_info);
    reviews_item.append(reviews_link);
}

function window_adding_rewiews(location_info)
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
    h2.innerHTML = "Напишите свой отзыв";
    div_modal_window.append(h2);

    let reviews_form = document.createElement("form");
    reviews_form.className = "reviews_form";
    reviews_form.innerHTML = "\
        <div class=\"input_block\">\
            <input type=\"text\" name=\"name\" id=\"name\" placeholder=\"Имя\">\
        </div>\
        <div class=\"text_area_review\" id=\"rewiew\">\
            <textarea name=\"review\" rows=\"5\" placeholder=\"Напишите свой отзыв\"></textarea>\
        </div>\
        <div class = \"final_data_review\">\
            <div class=\"file_dowload\">\
                <input id=\"file_review\" class=\"file_review\" accept=\".jpg, .jpeg, .png\" type=\"file\" name=\"file\" style=\"display: none\">\
                <div class=\"file_review_button\" id=\"file_review_button\"></div>\
            </div>\
            <div class=\"send_review\">\
                <input class=\"submit_button_review\" type=\"submit\">\
            </div>\
        </div>\
    ";
    div_modal_window.append(reviews_form);

    let file_review_button = document.getElementById("file_review_button");
    file_review_button.innerHTML = "Прикрепить фото";
    let file_review = document.getElementById('file_review');

    file_review_button.onclick = () => {
        file_review.click();
    };
    file_review.addEventListener("change", () => {
        file_review_button.classList.add("file_review_button_img");
        
        let reader = new FileReader();
        reader.onload = function(e){
            file_review_button.innerHTML = "Изменить фото <img src=\"" + e.target.result + "\">";
        };
        reader.onerror = function(e){
            alert("Ошибка загрузки файла");
        }
        reader.readAsDataURL(file_review.files[0]);
    });

    reviews_form.addEventListener("submit", function(event)
    {
        event.preventDefault();
        if (validation_form(div_modal_window, reviews_form, file_review.files[0]) == true)
        {
            processing_form_data(reviews_form, div_modal_window, location_info, file_review.files[0]);
        }
    })
}

async function processing_form_data(form, div_modal_window, location_info, img)
{
    let form_data = new FormData(form);
    form_data.append("image", img);
    
    div_modal_window.classList.add("sending");
    let response = await fetch(location_info + "php/sending_review_data.php", {
        method: "POST",
        body: form_data,
    });
    if (response.ok)
    {
        div_modal_window.classList.remove("sending"); 
        alert("Отзыв отправлен");
        document.body.removeChild(document.getElementById("modal_win"));
    }
    else
    {
        div_modal_window.classList.remove("sending");
        alert("Ошибка, попробуйте еще раз");
        form.reset();
    }
}

function validation_form(parent_form, form, img)
{
    let return_value = true;

    let form_data = new FormData(form);

    const name   = form_data.get("name");
    const review = form_data.get("review");

    let input_name   = document.getElementById("name");
    let input_rewiew = document.getElementById("rewiew");
    let input_img    = document.getElementById("file_review_button");
    
    console.log(document.getElementById("validation_info"));
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
        input_name.setAttribute("style", "border-bottom: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ИМЯ. ";
        return_value = false;
    }
    else
    {
        input_name.setAttribute("style", "border-bottom: 2px solid #585e5b");
    }
    if(review == "")
    {
        input_rewiew.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕКСТ ОТЗЫВА. ";
        return_value = false;
    }
    else
    {
        input_rewiew.setAttribute("style", "border: 2px solid #585e5b");
    }
    if(typeof img == "undefined")
    {
        input_img.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ПРИКРЕПИТЕ ФОТОГРАФИЮ. ";
        return_value = false;
    }
    else
    {
        input_img.setAttribute("style", "border: 2px solid #585e5b");
    }

    return return_value;
}