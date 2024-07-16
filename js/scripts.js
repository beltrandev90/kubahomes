document.addEventListener("DOMContentLoaded", function () {
    const abrirMenu = document.getElementById('abrir');
    const cerrarMenu = document.getElementById('cerrar');
    const nav = document.getElementById('nav');
    const cerrarMenuBtn = document.querySelector('.cerrar-menu'); // Selecciona el botón de cerrar

    abrirMenu.addEventListener('click', function () {
        nav.classList.add('visible');
    });

    cerrarMenuBtn.addEventListener('click', function () { // Agrega evento de clic al botón de cerrar
        nav.classList.remove('visible');
    });

    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        const accordionHeader = tab.querySelector('.accordion-header');
        const accordionContent = tab.querySelector('.accordion-content');
        const expandIcon = accordionHeader.querySelector('.expand-icon');

        accordionHeader.addEventListener('mouseover', function () {
            // Cerrar todas las tarjetas abiertas
            tabs.forEach(t => {
                if (t !== tab && t.classList.contains('open')) {
                    t.classList.remove('open');
                    const content = t.querySelector('.accordion-content');
                    content.style.maxHeight = '0';
                    t.querySelector('.expand-icon').style.transform = 'rotate(0deg)';
                }
            });

            // Abrir la tarjeta actual si no está ya abierta
            if (!tab.classList.contains('open')) {
                tab.classList.add('open');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                expandIcon.style.transform = 'rotate(180deg)';
            }
        });

        accordionHeader.addEventListener('mouseleave', function () {
            // Cerrar la tarjeta al salir el ratón
            if (tab.classList.contains('open')) {
                tab.classList.remove('open');
                accordionContent.style.maxHeight = '0';
                expandIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Observador de Intersección para bienvenida
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    });

    const bienvenida = document.querySelector('.bienvenida');
    observer.observe(bienvenida);

    // Desplegable Footer
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".arrow-icon");

            if (content.style.display === "block") {
                content.style.display = "none";
                icon.classList.remove("up");
            } else {
                content.style.display = "block";
                icon.classList.add("up");
            }
        });
    });

    // Botón FAB
    var social_open = false
    window.addEventListener('load', () => {
        const menu = document.querySelector('.social-button');

        menu.addEventListener('click', () => {
            const icon = document.querySelector('#social-icon');
            if (social_open == true) {
                social_open = false;

                menu.title = menu.title.replace(/hide/, "expand")
                menu.classList.remove('social-button-open')
                icon.classList.remove('fa-times')
                icon.classList.add('fa-share-alt')

                var menu_point = document.querySelectorAll(".social-point");
                for (let i = 0; i < menu_point.length; i++) {
                    menu_point[i].classList.remove('social-point-open');
                    setTimeout(function () {
                        menu_point[i].hidden = true;
                    }, 800)
                }
            } else {
                social_open = true;

                menu.title = menu.title.replace(/expand/, "hide")
                menu.classList.add('social-button-open');
                icon.classList.remove('fa-share-alt')
                icon.classList.add('fa-times')

                var menu_point = document.querySelectorAll(".social-point");
                for (let i = 0; i < menu_point.length; i++) {
                    menu_point[i].hidden = false;
                    setTimeout(function () {
                        menu_point[i].classList.add('social-point-open');
                    }, 200)
                }
            }
        });
    })




    // const mainFab = document.getElementById('mainFab');
    // const fabLists = document.querySelectorAll('.fab-list');

    // mainFab.addEventListener('click', () => {
    //     fabLists.forEach(list => {
    //         list.classList.toggle('open');
    //     });
    // });

    //SECCIÓN PROYECTOS



});
