const tg = window.Telegram?.WebApp;


/* =========================
   TELEGRAM
========================= */

if (tg) {
    tg.ready();
    tg.expand();
}


/* =========================
   MAIN ELEMENTS
========================= */

const app = document.querySelector(".app");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const bottomNav = document.querySelector(".bottom-nav");


/* =========================
   ADMIN
========================= */

const ADMIN_ID = 8558737152;


/* =========================
   DEMO ACCOUNTS
========================= */

const accounts = [
    {
        game: "Brawl Stars",
        title: "Brawl Stars — аккаунт с редкими скинами",
        price: 799
    },
    {
        game: "Brawl Stars",
        title: "Brawl Stars — 35 000 кубков",
        price: 599
    },
    {
        game: "Brawl Stars",
        title: "Brawl Stars — много легендарных бойцов",
        price: 999
    },
    {
        game: "Minecraft",
        title: "Minecraft — Java Edition аккаунт",
        price: 1299
    },
    {
        game: "GTA 5",
        title: "GTA 5 — игровой аккаунт",
        price: 899
    }
];


/* =========================
   HELPERS
========================= */

function escapeHtml(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function showMessage(message) {

    if (tg?.showAlert) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
}


/* =========================
   HOME
========================= */

function showHome() {

    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());

    header.style.display = "";
    main.style.display = "";
    bottomNav.style.display = "";

    window.location.hash = "";

    window.scrollTo(0, 0);
}


/* =========================
   ACCOUNTS SCREEN
========================= */

function createAccountsScreen() {

    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());

    header.style.display = "none";
    main.style.display = "none";
    bottomNav.style.display = "none";

    const screen = document.createElement("section");

    screen.id = "accountsScreen";
    screen.className = "extra-screen";

    screen.innerHTML = `

        <div class="extra-header">

            <button
                class="back-button"
                id="accountsBack"
            >
                ←
            </button>

            <div>

                <div class="extra-title">
                    Аккаунты
                </div>

                <div class="extra-subtitle">
                    Выберите игру
                </div>

            </div>

        </div>


        <div class="accounts-search-box">

            <input
                type="text"
                id="gameSearchInput"
                placeholder="Введите название игры..."
                autocomplete="off"
            >

            <button id="gameSearchButton">
                Найти
            </button>

        </div>


        <div class="accounts-hint">

            Введите название игры, например:
            <strong>Brawl Stars</strong>

        </div>


        <div id="accountsResults">

            <div class="empty-state">

                <div class="empty-title">
                    Введите название игры
                </div>

                <div class="empty-text">
                    Например: Brawl Stars, Minecraft или GTA 5
                </div>

            </div>

        </div>

    `;

    app.appendChild(screen);


    document
        .getElementById("accountsBack")
        .addEventListener("click", showHome);


    const input =
        document.getElementById("gameSearchInput");

    const button =
        document.getElementById("gameSearchButton");


    button.addEventListener("click", () => {

        searchAccounts(input.value);

    });


    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            searchAccounts(input.value);
        }

    });


    input.focus();

    window.scrollTo(0, 0);
}


/* =========================
   SEARCH ACCOUNTS
========================= */

function searchAccounts(query) {

    const results =
        document.getElementById("accountsResults");

    if (!results) {
        return;
    }


    const search =
        query.trim().toLowerCase();


    if (!search) {

        results.innerHTML = `

            <div class="empty-state">

                <div class="empty-title">
                    Введите название игры
                </div>

                <div class="empty-text">
                    Например: Brawl Stars, Minecraft или GTA 5
                </div>

            </div>

        `;

        return;
    }


    const found =
        accounts.filter((account) =>
            account.game
                .toLowerCase()
                .includes(search)
        );


    if (found.length === 0) {

        results.innerHTML = `

            <div class="empty-state">

                <div class="empty-title">
                    Ничего не найдено
                </div>

                <div class="empty-text">
                    По игре «${escapeHtml(query)}»
                    пока нет аккаунтов.
                </div>

            </div>

        `;

        return;
    }


    results.innerHTML = `

        <div class="results-title">
            Найдено аккаунтов: ${found.length}
        </div>


        <div class="account-list">

            ${found.map((account) => `

                <article class="account-card">

                    <div class="account-image">

                        <img
                            src="assets/accounts.svg"
                            alt=""
                        >

                    </div>


                    <div class="account-info">

                        <div class="account-game">
                            ${escapeHtml(account.game)}
                        </div>

                        <h3>
                            ${escapeHtml(account.title)}
                        </h3>


                        <div class="account-bottom">

                            <strong>
                                ${account.price} ₽
                            </strong>

                            <button
                                class="account-buy"
                                data-title="${escapeHtml(account.title)}"
                            >
                                Купить
                            </button>

                        </div>

                    </div>

                </article>

            `).join("")}

        </div>

    `;


    document
        .querySelectorAll(".account-buy")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const title =
                    button.dataset.title;

                showMessage(
                    `Вы выбрали: ${title}`
                );

            });

        });
}


/* =========================
   PROFILE
========================= */

function createProfileScreen() {

    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());

    header.style.display = "none";
    main.style.display = "none";
    bottomNav.style.display = "none";


    const user =
        tg?.initDataUnsafe?.user || {};


    const firstName =
        user.first_name || "Пользователь";


    const lastName =
        user.last_name || "";


    const username =
        user.username
            ? `@${user.username}`
            : "username не указан";


    let avatar;


    if (user.photo_url) {

        avatar = `
            <img
                src="${escapeHtml(user.photo_url)}"
                alt=""
            >
        `;

    } else {

        avatar = `
            <div class="avatar-letter">
                ${escapeHtml(
                    firstName.charAt(0).toUpperCase()
                )}
            </div>
        `;

    }


    const screen =
        document.createElement("section");


    screen.id = "profileScreen";

    screen.className =
        "extra-screen profile-screen";


    screen.innerHTML = `

        <div class="extra-header">

            <button
                class="back-button"
                id="profileBack"
            >
                ←
            </button>

            <div>

                <div class="extra-title">
                    Профиль
                </div>

                <div class="extra-subtitle">
                    Ваш аккаунт
                </div>

            </div>

        </div>


        <div class="profile-card">

            <div class="profile-avatar">

                ${avatar}

            </div>


            <div class="profile-name">

                ${escapeHtml(firstName)}
                ${escapeHtml(lastName)}

            </div>


            <div class="profile-username">

                ${escapeHtml(username)}

            </div>

        </div>


        <div class="profile-stats">

            <div class="profile-stat">

                <strong>
                    0
                </strong>

                <span>
                    Покупок
                </span>

            </div>


            <div class="profile-stat">

                <strong>
                    0
                </strong>

                <span>
                    Избранное
                </span>

            </div>


            <div class="profile-stat">

                <strong>
                    0 ₽
                </strong>

                <span>
                    Потрачено
                </span>

            </div>

        </div>


        <div class="profile-section">

            <div class="profile-section-title">
                Аккаунт
            </div>


            <button class="profile-row">

                <span>
                    Покупки
                </span>

                <span>
                    ›
                </span>

            </button>


            <button class="profile-row">

                <span>
                    Избранное
                </span>

                <span>
                    ›
                </span>

            </button>


            <button class="profile-row">

                <span>
                    Поддержка
                </span>

                <span>
                    ›
                </span>

            </button>

        </div>

    `;


    app.appendChild(screen);


    document
        .getElementById("profileBack")
        .addEventListener("click", showHome);


    window.scrollTo(0, 0);
}


/* =========================
   ADMIN CHECK
========================= */

function isAdmin() {

    const user =
        tg?.initDataUnsafe?.user;


    if (!user) {
        return false;
    }


    return Number(user.id) === ADMIN_ID;
}


/* =========================
   ADMIN MAIN SCREEN
========================= */

function createAdminScreen() {

    if (!isAdmin()) {

        showMessage(
            "Доступ запрещён."
        );

        window.location.hash = "";

        showHome();

        return;
    }


    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());


    header.style.display = "none";
    main.style.display = "none";
    bottomNav.style.display = "none";


    const screen =
        document.createElement("section");


    screen.id = "adminScreen";

    screen.className =
        "extra-screen admin-screen";


    screen.innerHTML = `

        <div class="extra-header">

            <button
                class="back-button"
                id="adminBack"
            >
                ←
            </button>

            <div>

                <div class="extra-title">
                    Админ-панель
                </div>

                <div class="extra-subtitle">
                    Управление магазином
                </div>

            </div>

        </div>


        <div class="admin-welcome">

            <div class="admin-badge">
                ADMIN
            </div>


            <h2>
                Управление магазином
            </h2>


            <p>
                Добавляйте и изменяйте товары,
                категории и настройки магазина.
            </p>

        </div>


        <div class="admin-menu">


            <button
                class="admin-menu-card"
                id="adminProducts"
            >

                <div class="admin-menu-icon">
                    📦
                </div>


                <div class="admin-menu-info">

                    <strong>
                        Товары
                    </strong>

                    <span>
                        Добавление и управление товарами
                    </span>

                </div>


                <div class="admin-arrow">
                    ›
                </div>

            </button>


            <button
                class="admin-menu-card"
                id="adminAddProduct"
            >

                <div class="admin-menu-icon">
                    ＋
                </div>


                <div class="admin-menu-info">

                    <strong>
                        Добавить товар
                    </strong>

                    <span>
                        Создать новый товар
                    </span>

                </div>


                <div class="admin-arrow">
                    ›
                </div>

            </button>


            <button
                class="admin-menu-card"
                id="adminCategories"
            >

                <div class="admin-menu-icon">
                    ◈
                </div>


                <div class="admin-menu-info">

                    <strong>
                        Категории
                    </strong>

                    <span>
                        Настройка категорий магазина
                    </span>

                </div>


                <div class="admin-arrow">
                    ›
                </div>

            </button>


            <button
                class="admin-menu-card"
                id="adminSettings"
            >

                <div class="admin-menu-icon">
                    ⚙
                </div>


                <div class="admin-menu-info">

                    <strong>
                        Настройки
                    </strong>

                    <span>
                        Основные настройки магазина
                    </span>

                </div>


                <div class="admin-arrow">
                    ›
                </div>

            </button>


        </div>

    `;


    app.appendChild(screen);


    document
        .getElementById("adminBack")
        .addEventListener("click", showHome);


    document
        .getElementById("adminProducts")
        .addEventListener(
            "click",
            createAdminProductsScreen
        );


    document
        .getElementById("adminAddProduct")
        .addEventListener(
            "click",
            createAddProductScreen
        );


    document
        .getElementById("adminCategories")
        .addEventListener(
            "click",
            () => {
                showMessage(
                    "Управление категориями добавим следующим этапом."
                );
            }
        );


    document
        .getElementById("adminSettings")
        .addEventListener(
            "click",
            () => {
                showMessage(
                    "Настройки магазина добавим следующим этапом."
                );
            }
        );


    window.scrollTo(0, 0);
}


/* =========================
   ADMIN PRODUCTS
========================= */

function createAdminProductsScreen() {

    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());


    const screen =
        document.createElement("section");


    screen.id =
        "adminProductsScreen";


    screen.className =
        "extra-screen admin-screen";


    screen.innerHTML = `

        <div class="extra-header">

            <button
                class="back-button"
                id="productsBack"
            >
                ←
            </button>


            <div>

                <div class="extra-title">
                    Товары
                </div>

                <div class="extra-subtitle">
                    Управление товарами
                </div>

            </div>

        </div>


        <button
            class="admin-add-button"
            id="productsAdd"
        >
            ＋ Добавить товар
        </button>


        <div class="admin-empty">

            <div class="admin-empty-icon">
                📦
            </div>


            <h3>
                Товаров пока нет
            </h3>


            <p>
                Добавьте первый товар,
                чтобы он появился в магазине.
            </p>

        </div>

    `;


    app.appendChild(screen);


    document
        .getElementById("productsBack")
        .addEventListener(
            "click",
            createAdminScreen
        );


    document
        .getElementById("productsAdd")
        .addEventListener(
            "click",
            createAddProductScreen
        );


    window.scrollTo(0, 0);
}


/* =========================
   ADD PRODUCT
========================= */

function createAddProductScreen() {

    document
        .querySelectorAll(".extra-screen")
        .forEach((screen) => screen.remove());


    const screen =
        document.createElement("section");


    screen.id =
        "addProductScreen";


    screen.className =
        "extra-screen admin-screen";


    screen.innerHTML = `

        <div class="extra-header">

            <button
                class="back-button"
                id="addProductBack"
            >
                ←
            </button>


            <div>

                <div class="extra-title">
                    Новый товар
                </div>

                <div class="extra-subtitle">
                    Добавление товара
                </div>

            </div>

        </div>


        <div class="admin-form">


            <label>

                Название товара

                <input
                    type="text"
                    id="productName"
                    placeholder="Например: Premium аккаунт"
                >

            </label>


            <label>

                Игра

                <input
                    type="text"
                    id="productGame"
                    placeholder="Например: Brawl Stars"
                >

            </label>


            <label>

                Категория

                <select id="productCategory">

                    <option value="accounts">
                        Аккаунты
                    </option>

                    <option value="currency">
                        Валюта
                    </option>

                    <option value="keys">
                        Ключи
                    </option>

                    <option value="items">
                        Предметы
                    </option>

                </select>

            </label>


            <label>

                Цена

                <div class="price-input">

                    <input
                        type="number"
                        id="productPrice"
                        placeholder="499"
                        min="0"
                    >

                    <span>
                        ₽
                    </span>

                </div>

            </label>


            <label>

                Описание

                <textarea
                    id="productDescription"
                    placeholder="Описание товара..."
                    rows="5"
                ></textarea>

            </label>


            <label>

                Изображение

                <input
                    type="text"
                    id="productImage"
                    placeholder="Например: assets/accounts.svg"
                >

            </label>


            <button
                class="admin-submit-button"
                id="saveProduct"
            >
                Добавить товар
            </button>


        </div>

    `;


    app.appendChild(screen);


    document
        .getElementById("addProductBack")
        .addEventListener(
            "click",
            createAdminScreen
        );


    document
        .getElementById("saveProduct")
        .addEventListener(
            "click",
            saveDemoProduct
        );


    window.scrollTo(0, 0);
}


/* =========================
   SAVE DEMO PRODUCT
========================= */

function saveDemoProduct() {

    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    const game =
        document
            .getElementById("productGame")
            .value
            .trim();


    const price =
        document
            .getElementById("productPrice")
            .value
            .trim();


    if (!name || !game || !price) {

        showMessage(
            "Заполните название, игру и цену."
        );

        return;
    }


    showMessage(
        "Товар заполнен. Сохранение в базу подключим следующим этапом."
    );
}


/* =========================
   CATEGORY BUTTONS
========================= */

document
    .querySelectorAll(".category-card")
    .forEach((card, index) => {

        card.addEventListener(
            "click",
            () => {

                if (index === 0) {

                    createAccountsScreen();

                    return;
                }


                const names = [
                    "Аккаунты",
                    "Валюта",
                    "Ключи",
                    "Предметы"
                ];


                showMessage(
                    `${names[index]}\n\nКатегория пока находится в разработке.`
                );

            }
        );

    });


/* =========================
   PROFILE BUTTON
========================= */

const profileButton =
    document.getElementById("profileButton");


if (profileButton) {

    profileButton.addEventListener(
        "click",
        createProfileScreen
    );

}


/* =========================
   PROFILE NAV
========================= */

const profileNavButton =
    document.getElementById(
        "profileNavButton"
    );


if (profileNavButton) {

    profileNavButton.addEventListener(
        "click",
        createProfileScreen
    );

}


/* =========================
   HOME NAV
========================= */

const homeNavButton =
    document.getElementById(
        "homeNavButton"
    );


if (homeNavButton) {

    homeNavButton.addEventListener(
        "click",
        showHome
    );

}


/* =========================
   CATALOG
========================= */

const catalogButton =
    document.getElementById(
        "catalogButton"
    );


if (catalogButton) {

    catalogButton.addEventListener(
        "click",
        createAccountsScreen
    );

}


/* =========================
   CART
========================= */

const cartButton =
    document.getElementById(
        "cartButton"
    );


if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            showMessage(
                "Корзина пока пустая."
            );

        }
    );

}


/* =========================
   ORDERS
========================= */

const ordersButton =
    document.getElementById(
        "ordersButton"
    );


if (ordersButton) {

    ordersButton.addEventListener(
        "click",
        () => {

            showMessage(
                "Покупок пока нет."
            );

        }
    );

}


/* =========================
   HOME SEARCH
========================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            document
                .querySelectorAll(".product-card")
                .forEach((card) => {

                    const text =
                        card.innerText
                            .toLowerCase();


                    card.style.display =
                        text.includes(query)
                            ? ""
                            : "none";

                });

        }
    );

}


/* =========================
   ALL CATEGORIES
========================= */

const allCategories =
    document.getElementById(
        "allCategories"
    );


if (allCategories) {

    allCategories.addEventListener(
        "click",
        createAccountsScreen
    );

}


/* =========================
   ALL PRODUCTS
========================= */

const allProducts =
    document.getElementById(
        "allProducts"
    );


if (allProducts) {

    allProducts.addEventListener(
        "click",
        () => {

            document
                .querySelector(".products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =========================
   ADMIN URL
========================= */

if (window.location.hash === "#admin") {

    setTimeout(
        () => {
            createAdminScreen();
        },
        100
    );

}
