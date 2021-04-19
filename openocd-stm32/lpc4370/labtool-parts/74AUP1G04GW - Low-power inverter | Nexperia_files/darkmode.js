var _darkMode = {
    init: function () {
        const toggle = document.querySelector(".dark-mode-toggle");
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (currentTheme === "light") {
            document.documentElement.classList.remove("dark");
        }

        toggle.addEventListener("click", function () {
            document.documentElement.classList.toggle("dark");
            const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
            localStorage.setItem("theme", theme);
        });
    }
}

_darkMode.init();