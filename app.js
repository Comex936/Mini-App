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

const allCategoriesButton =
    document.getElementById("allCategories");

const allProductsButton =
    document.getElementById("allProducts");

const navItems =
    document.querySelectorAll(".nav-item");


/* =========================
   TELEGRAM USER
========================= */

const telegramUser =
    tg?.initDataUnsafe?.user || null;


/* =========================
   КАТЕГОРИИ
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


/* =========================
   HAPTIC
========================= */

function haptic(type = "light") {

    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred(type);
    }
}


/* =========================
   NAVIGATION
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
   HOME
========================= */

function showHome() {

    haptic("light");

    const welcomeTitle =
        document.querySelector(".welcome h1");

    const welcomeDescription =
        document.querySelector(".welcome p");

    const productsTitle =
        document.querySelector(".products .section-header h2");

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
   CATEGORY
========================= */

function openCategory(categoryName) {

    const category =
        categories[categoryName];

    if (!category) {
        return;
    }

    haptic("medium");

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
   CATEGORY BUTTONS
========================= */

categoryCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const categoryNames = [
            "accounts",
            "currency",
            "keys",
            "items"
        ];

        openCategory(
            categoryNames[index]
        );

    });

});


/* =========================
   PROFILE SCREEN
========================= */

function openProfile() {

    haptic("light");

    setActiveNav(profileNavButton);

    const app = document.querySelector(".app");

    if (!app) {
        return;
    }

    const oldProfile =
        document.getElementById("profileScreen");

    if (oldProfile) {
        oldProfile.remove();
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
        ? `<img src="${avatar}" alt="Аватар">`
        : `<div class="profile-avatar-placeholder">
                ${firstName.charAt(0).toUpperCase()}
           </div>`;

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
            >
                ←
            </button>

            <div class="profile-top-title">
                Профиль
            </div>

            <button
                class="profile-settings-button"
                id="profileSettingsButton"
            >
                ⚙
            </button>

        </div>


        <section class="profile-hero">

            <div class="profile-banner">

                <div class="profile-banner-glow"></div>

            </div>


            <div class="profile-main">

                <div class="profile-avatar">

                    ${avatarHTML}

                    <div class="profile-online"></div>

                </div>


                <div class="profile-user-info">

                    <h1>
                        ${fullName}
                        <span class="verified-badge">
                            ✓
                        </span>
                    </h1>

                    <p>
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
                ✎ &nbsp; Редактировать
            </button>

        </section>


        <section class="profile-stats">

            <div class="profile-stat">

                <strong>0</strong>

                <span>
                    Покупок
                </span>

            </div>


            <div class="profile-stat">

                <strong>0</strong>

                <span>
                    Заказов
                </span>

            </div>


            <div class="profile-stat">

                <strong>0</strong>

                <span>
                    Избранное
                </span>

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
                    Здесь появится информация
                    о пользователе.
                </p>


                <div class="profile-tags">

                    <span>
                        🎮 Игры
                    </span>

                    <span>
                        🛒 Покупки
                    </span>

                    <span>
                        ⭐ Избранное
                    </span>

                </div>

            </div>


            <div class="profile-card">

                <div class="profile-card-title">
                    Последняя активность
                </div>


                <div class="activity-empty">

                    <div class="activity-empty-icon">
                        ◷
                    </div>

                    <div>

                        <strong>
                            Пока здесь пусто
                        </strong>

                        <p>
                            Ваша активность появится
                            после первых действий.
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
                        ♧
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
                        A
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
                        ?
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

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* =========================
       BACK
    ========================= */

    document
        .getElementById("profileBackButton")
        .addEventListener(
            "click",
            () => {

                haptic("light");

                profileScreen.remove();

                showHome();

                setActiveNav(
                    document.querySelector(
                        ".nav-item.active"
                    )
                );

            }
        );


    /* =========================
       SETTINGS
    ========================= */

    document
        .getElementById("profileSettingsButton")
        .addEventListener(
            "click",
            () => {

                haptic("light");

                alert(
                    "⚙ Настройки\n\n" +
                    "Здесь появятся настройки аккаунта."
                );

            }
        );


    /* =========================
       EDIT PROFILE
    ========================= */

    document
        .getElementById("editProfileButton")
        .addEventListener(
            "click",
            () => {

                haptic("light");

                alert(
                    "✎ Редактирование профиля\n\n" +
                    "Позже здесь можно будет изменить " +
                    "описание и другие данные."
                );

            }
        );


    /* =========================
       TABS
    ========================= */

    const tabs =
        profileScreen.querySelectorAll(
            ".profile-tab"
        );

    const content =
        profileScreen.querySelector(
            "#profileContent"
        );

    tabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                haptic("light");

                tabs.forEach((item) => {
                    item.classList.remove("active");
                });

                tab.classList.add("active");

                const type =
                    tab.dataset.tab;

                if (type === "profile") {

                    location.reload();

                }

                if (type === "purchases") {

                    content.innerHTML = `

                        <div class="profile-card empty-page">

                            <div class="empty-page-icon">
                                ◫
                            </div>

                            <h2>
                                Покупок пока нет
                            </h2>

                            <p>
                                Здесь появятся ваши
                                покупки из магазина.
                            </p>

                        </div>

                    `;

                }

                if (type === "favorites") {

                    content.innerHTML = `

                        <div class="profile-card empty-page">

                            <div class="empty-page-icon">
                                ♡
                            </div>

                            <h2>
                                Избранное пусто
                            </h2>

                            <p>
                                Добавляйте интересные товары
                                в избранное.
                            </p>

                        </div>

                    `;

                }

            }
        );

    });


    /* =========================
       SETTINGS ROWS
    ========================= */

    profileScreen
        .querySelectorAll(".profile-setting-row")
        .forEach((row) => {

            row.addEventListener(
                "click",
                () => {

                    haptic("light");

                    const setting =
                        row.dataset.setting;

                    if (
                        setting ===
                        "notifications"
                    ) {

                        alert(
                            "🔔 Уведомления\n\n" +
                            "Настройки уведомлений будут здесь."
                        );

                    }

                    if (
                        setting ===
                        "language"
                    ) {

                        alert(
                            "Язык\n\n" +
                            "Сейчас выбран русский язык."
                        );

                    }

                    if (
                        setting ===
                        "help"
                    ) {

                        alert(
                            "Помощь\n\n" +
                            "Здесь будет служба поддержки."
                        );

                    }

                }
            );

        });

}


/* =========================
   PROFILE BUTTONS
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
   CATALOG
========================= */

catalogButton.addEventListener(
    "click",
    () => {

        haptic("light");

        setActiveNav(catalogButton);

        const categoriesSection =
            document.querySelector(".categories");

        if (categoriesSection) {

            categoriesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }
);


/* =========================
   CART
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
   ORDERS
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
   SEARCH
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
                product.innerText.toLowerCase();

            product.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

    }
);


/* =========================
   BUY BUTTONS
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
   ALL CATEGORIES
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
   ALL PRODUCTS
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
   HOME
========================= */

const homeButton =
    document.querySelector(
        ".nav-item.active"
    );

if (homeButton) {

    homeButton.addEventListener(
        "click",
        () => {

            haptic("light");

            showHome();

            setActiveNav(homeButton);

        }
    );

}
