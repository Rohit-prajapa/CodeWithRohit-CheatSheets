// ==========================================================
// CodeWithRohit - Programming Cheat Sheets
// FINAL HOMEPAGE JAVASCRIPT - STEP 41
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // 1. SELECT ELEMENTS
    // ======================================================

    const navbar = document.querySelector(".navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinksContainer =
        document.getElementById("navLinks");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const cards =
        document.querySelectorAll(".card");

    const cardContainer =
        document.querySelector(".card-container");

    const sectionHeading =
        document.querySelector(".section-heading");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const sections =
        document.querySelectorAll(
            "header[id], section[id]"
        );


    // ======================================================
    // 2. MOBILE HAMBURGER MENU
    // ======================================================

    function openMobileMenu() {

        if (!menuToggle || !navLinksContainer) {
            return;
        }

        menuToggle.classList.add("active");

        navLinksContainer.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        if (!menuToggle || !navLinksContainer) {
            return;
        }

        menuToggle.classList.remove("active");

        navLinksContainer.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    function toggleMobileMenu() {

        if (!navLinksContainer) return;

        const isOpen =
            navLinksContainer.classList.contains(
                "active"
            );

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleMobileMenu();

            }
        );

    }


    // Close menu after clicking nav link

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    // Close menu when clicking outside

    document.addEventListener(
        "click",
        event => {

            if (
                !menuToggle ||
                !navLinksContainer
            ) {
                return;
            }

            if (
                !menuToggle.contains(event.target) &&
                !navLinksContainer.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );


    // Close menu when resized to desktop

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 750) {

                closeMobileMenu();

            }

        }
    );


    // ======================================================
    // 3. DARK / LIGHT THEME
    // ======================================================

    const THEME_KEY =
        "codewithrohit-theme";


    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light-theme"
            );

            if (themeIcon) {
                themeIcon.textContent = "☀️";
            }

            if (themeToggle) {

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark theme"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark theme"
                );

            }

        } else {

            document.body.classList.remove(
                "light-theme"
            );

            if (themeIcon) {
                themeIcon.textContent = "🌙";
            }

            if (themeToggle) {

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light theme"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light theme"
                );

            }

        }

    }


    // Load saved theme

    const savedTheme =
        localStorage.getItem(THEME_KEY);


    if (savedTheme) {

        applyTheme(savedTheme);

    } else {

        // Use device theme if user
        // hasn't selected one before.

        const prefersLight =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;

        applyTheme(
            prefersLight
                ? "light"
                : "dark"
        );

    }


    // Theme button click

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.contains(
                        "light-theme"
                    );

                const newTheme =
                    isLight
                        ? "dark"
                        : "light";


                applyTheme(newTheme);


                localStorage.setItem(
                    THEME_KEY,
                    newTheme
                );

            }
        );

    }


    // ======================================================
    // 4. NAVBAR SCROLL EFFECT
    // ======================================================

    function handleNavbarScroll() {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        {
            passive: true
        }
    );


    handleNavbarScroll();


    // ======================================================
    // 5. SMOOTH SCROLL
    // ======================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    closeMobileMenu();

                }
            );

        });


    // ======================================================
    // 6. ACTIVE NAVIGATION LINK
    // ======================================================

    function updateActiveNavigation() {

        let currentSection = "home";


        sections.forEach(section => {

            if (!section.id) return;


            const sectionTop =
                section.offsetTop - 160;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    // ======================================================
    // 7. CREATE SEARCH BOX
    // ======================================================

    let searchInput =
        document.getElementById(
            "cheatsheetSearch"
        );


    if (
        sectionHeading &&
        !searchInput
    ) {

        const searchWrapper =
            document.createElement(
                "div"
            );


        searchWrapper.className =
            "search-wrapper";


        searchWrapper.innerHTML = `
            <input
                type="search"
                id="cheatsheetSearch"
                class="search-input"
                placeholder="Search HTML, Java, DSA, DBMS..."
                autocomplete="off"
                aria-label="Search cheat sheets"
            >

            <span
                class="search-icon"
                aria-hidden="true"
            >
                🔍
            </span>
        `;


        sectionHeading.appendChild(
            searchWrapper
        );


        searchInput =
            document.getElementById(
                "cheatsheetSearch"
            );

    }


    // Search tooltip

    if (searchInput) {

        searchInput.setAttribute(
            "title",
            'Press "/" to search and Esc to clear'
        );

    }


    // ======================================================
    // 8. CREATE CHEAT SHEET COUNT
    // ======================================================

    let countElement =
        document.querySelector(
            ".cheatsheet-count"
        );


    if (
        sectionHeading &&
        !countElement
    ) {

        countElement =
            document.createElement(
                "div"
            );


        countElement.className =
            "cheatsheet-count";


        sectionHeading.appendChild(
            countElement
        );

    }


    // ======================================================
    // 9. CREATE NO-RESULT MESSAGE
    // ======================================================

    let resultMessage =
        document.querySelector(
            ".search-result-message"
        );


    if (
        cardContainer &&
        !resultMessage
    ) {

        resultMessage =
            document.createElement(
                "div"
            );


        resultMessage.className =
            "search-result-message";


        resultMessage.style.display =
            "none";


        cardContainer.parentNode.insertBefore(
            resultMessage,
            cardContainer
        );

    }


    // ======================================================
    // 10. CURRENT CATEGORY
    // ======================================================

    let activeCategory = "all";


    // ======================================================
    // 11. SAFE HTML FUNCTION
    // ======================================================

    function escapeHTML(value) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent = value;


        return element.innerHTML;

    }


    // ======================================================
    // 12. UPDATE COUNT
    // ======================================================

    function updateCheatSheetCount(
        visibleCount
    ) {

        if (!countElement) return;


        const searchValue =
            searchInput
                ? searchInput.value.trim()
                : "";


        if (
            searchValue !== "" ||
            activeCategory !== "all"
        ) {

            countElement.innerHTML = `
                <strong>${visibleCount}</strong>
                matching cheat sheet${
                    visibleCount !== 1
                        ? "s"
                        : ""
                }
            `;

        } else {

            countElement.innerHTML = `
                <strong>${cards.length}</strong>
                Cheat Sheets Available
            `;

        }

    }


    // ======================================================
    // 13. SEARCH + CATEGORY FILTER
    // ======================================================

    function filterCards() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleCards = 0;


        cards.forEach(card => {

            // ----------------------------------------------
            // Card title
            // ----------------------------------------------

            const title =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";


            // ----------------------------------------------
            // Card description
            // ----------------------------------------------

            const description =
                card.querySelector("p")
                    ?.textContent
                    .toLowerCase() || "";


            // ----------------------------------------------
            // Complete searchable text
            // ----------------------------------------------

            const searchableText =
                `${title} ${description}`;


            // ----------------------------------------------
            // Categories
            // ----------------------------------------------

            const categories =
                card.dataset.category
                    ?.toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean) || [];


            // ----------------------------------------------
            // Search match
            // ----------------------------------------------

            const matchesSearch =
                searchValue === "" ||
                searchableText.includes(
                    searchValue
                );


            // ----------------------------------------------
            // Category match
            // ----------------------------------------------

            const matchesCategory =
                activeCategory === "all" ||
                categories.includes(
                    activeCategory
                );


            // ----------------------------------------------
            // Final result
            // ----------------------------------------------

            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display =
                    "flex";

                visibleCards++;

            } else {

                card.style.display =
                    "none";

            }

        });


        // ==================================================
        // NO RESULTS
        // ==================================================

        if (resultMessage) {

            if (visibleCards === 0) {

                if (
                    searchValue !== ""
                ) {

                    resultMessage.innerHTML = `
                        No cheat sheet found for
                        "<strong>${
                            escapeHTML(
                                searchInput.value
                            )
                        }</strong>"
                    `;

                } else {

                    resultMessage.textContent =
                        "No cheat sheets available in this category.";

                }


                resultMessage.style.display =
                    "block";

            } else {

                resultMessage.style.display =
                    "none";

            }

        }


        updateCheatSheetCount(
            visibleCards
        );

    }


    // ======================================================
    // 14. SEARCH EVENT
    // ======================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    // ======================================================
    // 15. CATEGORY FILTER BUTTONS
    // ======================================================

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                // Remove active state

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                // Add active to clicked

                button.classList.add(
                    "active"
                );


                // Save selected category

                activeCategory =
                    button.dataset.filter ||
                    "all";


                // Apply filter

                filterCards();

            }
        );

    });


    // ======================================================
    // 16. KEYBOARD SHORTCUTS
    // ======================================================

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT" ||

                    activeElement.tagName ===
                        "TEXTAREA" ||

                    activeElement
                        .isContentEditable
                );


            // ==============================================
            // "/" = Focus search
            // ==============================================

            if (
                event.key === "/" &&
                !isTyping &&
                searchInput
            ) {

                event.preventDefault();


                searchInput.focus();


                document
                    .getElementById(
                        "cheatsheets"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }


            // ==============================================
            // ESCAPE
            // ==============================================

            if (
                event.key ===
                "Escape"
            ) {

                // Close menu

                closeMobileMenu();


                // Clear search

                if (
                    searchInput &&
                    searchInput.value !== ""
                ) {

                    searchInput.value = "";

                    filterCards();

                    searchInput.blur();

                }

            }

        }
    );


    // ======================================================
    // 17. CARD SCROLL ANIMATION
    // ======================================================

    if (
        "IntersectionObserver" in window
    ) {

        const cardObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "show-card"
                                    );


                                cardObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        cards.forEach(card => {

            card.classList.add(
                "hidden-card"
            );


            cardObserver.observe(
                card
            );

        });

    } else {

        cards.forEach(card => {

            card.classList.add(
                "show-card"
            );

        });

    }


    // ======================================================
    // 18. CREATE BACK TO TOP BUTTON
    // ======================================================

    let backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (!backToTop) {

        backToTop =
            document.createElement(
                "button"
            );


        backToTop.className =
            "back-to-top";


        backToTop.type =
            "button";


        backToTop.innerHTML =
            "↑";


        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );


        backToTop.setAttribute(
            "title",
            "Back to top"
        );


        document.body.appendChild(
            backToTop
        );

    }


    // ======================================================
    // 19. SHOW / HIDE BACK TO TOP
    // ======================================================

    function toggleBackToTop() {

        if (!backToTop) return;


        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        toggleBackToTop,
        {
            passive: true
        }
    );


    toggleBackToTop();


    // ======================================================
    // 20. BACK TO TOP CLICK
    // ======================================================

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    // ======================================================
    // 21. AUTOMATIC FOOTER YEAR
    // ======================================================

    const footerBottom =
        document.querySelector(
            ".footer-bottom"
        );


    if (footerBottom) {

        const paragraphs =
            footerBottom.querySelectorAll(
                "p"
            );


        if (paragraphs.length > 0) {

            const year =
                new Date().getFullYear();


            paragraphs[0].textContent =
                `© ${year} CodeWithRohit. All Rights Reserved.`;

        }

    }


    // ======================================================
    // 22. CARD BUTTON ACCESSIBILITY
    // ======================================================

    cards.forEach(card => {

        const button =
            card.querySelector(
                ".card-btn"
            );


        const heading =
            card.querySelector(
                "h3"
            );


        if (
            button &&
            heading
        ) {

            button.setAttribute(
                "aria-label",
                `View ${heading.textContent.trim()} cheat sheet`
            );

        }

    });


    // ======================================================
    // 23. HANDLE BROKEN IMAGES
    // ======================================================

    const cardImages =
        document.querySelectorAll(
            ".card-img"
        );


    cardImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";


                console.warn(
                    `Image not found: ${image.getAttribute(
                        "src"
                    )}`
                );

            }
        );

    });


    // ======================================================
    // 24. INITIAL FILTER
    // ======================================================

    filterCards();


    // ======================================================
    // 25. CONSOLE BRANDING
    // ======================================================

    console.log(
        "%c</> CodeWithRohit",
        [
            "font-size: 22px",
            "font-weight: bold",
            "color: #38bdf8"
        ].join(";")
    );


    console.log(
        `%c${cards.length} Cheat Sheets Loaded Successfully 🚀`,
        [
            "font-size: 13px",
            "color: #94a3b8"
        ].join(";")
    );


    console.log(
        "%cLearn • Code • Practice • Revise",
        [
            "font-size: 12px",
            "color: #64748b"
        ].join(";")
    );

});


// ==========================================================
// END - CodeWithRohit
// ==========================================================