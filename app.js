const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const products = productGrid.querySelectorAll(".product-card");

    products.forEach((product) => {
        const text = product.innerText.toLowerCase();

        product.style.display = text.includes(query)
            ? ""
            : "none";
    });
});


document.querySelectorAll(".buy-button").forEach((button) => {
    button.addEventListener("click", () => {
        if (tg) {
            tg.HapticFeedback.impactOccurred("light");
        }

        alert("🛒 Товар добавлен в корзину!");
    });
});


document.getElementById("profileButton").addEventListener("click", () => {
    alert("👤 Профиль");
});


document.getElementById("cartButton").addEventListener("click", () => {
    alert("🛒 Корзина");
});


document.getElementById("ordersButton").addEventListener("click", () => {
    alert("📦 Мои покупки");
});


document.getElementById("profileNavButton").addEventListener("click", () => {
    alert("👤 Профиль");
});


document.getElementById("catalogButton").addEventListener("click", () => {
    alert("📚 Каталог");
});


document.getElementById("allCategories").addEventListener("click", () => {
    alert("📚 Все категории");
});


document.getElementById("allProducts").addEventListener("click", () => {
    alert("🛍 Все товары");
});
