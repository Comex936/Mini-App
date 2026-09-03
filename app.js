const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");

const categoryCards = document.querySelectorAll(".category-card");

const catalogButton = document.getElementById("catalogButton");
const cartButton = document.getElementById("cartButton");
const ordersButton = document.getElementById("ordersButton");
const profileNavButton = document.getElementById("profileNavButton");
const profileButton = document.getElementById("profileButton");

const allCategoriesButton = document.getElementById("allCategories");
const allProductsButton = document.getElementById("allProducts");

const navItems = document.querySelectorAll(".nav-item");

const telegramUser =
    tg?.initDataUnsafe?.user || null;


/* =========================
   ВИБРАЦИЯ
========================= */

function haptic(type = "light") {
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred(type);
    }
}


/* =========================
   НАВИГАЦИЯ
========================= */

function setActiveNav(button) {
    navItems.forEach((item) => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}


/* =========================
   ПОКАЗ ГЛАВНОЙ
========================= */

function showHome() {
    const profileScreen =
        document.getElementById("profileScreen");

    if (profileScreen) {
        profileScreen.remove();
    }

    const header =
        document.querySelector(".header");

    const main =
        document.querySelector("main");

    const bottomNav =
        document.querySelector(".bottom-nav");

    if (header) {
        header.style.display = "";
    }

    if (main) {
        main.style.display = "";
    }

    if (bottomNav) {
        bottomNav.style.display = "grid";
    }

    const welcomeTitle =
        document.querySelector(".welcome h1");

    const welcomeDescription =
        document.querySelector(".welcome p");

    const productsTitle =
        document.querySelector(
            ".products .section-header h2"
        );

    if (welcomeTitle) {
        welcomeTitle.textContent =
            "Что будем искать?";
    }

    if (welcomeDescription) {
        welcomeDescription.textContent =
            "Аккаунты, валюту, ключи и игровые предметы";
    }

    if (productsTitle) {
        productsTitle.textContent =
            "Популярное";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   ОТКРЫТИЕ КАТЕГОРИИ
========================= */

const categories = {
    accounts: {
        title: "Игровые аккаунты",
        description: "Аккаунты популярных игр"
    },

    currency: {
        title: "Игровая валюта",
        description: "Монеты, кристаллы и другая игровая валюта"
    },

    keys: {
        title: "Игровые ключи",
        description: "Ключи активации игр и дополнений"
    },

    items: {
        title: "Игровые предметы",
        description: "Скины, предметы и игровые наборы"
    }
};

function openCategory(categoryName) {
    const category = categories[categoryName];

    if (!category) {
        return;
    }

    haptic("light");

    setActiveNav(catalogButton);

    const welcomeTitle =
        document.querySelector(".welcome h1");

    const welcomeDescription =
        document.querySelector(".welcome p");

    const productsTitle =
        document.querySelector(
            ".products .section-header h2"
        );

    if (welcomeTitle) {
        welcomeTitle.textContent =
            category.title;
    }

    if (welcomeDescription) {
        welcomeDescription.textContent =
            category.description;
    }

    if (productsTitle) {
        productsTitle.textContent =
            category.title;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   КАТЕГОРИИ
========================= */

categoryCards.forEach((card, index) => {

    const categoryNames = [
        "accounts",
        "currency",
        "keys",
        "items"
    ];

    card.addEventListener("click", () => {
        openCategory(categoryNames[index]);
    });

});


/* =========================
   ПЕРЕХОД В ПРОФИЛЬ
========================= */

function openProfile() {

    haptic("light");

    setActiveNav(profileNavButton);

    const oldProfile =
        document.getElementById("profileScreen");

    if (oldProfile) {
        oldProfile.remove();
    }

    const header =
        document.querySelector(".header");

    const main =
        document.querySelector("main");

    const bottomNav =
        document.querySelector(".bottom-nav");

    if (header) {
        header.style.display = "none";
    }

    if (main) {
        main.style.display = "none";
    }

    if (bottomNav) {
        bottomNav.style.display = "none";
    }

    const app =
        document.querySelector(".app");

    if (!app) {
        return;
    }

    const firstName =
        telegramUser?.first_name || "Пользователь";

    const lastName =
        telegramUser?.last_name || "";

    const username =
        telegramUser?.username
            ? "@" + telegramUser.username
            : "Telegram пользователь";

    const avatar =
        telegramUser?.photo_url || "";

    const fullName =
        `${firstName} ${lastName}`.trim();

    const avatarHTML = avatar
        ? `<img src="${avatar}" alt="Аватар пользователя">`
        : `
            <div class="profile-avatar-placeholder">
                ${firstName
                    .charAt(0)
                    .toUpperCase()}
            </div>
        `;


    const profileScreen =
        document.createElement("div");

    profileScreen.id =
        "profileScreen";

    profileScreen.className =
        "profile-screen";


    profileScreen.innerHTML = `

        <div class="profile-topbar">

            <button
                class="profile-back-button"
                id="profileBackButton"
                aria-label="Назад"
            >
                <svg viewBox="0 0 24 24">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                </svg>
            </button>

            <div class="profile-top-title">
                Профиль
            </div>

            <button
                class="profile-settings-button"
                id="profileSettingsButton"
                aria-label="Настройки"
            >
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.5-1H6v-2.4h.9a1.7 1.7 0 0 0 1.5-1A1.7 1.7 0 0 0 8.1 9L8 8.9l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L20 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.7.6z"></path>
                </svg>
            </button>

        </div>


        <section class="profile-hero">

            <div class="profile-banner">

                <div class="profile-banner-orb orb-one"></div>
                <div class="profile-banner-orb orb-two"></div>
                <div class="profile-banner-stars"></div>

            </div>


            <div class="profile-user">

                <div class="profile-avatar">

                    ${avatarHTML}

                    <span class="profile-online"></span>

                </div>


                <div class="profile-user-info">

                    <div class="profile-name-row">

                        <h1>
                            ${fullName}
                        </h1>

                        <span class="verified-badge">
                            <svg viewBox="0 0 24 24">
                                <path d="M20 7l-11 11-5-5"></path>
                            </svg>
                        </span>

                    </div>

                    <p class="profile-username">
                        ${username}
                    </p>

                    <span class="profile-status">
                        Игрок маркетплейса
                    </span>

                </div>

            </div>


            <button
                class="edit-profile-button"
                id="editProfileButton"
            >

                <svg viewBox="0 0 24 24">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"></path>
                </svg>

                Редактировать

            </button>

        </section>


        <section class="profile-stats">

            <div class="profile-stat">
                <strong>0</strong>
                <span>Покупок</span>
            </div>

            <div class="profile-stat">
                <strong>0</strong>
                <span>Заказов</span>
            </div>

            <div class="profile-stat">
                <strong>0</strong>
                <span>Избранное</span>
            </div>

        </section>


        <section class="profile-tabs">

            <button
                class="profile-tab active"
                data-tab="profile"
            >
                Профиль
            </button>

            <button
                class="profile-tab"
                data-tab="purchases"
            >
                Покупки
            </button>

            <button
                class="profile-tab"
                data-tab="favorites"
            >
                Избранное
            </button>

        </section>


        <section
            class="profile-content"
            id="profileContent"
        >

            <div class="profile-card">

                <div class="profile-card-title">
                    О себе
                </div>

                <p class="profile-about">
                    Добро пожаловать в Game Market!
                    Здесь будет отображаться информация
                    о вашем профиле.
                </p>


                <div class="profile-tags">

                    <span>Игры</span>
                    <span>Покупки</span>
                    <span>Избранное</span>

                </div>

            </div>


            <div class="profile-card">

                <div class="profile-card-title">
                    Последняя активность
                </div>


                <div class="activity-empty">

                    <div class="activity-empty-icon">

                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M12 7v5l3 2"></path>
                        </svg>

                    </div>

                    <div>

                        <strong>
                            Пока здесь пусто
                        </strong>

                        <p>
                            Активность появится после
                            первых действий в магазине.
                        </p>

                    </div>

                </div>

            </div>


            <div class="profile-card">

                <div class="profile-card-title">
                    Настройки
                </div>


                <button
                    class="profile-setting-row"
                    data-setting="notifications"
                >

                    <span class="setting-icon">

                        <svg viewBox="0 0 24 24">
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                            <path d="M10 21h4"></path>
                        </svg>

                    </span>

                    <span class="setting-text">

                        <strong>
                            Уведомления
                        </strong>

                        <small>
                            Настройка уведомлений
                        </small>

                    </span>

                    <span class="setting-arrow">
                        ›
                    </span>

                </button>


                <button
                    class="profile-setting-row"
                    data-setting="language"
                >

                    <span class="setting-icon">

                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M3 12h18"></path>
                            <path d="M12 3a14 14 0 0 1 0 18"></path>
                            <path d="M12 3a14 14 0 0 0 0 18"></path>
                        </svg>

                    </span>

                    <span class="setting-text">

                        <strong>
                            Язык
                        </strong>

                        <small>
                            Русский
                        </small>

                    </span>

                    <span class="setting-arrow">
                        ›
                    </span>

                </button>


                <button
                    class="profile-setting-row"
                    data-setting="help"
                >

                    <span class="setting-icon">

                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M9.5 9a2.5 2.5 0 1 1 4.4 1.6c-.9.9-1.9 1.2-1.9 2.4"></path>
                            <path d="M12 17h.01"></path>
                        </svg>

                    </span>

                    <span class="setting-text">

                        <strong>
                            Помощь
                        </strong>

                        <small>
                            Поддержка пользователей
                        </small>

                    </span>

                    <span class="setting-arrow">
                        ›
                    </span>

                </button>

            </div>

        </section>

    `;


    app.appendChild(profileScreen);


    /* =========================
       НАЗАД
    ========================= */

    document
        .getElementById("profileBackButton")
        .addEventListener("click", () => {

            haptic("light");

            showHome();

            setActiveNav(
                document.querySelector(".nav-item.active")
            );

        });


    /* =========================
       НАСТРОЙКИ
    ========================= */

    document
        .getElementById("profileSettingsButton")
        .addEventListener("click", () => {

            haptic("light");

            alert(
                "Настройки\n\n" +
                "Здесь будут дополнительные настройки аккаунта."
            );

        });


    /* =========================
       РЕДАКТИРОВАНИЕ
    ========================= */

    document
        .getElementById("editProfileButton")
        .addEventListener("click", () => {

            haptic("light");

            alert(
                "Редактирование профиля\n\n" +
                "Позже здесь можно будет изменить информацию профиля."
            );

        });


    /* =========================
       ВКЛАДКИ
    ========================= */

    const tabs =
        profileScreen.querySelectorAll(".profile-tab");

    const content =
        profileScreen.querySelector("#profileContent");


    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            haptic("light");

            tabs.forEach((item) => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const type =
                tab.dataset.tab;


            if (type === "profile") {

                content.innerHTML = `

                    <div class="profile-card">

                        <div class="profile-card-title">
                            О себе
                        </div>

                        <p class="profile-about">
                            Добро пожаловать в Game Market!
                            Здесь будет отображаться информация
                            о вашем профиле.
                        </p>

                        <div class="profile-tags">
                            <span>Игры</span>
                            <span>Покупки</span>
                            <span>Избранное</span>
                        </div>

                    </div>

                    <div class="profile-card">

                        <div class="profile-card-title">
                            Последняя активность
                        </div>

                        <div class="activity-empty">

                            <div class="activity-empty-icon">

                                <svg viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <path d="M12 7v5l3 2"></path>
                                </svg>

                            </div>

                            <div>

                                <strong>
                                    Пока здесь пусто
                                </strong>

                                <p>
                                    Активность появится после
                                    первых действий в магазине.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div class="profile-card">

                        <div class="profile-card-title">
                            Настройки
                        </div>

                        <button class="profile-setting-row">

                            <span class="setting-icon">
                                ⚙
                            </span>

                            <span class="setting-text">

                                <strong>
                                    Настройки аккаунта
                                </strong>

                                <small>
                                    Управление профилем
                                </small>

                            </span>

                            <span class="setting-arrow">
                                ›
                            </span>

                        </button>

                    </div>

                `;

                return;
            }


            if (type === "purchases") {

                content.innerHTML = `

                    <div class="profile-card empty-page">

                        <div class="empty-page-icon">

                            <svg viewBox="0 0 24 24">
                                <path d="M6 3h12l2 4H4z"></path>
                                <path d="M5 7h14v13H5z"></path>
                                <path d="M9 11h6"></path>
                            </svg>

                        </div>

                        <h2>
                            Покупок пока нет
                        </h2>

                        <p>
                            Здесь появятся товары,
                            которые вы купите в магазине.
                        </p>

                    </div>

                `;

                return;
            }


            if (type === "favorites") {

                content.innerHTML = `

                    <div class="profile-card empty-page">

                        <div class="empty-page-icon">

                            <svg viewBox="0 0 24 24">
                                <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3z"></path>
                            </svg>

                        </div>

                        <h2>
                            Избранное пусто
                        </h2>

                        <p>
                            Добавляйте понравившиеся
                            товары в избранное.
                        </p>

                    </div>

                `;

            }

        });

    });


    /* =========================
       НАСТРОЙКИ
    ========================= */

    profileScreen
        .querySelectorAll(".profile-setting-row")
        .forEach((row) => {

            row.addEventListener("click", () => {

                haptic("light");

                const setting =
                    row.dataset.setting;

                if (setting === "notifications") {
                    alert(
                        "Уведомления\n\n" +
                        "Здесь будут настройки уведомлений."
                    );
                }

                if (setting === "language") {
                    alert(
                        "Язык\n\n" +
                        "Сейчас выбран русский язык."
                    );
                }

                if (setting === "help") {
                    alert(
                        "Помощь\n\n" +
                        "Здесь будет служба поддержки."
                    );
                }

            });

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   ПРОФИЛЬ
========================= */

profileButton.addEventListener(
    "click",
    openProfile
);

profileNavButton.addEventListener(
    "click",
    openProfile
);


/* =========================
   КАТАЛОГ
========================= */

catalogButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(catalogButton);

        document
            .querySelector(".categories")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* =========================
   КОРЗИНА
========================= */

cartButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(cartButton);

        alert(
            "Корзина\n\n" +
            "Пока корзина пустая."
        );

    }
);


/* =========================
   ПОКУПКИ
========================= */

ordersButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(ordersButton);

        alert(
            "Мои покупки\n\n" +
            "У вас пока нет покупок."
        );

    }
);


/* =========================
   ПОИСК
========================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        const products =
            productGrid.querySelectorAll(
                ".product-card"
            );

        products.forEach((product) => {

            const text =
                product.innerText
                    .toLowerCase();

            product.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

    }
);


/* =========================
   КУПИТЬ
========================= */

document
    .querySelectorAll(".buy-button")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                haptic("medium");

                alert(
                    "Товар добавлен в корзину!"
                );

            }
        );

    });


/* =========================
   ВСЕ КАТЕГОРИИ
========================= */

allCategoriesButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(catalogButton);

        document
            .querySelector(".categories")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* =========================
   ВСЕ ТОВАРЫ
========================= */

allProductsButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(catalogButton);

        document
            .querySelector(".products")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* =========================
   ГЛАВНАЯ
========================= */

const homeButton =
    document.querySelector(".nav-item.active");

if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            haptic("light");

            setActiveNav(homeButton);

            showHome();

        }
    );

}
