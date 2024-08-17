function handleBurger() {
    const burger = document.getElementsByClassName('burger')[0];
    const menu = document.getElementsByClassName('menu')[0];
    const body = document.getElementsByTagName("body")[0];

    burger.onclick = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');

        if (burger.classList.contains("active")) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }

        document.querySelectorAll("#menu-list *").forEach((item) => {
            item.addEventListener('click', () => hideMenu(menu, burger, body));
        });
    }

    menu.addEventListener('click', () => hideMenu(menu, burger, body));
}

function hideMenu(elem1, elem2, elem3) {
    elem1.classList.remove("active");
    elem2.classList.remove("active");
    elem3.style.overflowY = "auto";
}

handleBurger();