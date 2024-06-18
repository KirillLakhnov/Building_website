export default function feedback_form_handler(location_info)
{
    let feedback_form = document.getElementById("feedback_form");

    feedback_form.addEventListener("submit", function(event)
    {
        event.preventDefault();

        if(validation_form(feedback_form) == true)
        {
            processing_form_data(feedback_form, location_info);
        }
    })
}

async function processing_form_data(form, location_info)
{
    let form_data = new FormData(form);
    

    //div_shopping_cart_modal_window.classList.add("sending");
    let response = await fetch(location_info + "php/sending_feedback_data.php", {
        method: "POST",
        body: form_data,
    });
    if (response.ok)
    {
        //div_shopping_cart_modal_window.classList.remove("sending"); 
        alert("Сообщение отправлен на обработку");
        //document.body.removeChild(document.getElementById("modal_win"));
    }
    else
    {
        //div_shopping_cart_modal_window.classList.remove("sending");
        alert("Ошибка, попробуйте еще раз");
        form.reset();
    }
}

function validation_form(form)
{
    let return_value = true;

    let form_data = new FormData(form);

    const name     = form_data.get("name");
    const email    = form_data.get("email");
    const phone    = form_data.get("phone");
    const feedback = form_data.get("feedback");
    
    if (document.getElementById("validation_info") != null)
    {
        document.getElementById("validation_info").remove();
    }

    let div_validation_info = document.createElement("div");
    div_validation_info.className = "validation_info";
    div_validation_info.setAttribute("id", "validation_info");
    div_validation_info.innerHTML = "";
    document.getElementById("feedback_form").append(div_validation_info);

    if(name == "")
    {
        div_validation_info.innerHTML += "ВВЕДИТЕ ИМЯ. ";
        return_value = false;
    }
    if(email == "")
    {
        div_validation_info.innerHTML += "ВВЕДИТЕ EMAIL. ";
        return_value = false;
    }
    if(phone == "")
    {
        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕЛЕФОН. ";
        return_value = false;
    }
    if(feedback == "")
    {
        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕКСТ СООБЩЕНИЯ. ";
        return_value = false;
    }

    return return_value;
}
