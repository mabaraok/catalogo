const currentPage = document.body.getAttribute("data-page");
const links = document.querySelectorAll("header a");

links.forEach((link) => {
  const href = link.getAttribute("href");
  if (href.includes(currentPage) && link.classList.contains("accesos")) {
    link.classList.add("activo");
  }
});

// Cambiamos "imagen" por "listaImagenes"
function agregarProducto(nombre, precio, listaImagenes, categoria, descProducto, linkConsultar, linkPersonalizar) {
  const contenedor = document.getElementById("productosContainer");

  // Si solo pasas una string, la convertimos en array para que el código no falle
  const imagenes = Array.isArray(listaImagenes) ? listaImagenes : [listaImagenes];
  let indiceActual = 0;

  // Crear div producto
  const productoDiv = document.createElement("div");
  productoDiv.classList.add("producto");
  // guardamos la categoria y el nombre en un atributo
  productoDiv.dataset.categoria = categoria;
  productoDiv.dataset.nombre = nombre.toLowerCase();
  productoDiv.dataset.todos = "Todos los productos";

  // --- Contenedor de Imagen y Flechas ---
  const imgContenedor = document.createElement("div");
  imgContenedor.classList.add("img-container");

  const img = document.createElement("img");
  img.src = imagenes[0];
  img.alt = nombre;
  img.classList.add("img-producto-principal");

  imgContenedor.appendChild(img);

  // Si hay más de una imagen, agregamos flechas
  if (imagenes.length > 1) {
    const btnAnt = document.createElement("button");
    btnAnt.innerHTML = "❮";
    btnAnt.classList.add("flecha-nav", "flecha-izq");

    const btnSig = document.createElement("button");
    btnSig.innerHTML = "❯";
    btnSig.classList.add("flecha-nav", "flecha-der");

    btnAnt.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita abrir el modal al tocar la flecha
      indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
      img.src = imagenes[indiceActual];
    });

    btnSig.addEventListener("click", (e) => {
      e.stopPropagation();
      indiceActual = (indiceActual + 1) % imagenes.length;
      img.src = imagenes[indiceActual];
    });

    imgContenedor.appendChild(btnAnt);
    imgContenedor.appendChild(btnSig);
  }

  // --- Zoom en la imagen ---
  if (img) {
    img.addEventListener("click", () => {
      const dialog = document.getElementById("lightboxNativo");
      const imgGrande = document.getElementById("imgGrande");

      imgGrande.src = img.src; // Copia la ruta de la imagen actual
      dialog.showModal();      // Abre el modal nativo
    });
  }

  // Nombre
  const titulo = document.createElement("h2");
  titulo.textContent = nombre;

  // Precio
  const precioTag = document.createElement("p");
  precioTag.textContent = `$${precio}`;

  // Texto de categoría abajo a la izquierda
  const categoriaTag = document.createElement("span");
  categoriaTag.classList.add("categoriaTag");
  categoriaTag.textContent = "- " + categoria;

  // Contenedor de botones
  const botonesDiv = document.createElement("div");
  botonesDiv.classList.add("botones");

  // texto descripción
  const descTexto = document.createElement("h3");
  descTexto.textContent = "Ver descripción";
  descTexto.id = "btnTxtVerDesc";

  // icono descripción
  const descIcon = document.createElement("span");
  descIcon.classList.add("material-symbols-outlined", "iconoDescProducto");
  descIcon.textContent = "keyboard_arrow_down";
  descIcon.classList.add("iconoDescProducto");

  // div icono y "Descripción"
  const descIconYTextoDiv = document.createElement("div");
  descIconYTextoDiv.id = "descIconYTextoDiv";

  descIconYTextoDiv.appendChild(descTexto);
  descIconYTextoDiv.appendChild(descIcon);

  // description producto
  const descripcionProducto = document.createElement("h4");
  descripcionProducto.classList.add("txtDesc");
  descripcionProducto.textContent = descProducto + "";
  descripcionProducto.id = nombre;

  // Contenedor descripción
  const descDiv = document.createElement("div");
  descDiv.classList.add("descProducto");
  descDiv.id = nombre;

  descDiv.appendChild(descIconYTextoDiv);
  descDiv.appendChild(descripcionProducto);

  // Botón Consultar
  const btnConsultar = document.createElement("a");
  btnConsultar.textContent = "Consultar";
  btnConsultar.href = linkConsultar || "#";
  btnConsultar.classList.add("btnProducto");
  btnConsultar.target = "_blank";

  // Botón Personalizar
  const btnPersonalizar = document.createElement("a");
  btnPersonalizar.textContent = "Personalizar";
  btnPersonalizar.href = linkPersonalizar || "#";
  btnPersonalizar.classList.add("btnProducto");
  btnPersonalizar.classList.add("btnPersonalizar");
  btnPersonalizar.target = "_blank";
  // guardamos el nombre del producto en un atributo
  btnPersonalizar.dataset.nombre = nombre;

  // Agregar botones al contenedor
  botonesDiv.appendChild(btnConsultar);
  botonesDiv.appendChild(btnPersonalizar);

  productoDiv.appendChild(imgContenedor);
  productoDiv.appendChild(img);
  productoDiv.appendChild(descDiv);
  productoDiv.appendChild(titulo);
  productoDiv.appendChild(precioTag);
  productoDiv.appendChild(botonesDiv);
  productoDiv.appendChild(categoriaTag);

  // Agregar al contenedor principal
  contenedor.appendChild(productoDiv);

}

function linkMail(nombreProducto) {
  return ("https://mail.google.com/mail/u/0/?fs=1&to=mabara.contacto@gmail.com&su=Producto+personalizado:+" + nombreProducto + "&body=Dejanos+tu+nombre+y+celular+para+contactarte!%0ANombre:%0ACelular:%0A%0ADescribi+en+este+espacio+como+sería+el+producto+personalizado,+también+podes+añadir+imágenes+de+referencia.&tf=cm")
}


function linkMailTo(nombreProducto) {
  const destinatario = "mabara.contacto@gmail.com";
  const asunto = encodeURIComponent("Producto personalizado: " + nombreProducto);

  // Usamos %0A para los saltos de línea
  const cuerpo = encodeURIComponent(
    "Dejanos tu nombre y celular para contactarte!" + "\n" +
    "Nombre:\n" +
    "Celular:" + "\n\n" +
    "Describi en este espacio como sería el producto personalizado, también podes añadir imágenes de referencia."
  );

  return `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
}

function linkWpp(nombreProducto) {
  return ("https://api.whatsapp.com/send/?phone=5491126848312&text=Hola%2C+me+interesa+el+producto:+*" + nombreProducto + "*&type=phone_number&app_absent=0")
}

const buscador = document.getElementById("inputSearch");

if (buscador) {

  // Agregando productos
  agregarProducto("Corte y grabado de piezas para maquetas", 0, "./css/media/productos/corte de piezas.png", "Piezas para armado de maquetas", "Materiales posibles: MDF, Carton, Papel u otros\n\nMedidas maximas: 40cm x 40cm\nEspesor maximo: 6mm\n\n(Consultar para saber el costo)", linkWpp("Corte y grabado de piezas para maquetas"), linkMail("Corte y grabado de piezas para maquetas"));
  agregarProducto("Posavasos personalizados", 2000, ["./css/media/productos/posavasos/1.jpg", "./css/media/productos/posavasos/2.jpg"], "Posavasos", "Material: corcho\n\nDiametro: 10cm\nEspesor: 6mm\n\n1 x $2000\n3 x $5000\n Mas de 3 = $1500 c/u", linkWpp("Posavasos personalizados"), linkMail("Posavasos personalizados"));
  agregarProducto("Colgante - Fases lunares", 10000, ["./css/media/productos/colganteLunar/colganteluna1.png", "./css/media/productos/colganteLunar/colganteluna2.png"], "Colgantes y atrapasueños", "Material: MDF\n\nAncho: 15cm\nLargo: 80cm", linkWpp("Colgante - Fases lunares"), linkMail("Colgante - Fases lunares"));
  agregarProducto("Colgante - Naturaleza", 10000, ["./css/media/productos/colgante naturaleza.png"], "Colgantes y atrapasueños", "Material: MDF\n\nDiametro (plato): 25cm\nAlto: 50cm", linkWpp("Colgante - Naturaleza"), linkMail("Colgante - Naturaleza"));
  agregarProducto("Lampara velador personalizada", 15000, ["./css/media/productos/lampVelador/lampVel1.png", "./css/media/productos/lampVelador/lampVel2.png", "./css/media/productos/lampVelador/lampVel3.png"], "Lamparas", "Material: MDF\n\nBase: 20cm x 20cm\nAlto: 30cm\n\nIncluye 2 pilas AA para la iluminación", linkWpp("Lampara velador personalizada"), linkMail("Lampara velador personalizada"));
  agregarProducto("Souvenir/Regalo personalizado", 7000, ["./css/media/productos/decoracion bebe.jpg"], "Souvenirs y regalos", "Material principal: MDF\n\n(Consultar para saber el costo de souvenirs personalizados)", linkWpp("Souvenir/Regalo personalizado"), linkMail("Souvenir/Regalo personalizado"));
  agregarProducto("Reloj personalizado - Equipos de futbol", 30000, ["./css/media/productos/relojRiver/reloj river.jpg", "./css/media/productos/relojRiver/relojPersoRiver.jpeg"], "Relojes", "Material: MDF\n\nDiametro: 25cm (maximo 39cm)\n\nIncluye 4 pilas AA para la iluminación y el reloj", linkWpp("Reloj Iluminado - Equipos de futbol"), linkMail("Reloj Iluminado - Equipos de futbol"));
  agregarProducto("Reloj iluminado - Rock nacional", 35000, ["./css/media/productos/relojRock/1.jpg", "./css/media/productos/relojRock/2.jpg"], "Relojes", "Material: MDF\n\nDiametro: 39cm\n\nIncluye 4 pilas AA para la iluminación y el reloj", linkWpp("Reloj Iluminado - Rock nacional"), linkMail("Reloj Iluminado - Rock nacional"));
  agregarProducto("Reloj iluminado - con logo", 35000, ["./css/media/productos/reloj gym z.jpg"], "Relojes", "Material: MDF\n\nDiametro: 39cm\n\nIncluye 4 pilas AA para la iluminación y el reloj", linkWpp("Reloj iluminado - con logo"), linkMail("Reloj iluminado - con logo"));
  agregarProducto("Reloj iluminado - con foto", 35000, ["./css/media/productos/relojConFoto.jpeg"], "Relojes", "Material: MDF y papel fotografico\n\nDiametro: 28cm (hasta 39cm)\n\nIncluye 4 pilas AA para la iluminación y el reloj", linkWpp("Reloj iluminado - con foto"), linkMail("Reloj iluminado - con foto"));
  agregarProducto("Reloj tematico - Buho", 30000, ["./css/media/productos/reloj buho.png"], "Relojes", "Material: MDF\n\nAlto: 37,5cm\nAncho: 25,5cm\n\nIncluye 1 pila AA para el reloj", linkWpp("Reloj tematico - búho"), linkMail("Reloj tematico - búho"));
  agregarProducto("Reloj tematico - Mi vecino totoro", 30000, ["./css/media/productos/reloj totoro.jpg"], "Relojes", "Material: MDF\n\nDiametro: 25cm (hasta 39cm)\n\nIncluye 1 pila AA para el reloj", linkWpp("Reloj tematico - Mi vecino totoro"), linkMail("Reloj tematico - Mi vecino totoro"));
  agregarProducto("Llavero personalizado", 1500, ["./css/media/productos/llavero.jpg"], "Llaveros", "Material: MDF\n\n(Consultar para saber el costo por mayor)", linkWpp("Llavero personalizado"), linkMail("Llavero personalizado"));
  agregarProducto("Marcador de pagina personalizado", 2500, ["./css/media/productos/marcPaginaEternauta.jpg", "./css/media/productos/marcKratos/2.jpg"], "Marcadores de pagina", "Material: MDF\n\nAncho: 5cm\nAlto: 15cm", linkWpp("Marcador de pagina personalizado"), linkMail("Marcador de pagina personalizado"));
  agregarProducto("Mesa ratona rustica", 60000, ["./css/media/productos/mesaRatona/1.jpeg", "./css/media/productos/mesaRatona/2.jpeg", "./css/media/productos/mesaRatona/3.jpeg", "./css/media/productos/mesaRatona/4.jpeg"], "Otros", "Material: Madera rustica\nColor: Nogal oscuro\n\nAncho: 80cm\nLargo: 109cm\nAlto: 38cm", linkWpp("Mesa ratona rustica"));

  const categorias = document.querySelectorAll("#divCategorias .categoriaSt");

  // busqueda sin resultados
  const noResultsDiv = document.getElementById('sinResultados');

  categorias.forEach(cat => {
    cat.addEventListener("click", () => {
      const categoriaSeleccionada = cat.textContent.trim();

      let encontrados = 0;

      document.querySelectorAll(".producto").forEach(prod => {

        if (prod.dataset.todos === categoriaSeleccionada) {
          // Mostrar todos
          prod.style.display = "block";
        } else if (prod.dataset.categoria === categoriaSeleccionada) {
          // Mostrar solo los que coinciden
          prod.style.display = "block";
        } else {
          // Ocultar el resto
          prod.style.display = "none";
        }

        // Lógica combinada para simplificar
        const esTodo = prod.dataset.todos === categoriaSeleccionada;
        const esCategoria = prod.dataset.categoria === categoriaSeleccionada;

        if (esTodo || esCategoria) {
          // lo mostramos
          prod.style.display = "block";

          // Solo sumamos si el producto se muestra
          encontrados++;
        } else {
          prod.style.display = "none";
        }
      });


      if (encontrados === 0) {
        noResultsDiv.style.display = "flex"
        noResultsDiv.style.flexDirection = "column"
      } else {
        noResultsDiv.style.display = "none"
      }
    });
  });

  buscador.addEventListener("input", () => {
    const query = buscador.value.toLowerCase().trim();

    let encontrados = 0;

    document.querySelectorAll(".producto").forEach(prod => {
      const nombre = prod.dataset.nombre;
      const categoria = prod.dataset.categoria;

      if (nombre.includes(query) || categoria.includes(query)) {
        prod.style.display = "block"; // mostrar

        // Sumamos al contador porque este producto es visible
        encontrados++;
      } else {
        prod.style.display = "none"; // ocultar
      }
    });

    // Control del mensaje "No resultados" fuera del bucle
    if (encontrados === 0) {
      noResultsDiv.style.display = "flex";
      noResultsDiv.style.flexDirection = "column";
      // O si usas bootstrap: noResultsDiv.classList.remove('d-none');
    } else {
      noResultsDiv.style.display = "none";
      // O si usas bootstrap: noResultsDiv.classList.add('d-none');
    }
  });

  /*
  const btnViewCategorias = document.getElementById("btnViewCategorias");
  const divCategorias = document.getElementById("divControlesCategorias")

  btnViewCategorias.addEventListener("click", () => {
    if (divCategorias.style.display !== 'none') {
      btnViewCategorias.innerHTML = "Ver categorías"
      divCategorias.style.display = "none"
    } else {
      btnViewCategorias.innerHTML = "Ocultar categorías"
      divCategorias.style.display = "flex"
    }
  });
  */

}

const flecha = document.getElementById("toTopIcon");

if (flecha) {
  // Mostrar la flecha al hacer scroll
  window.addEventListener("scroll", () => {

    if (window.scrollY > 2000) {
      flecha.style.display = "block";
    } else {
      flecha.style.display = "none";
    }
  });

  if (document.getElementById("toTopIcon")) {
    // Scroll al top
    document.getElementById("toTopIcon").addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Seleccionamos el carrusel y el elemento de texto
const myCarousel = document.getElementById('carouselExampleCaptions');
const tituloFooter = document.getElementById('textoFooter');

if (myCarousel) {
  // Escuchamos el evento 'slide.bs.carousel' de Bootstrap
  myCarousel.addEventListener('slide.bs.carousel', function (event) {

    // 'event.relatedTarget' es el elemento HTML del slide que va a entrar (el siguiente)
    const siguienteSlide = event.relatedTarget;

    // Obtenemos el texto que guardamos en el atributo data-titulo
    const nuevoTexto = siguienteSlide.getAttribute('data-titulo');

    tituloFooter.innerText = nuevoTexto;
  });
}

// desplegar descripción del producto

const descProducto = document.querySelectorAll(".descProducto");
const txtDesc = document.querySelectorAll(".txtDesc");

if (descProducto) {

  descProducto.forEach(desc => {
    desc.addEventListener("click", () => {
      desc.classList.toggle("descProductoExpandido");
      txtDesc.forEach(txt => {
        if (txt.id === desc.id) {
          txt.style.display = txt.style.display === "block" ? "none" : "block";
        }
      });

      const descTexto = desc.querySelector("#btnTxtVerDesc")
      const descIcon = desc.querySelector(".iconoDescProducto");
      const descProducto = desc.querySelector(".descProducto");

      descTexto.textContent = descTexto.textContent === "Ver descripción" ? "Ocultar descripción" : "Ver descripción";

      descIcon.textContent = descIcon.textContent === "keyboard_arrow_down" ? "keyboard_arrow_up" : "keyboard_arrow_down";

    });
  });

  function scrollCategorias(distancia) {
    const contenedor = document.getElementById('divCategorias');

    // Calculamos el máximo scroll posible
    // (Ancho total del contenido - Ancho visible del contenedor)
    const scrollMaximo = contenedor.scrollWidth - contenedor.clientWidth;

    if (distancia > 0 && contenedor.scrollLeft >= scrollMaximo - 5) {
      // Si clickeás a la derecha y estás al final (con margen de 5px), vuelve al inicio
      contenedor.scrollTo({ left: 0, behavior: 'smooth' });
    }
    else if (distancia < 0 && contenedor.scrollLeft <= 5) {
      // Si clickeás a la izquierda y estás al inicio, va al final
      contenedor.scrollTo({ left: scrollMaximo, behavior: 'smooth' });
    }
    else {
      // Comportamiento normal de desplazamiento
      contenedor.scrollBy({ left: distancia, behavior: 'smooth' });
    }
  }

}

// Lógica para cerrar el Lightbox
const lightbox = document.getElementById("lightboxNativo");
const btnCerrar = document.getElementById("cerrarLightbox");

if (lightbox) {
  // Cerrar al hacer clic en la X
  btnCerrar.addEventListener("click", () => lightbox.close());

  // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });

}

function actualizarLink() {
  const btns = document.querySelectorAll(".btnPersonalizar");
  const ancho = window.innerWidth;

  btns.forEach(btn => {
    if (btn) {
      const nombreProducto = btn.dataset.nombre;

      if (ancho < 1600) {
        btn.href = linkMailTo(nombreProducto);
      } else {
        btn.href = linkMail(nombreProducto);
      }
    }
  });

}

// Ejecutar al cargar y al redimensionar
window.addEventListener("resize", actualizarLink);
actualizarLink();
