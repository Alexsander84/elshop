function sortDown() {
    updateList('down');
}

function sortUp() {
    updateList('up');
}

//AJAX
function updateList(direction){
    let tockens = document.getElementsByName('csrfmiddlewaretoken')


    let xhr = new XMLHttpRequest();    // xhr.status == 0
    xhr.open('GET', '/catalog/filter?' + "csrf_token=" + tockens[0].value + "&direction=" + direction + "&category=telephones");
    xhr.send();

    xhr.onloadend = function() {
        if (xhr.readyState == 4 && xhr.status == 200){

            let oldList = document.querySelector('ul');
            oldList.innerHTML = '';


            let phoneList = JSON.parse(xhr.responseText);
            for (phone of phoneList){
                let li = document.createElement('li');
                li.innerHTML = phone.fields.name;
                oldList.appendChild(li);

            }
        }
    }
}