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
            item.onclick = () => {
                menu.classList.remove("active");
                burger.classList.remove("active");
                document.getElementsByTagName("body")[0].style.overflowY = "auto";
            };
        });
    }
}

handleBurger();