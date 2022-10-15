const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    const warningMessage = document.getElementById('no-found-message')
    if (phones.length === 0) {
        warningMessage.classList.remove('d-none')
    }
    else {
        warningMessage.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card">
            <img src="${phone.image}" class="card-img-top p-5" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick="showDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    loadSpinner(false);
}
const process = (dataLimit) => {
    loadSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value;
    loadPhones(searchValue, dataLimit);
}


document.getElementById('input-button').addEventListener('click', function () {
    process(10);

})

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        process(10);
    }
})

const loadSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading) {
        spinnerContainer.classList.remove('d-none')
    }
    else {
        spinnerContainer.classList.add('d-none')
    }
}

document.getElementById('show-all-btn').addEventListener('click', function () {
    process();
})

const showDetails = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json();
    phoneDetails(data.data)
}

const phoneDetails = (phone) => {
    const phoneDetailModal = document.getElementById('exampleModalLabel');
    console.log(phone)
    phoneDetailModal.innerText = phone.name;

    const releaseInfo = document.getElementById('phone-details');
    releaseInfo.innerHTML = `
       <p>Release info: ${phone.releaseDate ? phone.releaseDate : 'No release data found'}
       </p>
       <p> Others: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no features found'}
       <p> Bluetooth: ${phone.others ? phone.others.Bluetooth : 'no bluetooth available'};
    `
}


loadPhones('samsung');




