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

    let response = await fetch(location_info + "php/sending_feedback_data.php", {
        method: "POST",
        body: form_data,
    });
    if (response.ok)
    {
        alert("Сообщение отправлен на обработку");
        form.reset();
    }
    else
    {
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

    let input_name  = document.getElementById("name_feedback");
    let input_email = document.getElementById("email_feedback");
    let input_phone = document.getElementById("phone_feedback");
    let input_feedback = document.getElementById("feedback");
    
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
        input_name.setAttribute("style", "border-bottom: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ИМЯ. ";
        return_value = false;
    }
    else
    {
        input_name.setAttribute("style", "border-bottom: 2px solid #585e5b");
    }
    if(email == "")
    {
        input_email.setAttribute("style", "border-bottom: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ EMAIL. ";
        return_value = false;
    }
    else
    {
        input_email.setAttribute("style", "border-bottom: 2px solid #585e5b");
    }
    if(phone == "")
    {
        input_phone.setAttribute("style", "border-bottom: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕЛЕФОН. ";
        return_value = false;
    }
    else
    {
        input_phone.setAttribute("style", "border-bottom: 3px solid #585e5b");
    }
    if(feedback == "")
    {
        input_feedback.setAttribute("style", "border: 3px solid #c36464");

        div_validation_info.innerHTML += "ВВЕДИТЕ ТЕКСТ СООБЩЕНИЯ. ";
        return_value = false;
    }
    else
    {
        input_feedback.setAttribute("style", "border: 3px solid #585e5b");
    }

    return return_value;
}