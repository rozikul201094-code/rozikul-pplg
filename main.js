/* ================================
   DARK / LIGHT MODE
================================ */

(function () {

    const root = document.documentElement;
    const themeBtn = document.getElementById("themeToggle");


    function isDark() {

        const attr = root.getAttribute("data-theme");

        if (attr === "dark") {
            return true;
        }

        if (attr === "light") {
            return false;
        }

        return window
            .matchMedia("(prefers-color-scheme: dark)")
            .matches;
    }


    function syncIcon() {

        themeBtn.textContent =
            isDark() ? "☀️" : "🌙";
    }


    function getStored() {

        try {
            return localStorage.getItem(
                "portfolio-theme"
            );
        } catch (e) {
            return null;
        }
    }


    function setStored(value) {

        try {
            localStorage.setItem(
                "portfolio-theme",
                value
            );
        } catch (e) {}
    }


    const stored = getStored();


    if (stored) {
        root.setAttribute(
            "data-theme",
            stored
        );
    }


    syncIcon();


    themeBtn.addEventListener(
        "click",
        function () {

            const next =
                isDark()
                    ? "light"
                    : "dark";

            root.setAttribute(
                "data-theme",
                next
            );

            setStored(next);

            syncIcon();

        }
    );

})();



/* ================================
   MOBILE MENU
================================ */

(function () {

    const navToggle =
        document.getElementById("navToggle");

    const navLinks =
        document.getElementById("navLinks");


    navToggle.addEventListener(
        "click",
        function () {

            const open =
                navLinks.classList.toggle("open");

            navToggle.textContent =
                open ? "✕" : "☰";

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(function (a) {

            a.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "open"
                    );

                    navToggle.textContent = "☰";

                }
            );

        });

})();



/* ================================
   TERMINAL ANIMATION
================================ */

(function () {

    const body =
        document.getElementById(
            "terminalBody"
        );


    const reduced =
        window
            .matchMedia(
                "(prefers-reduced-motion: reduce)"
            )
            .matches;


    const sequence = [

        {
            type: "cmd",
            text: "whoami"
        },

        {
            type: "out",
            text: "mohammad_rozikul_bahren"
        },

        {
            type: "cmd",
            text: "cat fokus.txt"
        },

        {
            type: "out",
            text:
                "Jaringan · Linux · Keamanan Web · CTF"
        },

        {
            type: "cmd",
            text: "status --belajar"
        },

        {
            type: "out",
            text:
                "pemula: true  |  konsisten: true"
        }

    ];


    function typeInto(
        element,
        text,
        speed
    ) {

        return new Promise(
            function (resolve) {

                let i = 0;


                function step() {

                    if (i < text.length) {

                        element.textContent +=
                            text[i];

                        i++;

                        setTimeout(
                            step,
                            speed
                        );

                    } else {

                        resolve();

                    }

                }


                step();

            }
        );

    }


    function wait(ms) {

        return new Promise(
            function (resolve) {

                setTimeout(
                    resolve,
                    ms
                );

            }
        );

    }


    async function run() {

        for (
            let index = 0;
            index < sequence.length;
            index++
        ) {

            const item =
                sequence[index];


            const line =
                document.createElement(
                    "div"
                );


            line.className =
                "term-line";


            if (item.type === "cmd") {

                const prompt =
                    document.createElement(
                        "span"
                    );

                prompt.className =
                    "term-prompt";

                prompt.textContent = "$ ";


                line.appendChild(prompt);


                const command =
                    document.createElement(
                        "span"
                    );

                line.appendChild(command);


                body.appendChild(line);


                if (reduced) {

                    command.textContent =
                        item.text;

                } else {

                    await typeInto(
                        command,
                        item.text,
                        38
                    );

                }


                await wait(220);

            } else {

                line.textContent =
                    item.text;

                line.style.color =
                    "var(--muted)";

                body.appendChild(line);

                await wait(180);

            }

        }


        const cursorLine =
            document.createElement(
                "div"
            );

        cursorLine.className =
            "term-line";


        const promptEnd =
            document.createElement(
                "span"
            );

        promptEnd.className =
            "term-prompt";

        promptEnd.textContent = "$ ";


        cursorLine.appendChild(
            promptEnd
        );


        const cursor =
            document.createElement(
                "span"
            );

        cursor.className =
            "term-cursor";


        cursorLine.appendChild(
            cursor
        );


        body.appendChild(
            cursorLine
        );

    }


    run();

})();



/* ================================
   PROJECT FILTER
================================ */

(function () {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const category =
                        button.getAttribute(
                            "data-filter"
                        );


                    cards.forEach(
                        function (card) {

                            const show =
                                category === "semua" ||
                                card.getAttribute(
                                    "data-category"
                                ) === category;


                            card.style.display =
                                show ? "" : "none";

                        }
                    );

                }
            );

        }
    );

})();



/* ================================
   CONTACT FORM
================================ */

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("cfName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("cfEmail")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("cfMessage")
                    .value
                    .trim();


            const subject =
                encodeURIComponent(
                    "Pesan dari Portofolio - " +
                    name
                );


            const body =
                encodeURIComponent(
                    message +
                    "\n\nDari: " +
                    name +
                    " (" +
                    email +
                    ")"
                );


            window.location.href =
                "mailto:rozikul201094@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;

        }
    );



/* ================================
   FOOTER YEAR
================================ */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();



/* ================================
   BACK TO TOP
================================ */

document
    .getElementById("toTop")
    .addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );