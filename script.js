

function submitForm(modalId) {
    const formId = 'form' + modalId.slice(5); 
    const form = document.getElementById(formId);

    // Собираем данные из формы
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Отправляем данные (замените URL на свой)
    fetch('https://ваш-сервер.com/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Данные успешно отправлены!');
            
        } else {
            console.error('Ошибка при отправке данных:', response.status);
            
        }
    })
    .catch(error => {
        console.error('Ошибка сети:', error);
        
    });

    closeModal(modalId);

    return false;
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


let fuse;
let allData; 

function initializeFuse() {
    const options = {
        keys: ['textContent'],
        includeScore: true,
        threshold: 0.3
    };

    const elements = Array.from(document.querySelector('main').querySelectorAll('*'));
    allData = elements.map(element => ({
        textContent: element.textContent,
        element: element,
        href: getHref(element) //     
    }));  
    fuse = new Fuse(allData, options);
}

function getHref(element) {
    let currentElement = element;
    while (currentElement) {
        if (currentElement.tagName === 'SECTION' && currentElement.id) {
            return '#' + currentElement.id;
        }
        currentElement = currentElement.parentElement;
    }
    return '';
}

function searchSite() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchSuggestions = document.getElementById('search-suggestions');

    
    searchSuggestions.innerHTML = '';
    searchSuggestions.classList.remove('active');

    if (!fuse) {
        console.error('Fuse не инициализирован!');
        return;
    }

    if (!searchTerm) {
        return; 
    }

    const results = fuse.search(searchTerm);

    if (results.length > 0) {
        const suggestionsList = document.createElement('ul');
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = result.item.textContent.substring(0, 70) + "..."; 
            listItem.addEventListener('click', () => {
                
                document.getElementById('search-input').value = result.item.textContent; 
                window.location.href = result.item.href; 
                searchSuggestions.classList.remove('active'); 
            });
            suggestionsList.appendChild(listItem);
        });
        searchSuggestions.appendChild(suggestionsList);
        searchSuggestions.classList.add('active');
    }
}

document.getElementById('search-input').addEventListener('input', searchSite);

document.addEventListener('DOMContentLoaded', initializeFuse);
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

function toggleVisionMode() {
    document.body.classList.toggle('vision-mode');

    const isVisionMode = document.body.classList.contains('vision-mode');
    localStorage.setItem('visionMode', isVisionMode);
}

window.onload = function () {
    const visionMode = localStorage.getItem('visionMode');
    if (visionMode === 'true') {
        document.body.classList.add('vision-mode');
    }
}