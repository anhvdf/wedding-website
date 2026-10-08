/* =====================================================
   WEDDING WEBSITE - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   1. OPENING - MỞ THIỆP
===================================================== */

const openButton =
    document.getElementById("openButton");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("main-content");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


if (openButton && opening) {

    openButton.addEventListener(
        "click",
        function () {

            /* -------------------------
               Hiệu ứng đóng màn hình
            ------------------------- */

            opening.classList.add("hide");


            /* -------------------------
               Phát nhạc
            ------------------------- */

            if (weddingMusic) {

                weddingMusic
                    .play()
                    .then(function () {

                        if (musicButton) {

                            musicButton.classList.add(
                                "playing"
                            );

                        }

                    })
                    .catch(function (error) {

                        console.log(
                            "Không thể phát nhạc:",
                            error
                        );

                    });

            }


            /* -------------------------
               Sau 1 giây chuyển trang
            ------------------------- */

            setTimeout(
                function () {

                    opening.style.display =
                        "none";


                    if (mainContent) {

                        mainContent.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                },
                1000
            );

        }
    );

}


/* =====================================================
   2. MUSIC - NHẠC NỀN
===================================================== */

if (
    weddingMusic &&
    musicButton
) {

    musicButton.addEventListener(
        "click",
        function () {

            if (
                weddingMusic.paused
            ) {

                weddingMusic
                    .play()
                    .then(function () {

                        musicButton.classList.add(
                            "playing"
                        );

                    })
                    .catch(function (error) {

                        console.error(
                            "Music error:",
                            error
                        );

                    });

            }

            else {

                weddingMusic.pause();

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );


    weddingMusic.addEventListener(
        "play",
        function () {

            musicButton.classList.add(
                "playing"
            );

        }
    );


    weddingMusic.addEventListener(
        "pause",
        function () {

            musicButton.classList.remove(
                "playing"
            );

        }
    );

}


/* =====================================================
   3. COUNTDOWN
===================================================== */

/*
   Ví dụ:
   20/12/2026 lúc 17:30

   Tháng trong JavaScript:
   0 = tháng 1
   11 = tháng 12
*/

const weddingDate =
    new Date(
        2026,
        10,
        29,
        13,
        30,
        0
    ).getTime();


function updateCountdown() {

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    if (distance <= 0) {

        daysElement.innerText = "00";

        hoursElement.innerText = "00";

        minutesElement.innerText = "00";

        secondsElement.innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            )
            /
            1000
        );


    daysElement.innerText =
        String(days).padStart(2, "0");


    hoursElement.innerText =
        String(hours).padStart(2, "0");


    minutesElement.innerText =
        String(minutes).padStart(2, "0");


    secondsElement.innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   4. SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =====================================================
   5. ALBUM LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );


const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


let currentImageIndex = 0;


function showLightboxImage() {

    if (
        galleryImages.length === 0 ||
        !lightboxImage
    ) {

        return;

    }


    const image =
        galleryImages[
            currentImageIndex
        ];


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt || "Ảnh cưới";

}


function closeLightbox() {

    if (!lightbox) {

        return;

    }


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "auto";

}


galleryImages.forEach(
    function (image, index) {

        image.parentElement.addEventListener(
            "click",
            function () {

                currentImageIndex =
                    index;


                showLightboxImage();


                if (lightbox) {

                    lightbox.classList.add(
                        "active"
                    );

                }


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            currentImageIndex--;


            if (
                currentImageIndex < 0
            ) {

                currentImageIndex =
                    galleryImages.length - 1;

            }


            showLightboxImage();

        }
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            currentImageIndex++;


            if (
                currentImageIndex >=
                galleryImages.length
            ) {

                currentImageIndex = 0;

            }


            showLightboxImage();

        }
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key === "ArrowLeft" &&
            lightboxPrev
        ) {

            lightboxPrev.click();

        }


        if (
            event.key === "ArrowRight" &&
            lightboxNext
        ) {

            lightboxNext.click();

        }

    }
);


/* =====================================================
   6. RSVP - GOOGLE SHEETS
===================================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz1xCuyXskogXIBEx0jYyF9UOdo-U9t-o4AZMvJZS91svf3ifrBBFA9FCCu_PhFe1wo/exec";


const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


const rsvpSuccess =
    document.getElementById(
        "rsvpSuccess"
    );


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const guestName =
                document
                    .getElementById(
                        "guestName"
                    )
                    .value
                    .trim();


            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            const guestCount =
                document
                    .getElementById(
                        "guestCount"
                    )
                    .value;


            const guestMessage =
                document
                    .getElementById(
                        "guestMessage"
                    )
                    .value
                    .trim();


            if (!guestName) {

                alert(
                    "Vui lòng nhập họ và tên."
                );

                return;

            }


            if (!attendance) {

                alert(
                    "Vui lòng chọn xác nhận tham dự."
                );

                return;

            }


            const data =
                new URLSearchParams();


            data.append(
                "guestName",
                guestName
            );


            data.append(
                "attendance",
                attendance.value
            );


            data.append(
                "guestCount",
                guestCount
            );


            data.append(
                "guestMessage",
                guestMessage
            );


            console.log(
                "Đang gửi RSVP:",
                {
                    guestName:
                        guestName,

                    attendance:
                        attendance.value,

                    guestCount:
                        guestCount,

                    guestMessage:
                        guestMessage
                }
            );


            const submitButton =
                rsvpForm.querySelector(
                    ".rsvp-button"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "ĐANG GỬI...";

            }


            fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    body: data,

                    mode: "no-cors"
                }
            )
            .then(
                function () {

                    rsvpForm.style.display =
                        "none";


                    if (rsvpSuccess) {

                        rsvpSuccess.classList.add(
                            "show"
                        );

                    }


                    rsvpForm.reset();

                }
            )
            .catch(
                function (error) {

                    console.error(
                        "RSVP ERROR:",
                        error
                    );


                    alert(
                        "Không thể gửi xác nhận. Vui lòng thử lại."
                    );


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            'GỬI XÁC NHẬN <span>♥</span>';

                    }

                }
            );

        }
    );

}


/* =====================================================
   7. COPY BANK ACCOUNT
===================================================== */

const copyButtons =
    document.querySelectorAll(
        ".copy-button"
    );


copyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            async function () {

                const account =
                    button.dataset.account;


                const message =
                    button.parentElement
                        .querySelector(
                            ".copy-message"
                        );


                try {

                    await navigator
                        .clipboard
                        .writeText(
                            account
                        );


                    if (message) {

                        message.innerText =
                            "Đã sao chép số tài khoản ♥";


                        setTimeout(
                            function () {

                                message.innerText =
                                    "";

                            },
                            2500
                        );

                    }

                }

                catch (error) {

                    console.error(
                        "Copy error:",
                        error
                    );


                    if (message) {

                        message.innerText =
                            "Không thể sao chép.";

                    }

                }

            }
        );

    }
);


/* =====================================================
   8. FALLING PETALS
===================================================== */

function createPetal() {

    const petal =
        document.createElement(
            "div"
        );


    petal.className =
        "petal";


    petal.innerText =
        Math.random() > 0.5
            ? "❀"
            : "♥";


    petal.style.left =
        Math.random() * 100 +
        "vw";


    petal.style.fontSize =
        (
            10 +
            Math.random() * 14
        )
        +
        "px";


    petal.style.animationDuration =
        (
            6 +
            Math.random() * 7
        )
        +
        "s";


    petal.style.animationDelay =
        Math.random() * 2 +
        "s";


    document.body.appendChild(
        petal
    );


    setTimeout(
        function () {

            petal.remove();

        },
        15000
    );

}


setInterval(
    createPetal,
    1200
);


/* =====================================================
   9. BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 600
            ) {

                backToTop.classList.add(
                    "show"
                );

            }

            else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   END
===================================================== */

console.log(
    "Wedding website JavaScript loaded successfully."
);
/* =====================================================
   10. NAVIGATION MENU
===================================================== */

const weddingNav =
    document.getElementById(
        "weddingNav"
    );


const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


/* Hiện menu khi cuộn */

if (weddingNav) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 300
            ) {

                weddingNav.classList.add(
                    "show"
                );

            }

            else {

                weddingNav.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* Mở / đóng menu mobile */

if (
    menuToggle &&
    weddingNav
) {

    menuToggle.addEventListener(
        "click",
        function () {

            weddingNav.classList.toggle(
                "menu-open"
            );

        }
    );

}


/* Đóng menu sau khi chọn */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (weddingNav) {

                        weddingNav.classList.remove(
                            "menu-open"
                        );

                    }

                }
            );

        }
    );

}

/* =====================================================
   WEDDING INFORMATION
===================================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}


/* Tên chú rể */

setText(
    "openingGroom",
    weddingInfo.groom
);

setText(
    "heroGroom",
    weddingInfo.groom
);


/* Tên cô dâu */

setText(
    "openingBride",
    weddingInfo.bride
);

setText(
    "heroBride",
    weddingInfo.bride
);


/* Ngày cưới */

setText(
    "openingDate",
    weddingInfo.date
);

setText(
    "heroDate",
    weddingInfo.date
);