document.addEventListener("DOMContentLoaded", function () {
    console.log("Script cargado y DOM listo");
    const abrirMenu = document.getElementById('abrir');
    const cerrarMenu = document.getElementById('cerrar');
    const nav = document.getElementById('nav');
    const cerrarMenuBtn = document.querySelector('.cerrar-menu'); // Selecciona el botón de cerrar

    abrirMenu.addEventListener('click', function () {
        nav.classList.add('visible');
        cerrarMenu.classList.remove('hidden'); // Mostrar botón de cerrar
        abrirMenu.classList.add('hidden'); // Ocultar botón de abrir
    });

    cerrarMenuBtn.addEventListener('click', function () { // Agrega evento de clic al botón de cerrar
        nav.classList.remove('visible');
        cerrarMenu.classList.add('hidden'); // Ocultar botón de cerrar
        abrirMenu.classList.remove('hidden'); // Mostrar botón de abrir
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
    var social_open = false;

    window.addEventListener('load', () => {
        const menu = document.querySelector('.social-button');
        const footer = document.querySelector('footer');

        // Función para ajustar la posición del FAB
        function adjustFabPosition() {
            const footerRect = footer.getBoundingClientRect();
            const fabRect = menu.getBoundingClientRect();

            // Si el FAB se superpone con el footer, ajusta su posición
            if (footerRect.top < window.innerHeight) {
                menu.style.bottom = (window.innerHeight - footerRect.top + 25) + 'px';
            } else {
                menu.style.bottom = '25px';
            }
        }

        menu.addEventListener('click', () => {
            const icon = document.querySelector('#social-icon');
            const menu_point = document.querySelectorAll(".social-point");

            if (social_open) {
                social_open = false;
                menu.title = menu.title.replace(/hide/, "expand");
                menu.classList.remove('social-button-open');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-share-alt');

                for (let i = 0; i < menu_point.length; i++) {
                    menu_point[i].classList.remove('social-point-open');
                    setTimeout(function () {
                        menu_point[i].hidden = true;
                    }, 800);
                }
            } else {
                social_open = true;
                menu.title = menu.title.replace(/expand/, "hide");
                menu.classList.add('social-button-open');
                icon.classList.remove('fa-share-alt');
                icon.classList.add('fa-times');

                for (let i = 0; i < menu_point.length; i++) {
                    menu_point[i].hidden = false;
                    setTimeout(function () {
                        menu_point[i].classList.add('social-point-open');
                    }, 200);
                }
            }
        });

        // Ajustar la posición del FAB cuando se desplaza la página
        window.addEventListener('scroll', adjustFabPosition);

        // Asegurarse de ajustar la posición al cargar la página
        adjustFabPosition();
    });

    // GALERIA DE IMAGENES PAGINA DE INICIO
    const sliderContainer = document.querySelector('.slider-container');

    // Recorre cada image-wrapper
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
        const images = wrapper.querySelectorAll('img');
        let maxWidth = 0;
        let maxHeight = 0;

        images.forEach(img => {
            img.onload = () => {
                // Ajusta las dimensiones al cargar la imagen
                maxWidth = Math.max(maxWidth, img.naturalWidth);
                maxHeight = Math.max(maxHeight, img.naturalHeight);

                // Establece las dimensiones del wrapper según la imagen más grande
                wrapper.style.width = `${maxWidth}px`;
                wrapper.style.height = `${maxHeight}px`;

                // Ajusta el tamaño del contenedor padre (slider-container)
                sliderContainer.style.width = `${maxWidth}px`;
                sliderContainer.style.height = `${maxHeight}px`;

                // También ajusta el tamaño del divisor
                const divider = wrapper.querySelector(".divider");
                divider.style.height = `${maxHeight}px`;
            };

            // Si la imagen ya está cargada (por ejemplo, si está en caché)
            if (img.complete) {
                img.onload();
            }
        });

        // Evento para actualizar la posición del divider
        const sliderInput = wrapper.querySelector(".slider-input");
        const afterImage = wrapper.querySelector(".after");
        const divider = wrapper.querySelector(".divider");

        sliderInput.addEventListener("input", function () {
            const value = sliderInput.value;
            const max = sliderInput.max;
            const percent = (value / max) * 100;

            afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            divider.style.left = `calc(${percent}% - 1px)`; // Ajusta la posición teniendo en cuenta el ancho del divisor
        });

    });

    // SCRIPT PARA QUE EL CARROUSEL SE HAGA EN PANTALLA COMPLETA

    // Función para abrir el carrusel en pantalla completa
    window.openFullScreenCarousel = function (event, carouselId) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace

        // Obtén el elemento del carrusel
        var carousel = document.getElementById(carouselId);

        if (!carousel) {
            console.error('Carousel with ID', carouselId, 'not found.');
            return;
        }

        // Clona el contenido del carrusel
        var carouselClone = carousel.cloneNode(true);
        carouselClone.classList.remove('postcard__img');
        carouselClone.classList.add('fullscreen-carousel__img');

        // Asegúrate de que el nuevo carrusel tenga un ID único
        carouselClone.id = 'fullscreenCarouselInstance';

        // Ajusta los controles para que apunten al nuevo ID
        var controls = carouselClone.querySelectorAll('.carousel-control-prev, .carousel-control-next');
        controls.forEach(function (control) {
            var href = control.getAttribute('href');
            control.setAttribute('href', '#fullscreenCarouselInstance');
        });

        // Limpiar cualquier contenido anterior del contenedor de pantalla completa
        var fullScreenCarousel = document.getElementById('carouselContent');
        fullScreenCarousel.innerHTML = '';
        fullScreenCarousel.appendChild(carouselClone);

        // Mostrar el carrusel en pantalla completa
        document.getElementById('fullScreenCarousel').style.display = 'flex';

        // Inicializa el carrusel en pantalla completa usando el nuevo ID
        $(carouselClone).carousel();
    };

    // Función para cerrar el carrusel de pantalla completa
    window.closeFullScreen = function () {
        document.getElementById('fullScreenCarousel').style.display = 'none';
        document.getElementById('carouselContent').innerHTML = ''; // Limpiar contenido para evitar duplicación
    };

});
