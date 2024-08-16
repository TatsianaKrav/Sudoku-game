function handleBurger() {
    const burger = document.getElementsByClassName('burger')[0];
    const menu = document.getElementsByClassName('menu')[0];

    burger.onclick = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');

        if (burger.classList.contains("active")) {
            document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        } else {
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
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
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

handleBurger();