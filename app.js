const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const app = document.querySelector(".app");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const bottomNav = document.querySelector(".bottom-nav");

let currentScreen = "home";

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

function showHome() {
    currentScreen = "home";

    header.style.display = "";
    main.style.display = "";
    bottomNav.style.display = "";

    const accountsScreen = document.getElementById("accountsScreen");
    const profileScreen = document.getElementById("profileScreen");

    if (accountsScreen) {
        accountsScreen.remove();
    }

    if (profileScreen) {
        profileScreen.remove();
    }

    window.scrollTo(0, 0);
}

function createAccountsScreen() {
    const oldScreen = document.getElementById("accountsScreen");

    if (oldScreen) {
        oldScreen.remove();
    }

    header.style.display = "none";
    main.style.display = "none";
    bottomNav.style.display = "none";

    const screen = document.createElement("section");

    screen.id = "accountsScreen";
    screen.className = "extra-screen";

    screen.innerHTML = `
        <div class="extra-header">
            <button class="back-button" id="accountsBack">
                ←
            </button>

            <div>
                <div class="extra-title">Аккаунты</div>
                <div class="extra-subtitle">Выберите игру</div>
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

        <div id="accountsResults"></div>
    `;

    app.appendChild(screen);

    document
        .getElementById("accountsBack")
        .addEventListener("click", showHome);

    const input = document.getElementById("gameSearchInput");
    const button = document.getElementById("gameSearchButton");

    button.addEventListener("click", () => {
        searchAccounts(input.value);
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchAccounts(input.value);
        }
    });

    input.focus();
}

function searchAccounts(query) {
    const results = document.getElementById("accountsResults");

    if (!results) {
        return;
    }

    const search = query.trim().toLowerCase();

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

    const found = accounts.filter((account) =>
        account.game.toLowerCase().includes(search)
    );

    if (found.length === 0) {
        results.innerHTML = `
            <div class="empty-state">
                <div class="empty-title">
                    Ничего не найдено
                </div>

                <div class="empty-text">
                    По игре «${escapeHtml(query)}» пока нет аккаунтов.
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
                            src="assets/game-account.svg"
                            alt=""
                            onerror="this.style.display='none'"
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
                            <strong>${account.price} ₽</strong>

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

    document.querySelectorAll(".account-buy").forEach((button) => {
        button.addEventListener("click", () => {
            const title = button.dataset.title;

            if (tg?.showAlert) {
                tg.showAlert(`Вы выбрали: ${title}`);
            } else {
                alert(`Вы выбрали: ${title}`);
            }
        });
    });
}

function createProfileScreen() {
    const oldScreen = document.getElementById("profileScreen");

    if (oldScreen) {
        oldScreen.remove();
    }

    header.style.display = "none";
    main.style.display = "none";
    bottomNav.style.display = "none";

    const user = tg?.initDataUnsafe?.user || {};

    const firstName = user.first_name || "Пользователь";
    const lastName = user.last_name || "";
    const username = user.username
        ? `@${user.username}`
        : "username не указан";

    const avatar = user.photo_url
        ? `<img src="${user.photo_url}" alt="">`
        : `<div class="avatar-letter">${firstName.charAt(0).toUpperCase()}</div>`;

    const screen = document.createElement("section");

    screen.id = "profileScreen";
    screen.className = "extra-screen profile-screen";

    screen.innerHTML = `
        <div class="extra-header">

            <button class="back-button" id="profileBack">
                ←
            </button>

            <div>
                <div class="extra-title">Профиль</div>
                <div class="extra-subtitle">Ваш аккаунт</div>
            </div>

        </div>

        <div class="profile-card">

            <div class="profile-avatar">
                ${avatar}
            </div>

            <div class="profile-name">
                ${escapeHtml(firstName)} ${escapeHtml(lastName)}
            </div>

            <div class="profile-username">
                ${escapeHtml(username)}
            </div>

        </div>

        <div class="profile-stats">

            <div class="profile-stat">
                <strong>0</strong>
                <span>Покупок</span>
            </div>

            <div class="profile-stat">
                <strong>0</strong>
                <span>Избранное</span>
            </div>

            <div class="profile-stat">
                <strong>0 ₽</strong>
                <span>Потрачено</span>
            </div>

        </div>

        <div class="profile-section">

            <div class="profile-section-title">
                Аккаунт
            </div>

            <button class="profile-row">
                <span>Покупки</span>
                <span>›</span>
            </button>

            <button class="profile-row">
                <span>Избранное</span>
                <span>›</span>
            </button>

            <button class="profile-row">
                <span>Поддержка</span>
                <span>›</span>
            </button>

        </div>
    `;

    app.appendChild(screen);

    document
        .getElementById("profileBack")
        .addEventListener("click", showHome);

    window.scrollTo(0, 0);
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* Категории */

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card, index) => {
    card.addEventListener("click", () => {

        if (index === 0) {
            createAccountsScreen();
        } else {
            const names = [
                "Аккаунты",
                "Валюта",
                "Ключи",
                "Предметы"
            ];

            const name = names[index];

            if (tg?.showAlert) {
                tg.showAlert(
                    `${name}\n\nЭта категория пока находится в разработке.`
                );
            } else {
                alert(
                    `${name}\n\nЭта категория пока находится в разработке.`
                );
            }
        }
    });
});

/* Профиль сверху */

const profileButton = document.getElementById("profileButton");

if (profileButton) {
    profileButton.addEventListener("click", createProfileScreen);
}

/* Профиль снизу */

const profileNavButton = document.getElementById("profileNavButton");

if (profileNavButton) {
    profileNavButton.addEventListener("click", createProfileScreen);
}

/* Главная */

const homeButton = document.querySelector(".bottom-nav .nav-item");

if (homeButton) {
    homeButton.addEventListener("click", showHome);
}

/* Каталог */

const catalogButton = document.getElementById("catalogButton");

if (catalogButton) {
    catalogButton.addEventListener("click", () => {
        createAccountsScreen();
    });
}

/* Покупки */

const ordersButton = document.getElementById("ordersButton");

if (ordersButton) {
    ordersButton.addEventListener("click", () => {

        if (tg?.showAlert) {
            tg.showAlert("Покупок пока нет.");
        } else {
            alert("Покупок пока нет.");
        }
    });
}

/* Корзина */

const cartButton = document.getElementById("cartButton");

if (cartButton) {
    cartButton.addEventListener("click", () => {

        if (tg?.showAlert) {
            tg.showAlert("Корзина пока пустая.");
        } else {
            alert("Корзина пока пустая.");
        }
    });
}

/* Поиск на главной */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", () => {

        const query = searchInput.value.trim().toLowerCase();

        document.querySelectorAll(".product-card").forEach((card) => {

            const text = card.innerText.toLowerCase();

            if (text.includes(query)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
    });
}

/* Все категории */

const allCategories = document.getElementById("allCategories");

if (allCategories) {
    allCategories.addEventListener("click", () => {
        createAccountsScreen();
    });
}

/* Все товары */

const allProducts = document.getElementById("allProducts");

if (allProducts) {
    allProducts.addEventListener("click", () => {

        document
            .querySelector(".products")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });
}
