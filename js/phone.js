const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayPhones(data.data, dataLimit);
}

function search() {
    document.getElementById("loader").hidden=false;
    const inputField = document.getElementById("input-field");
    const input = inputField.value;
    console.log(input);
    if (input === '')
        alert("Write what phone you want to search");
    else {
        loadPhones(input, 12);
    }
}

function displayPhones(data, dataLimit) {
    if(dataLimit){
        if (data.length > dataLimit) {
            data = data.splice(0, dataLimit);
            document.getElementById("show-btn").hidden=false;
        }
        else{
            document.getElementById("show-btn").hidden=true;
        }
    }
    else{
        document.getElementById("show-btn").hidden=true;
    }

    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerHTML='';
    
    data.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="${phone.phone_name}"
                    class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions">
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
                </div>
            </div>
        </div>`;
        phoneContainer.appendChild(div);
    });
    document.getElementById("loader").hidden=true;
}

document.getElementById("show-btn").addEventListener('click',()=>{
    console.log("mahim");
    const inputField = document.getElementById("input-field");
    const input = inputField.value;
    loadPhones(input, 0);
})

const showDetails= async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const phone =data.data;
    const modalContainer=document.getElementById("modal-container");
    const sensors = phone.mainFeatures.sensors.join(', ');

    modalContainer.innerHTML=`<img src="${phone.image}" alt="" class="mx-auto">
    <h3 class="font-bold text-lg">${phone.name}</h3>
    <div class="py-3 space-y-2">
        <p><span class="font-bold">Storage : </span>${phone.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size : </span>${phone.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Chipset : </span>${phone.mainFeatures.chipSet}</p>
        <p><span class="font-bold">Memory : </span>${phone.mainFeatures.memory}</p>
        <p><span class="font-bold">Release data : </span>${phone.releaseDate}</p>
        <p><span class="font-bold">Brand : </span>${phone.brand}</p>
        <p><span class="font-bold">Sensors : </span>${sensors}</p>
    </div>
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-[#00cdb8] text-white">Close</button>
        </form>
    </div>`;

    modal.showModal();
}