const body = document.getElementsByTagName("body")[0];

function handleBurger(body) {
    const burger = document.getElementsByClassName('burger')[0];
    const menu = document.getElementsByClassName('menu')[0];


    burger.onclick = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');

        if (burger.classList.contains("active")) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }

        document.querySelectorAll("#menu-list *").forEach((item) => {
            item.addEventListener('click', () => hideMenu(menu, burger));
        });
    }

    menu.addEventListener('click', () => hideMenu(menu, burger));
}

function hideMenu(elem1, elem2) {
    elem1.classList.remove("active");
    elem2.classList.remove("active");
    body.style.overflowY = "auto";
}

function handlePopup() {
    const cards = document.querySelectorAll('.card');
    const modal = document.querySelector('.modal-wrapper');


    cards.forEach(item => {
        item.onclick = () => {
            openPopup(modal);
        }
    })

    closePopup(modal);
}

function closePopup(modal) {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => hidePopup(modal));

    modal.onclick = (e) => {
        if (e.target === modal) {
            hidePopup(modal);
        }
    }
}

function openPopup(modal) {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    body.style.overflowY = "hidden";
}

function hidePopup(modal) {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    body.style.overflowY = "auto";
}

handleBurger(body);
handlePopup(); 