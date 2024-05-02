export default function feedback_form_handler(location_info)
{
    let feedback_form = document.getElementById("feedback_form");

    feedback_form.addEventListener("submit", function(event)
    {
        event.preventDefault();
        processing_form_data(feedback_form, location_info);
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
        document.body.removeChild(document.getElementById("modal_win"));
    }
    else
    {
        //div_shopping_cart_modal_window.classList.remove("sending");
        alert("Ошибка, попробуйте еще раз");
        form.reset();
    }
}