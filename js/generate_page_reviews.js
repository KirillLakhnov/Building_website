async function generate_reviews_page ()
{
    let response = await fetch("./php/get_review_data.php", {
        method: "GET",
        mode: "no-cors",
    });

    if(response.ok)
    {
        let reviews = await response.json();

        let section_about_company = document.getElementById("about-company");

        for(let i = reviews.length - 1; typeof reviews[i-1] != "undefined"; i--)
        {
            let div_testimonial_container = document.createElement('div');
            div_testimonial_container.className = "testimonial-container";
            section_about_company.append(div_testimonial_container);

            let div_box = document.createElement('div');
            div_box.className = "box";
            div_box.innerHTML = "<i class=\"fa-solid fa-quote-left\"></i>\
                                 <p>" + reviews[i][2] + "</p>";
            div_testimonial_container.append(div_box);

            let div_person = document.createElement('div');
            div_person.className = "person";
            div_person.innerHTML = "<div class=\"author\">" + reviews[i][1] + "</div>";
            div_box.append(div_person);
            
            let div_img = document.createElement('div');
            div_img.className = "img";
            div_img.innerHTML = "<img src=\"data:image/jpg;base64," + reviews[i][3] + "\"/>";
            div_person.prepend(div_img);
        }
    }
    else
    {
        alert("Ошибка: " + response.status);
    }
}

generate_reviews_page();