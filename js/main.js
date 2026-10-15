(function () {
  "use strict";

  const datos = typeof DATOS_TORNEO === "object" ? DATOS_TORNEO : {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatoMoneda = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0
  });
  const formatoNumero = new Intl.NumberFormat("es-MX");

  function formatear(valor, tipo) {
    return tipo === "moneda" ? formatoMoneda.format(valor) : formatoNumero.format(valor);
  }

  /* ---------- Contadores ---------- */
  function animarContador(el) {
    const meta = Math.max(0, Number(datos[el.dataset.counter]) || 0);
    const tipo = el.dataset.format;

    if (reduceMotion || meta === 0) {
      el.textContent = formatear(meta, tipo);
      return;
    }

    const duracion = 1800;
    const inicio = performance.now();

    function paso(ahora) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const easing = 1 - Math.pow(1 - t, 3);
      el.textContent = formatear(Math.round(meta * easing), tipo);
      if (t < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  const contadores = document.querySelectorAll("[data-counter]");
  // Valor final por defecto, por si el navegador no anima
  contadores.forEach(function (el) {
    el.textContent = formatear(Math.max(0, Number(datos[el.dataset.counter]) || 0), el.dataset.format);
  });

  /* ---------- Fecha de actualización ---------- */
  const fechaEl = document.getElementById("ultima-actualizacion");
  if (fechaEl && datos.ultimaActualizacion) {
    const partes = String(datos.ultimaActualizacion).split("-").map(Number);
    const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
    if (!isNaN(fecha)) {
      fechaEl.textContent = fecha.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          revealObserver.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

    const counterObserver = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          counterObserver.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });
    contadores.forEach(function (el) { counterObserver.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Aviso (toast) ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;
  function mostrarAviso(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2400);
  }

  /* ---------- Copiar al portapapeles ---------- */
  function copiar(texto, mensaje, seleccionable) {
    const exito = function () { mostrarAviso(mensaje); };
    const respaldo = function () {
      if (copiarRespaldo(texto)) {
        exito();
      } else {
        // Si el navegador no permite copiar, seleccionamos el texto para copiarlo a mano
        if (seleccionable) seleccionarTexto(seleccionable);
        mostrarAviso("No se pudo copiar automáticamente. Ya está seleccionado, cópialo manualmente.");
      }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(exito, respaldo);
    } else {
      respaldo();
    }
  }

  function seleccionarTexto(el) {
    const rango = document.createRange();
    rango.selectNodeContents(el);
    const seleccion = window.getSelection();
    seleccion.removeAllRanges();
    seleccion.addRange(rango);
  }

  function copiarRespaldo(texto) {
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  document.querySelectorAll("[data-copy]").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const tarjeta = boton.closest(".donate-card");
      const numero = tarjeta ? tarjeta.querySelector(".bank__number") : null;
      copiar(boton.dataset.copy, boton.dataset.copyMsg || "Copiado", numero);
    });
  });

  /* ---------- Compartir ---------- */
  const urlPagina = window.location.href.split("#")[0];
  const mensaje =
    "Este 16 de noviembre juguemos por algo más grande que el Disc Golf. Juguemos por Roney. " +
    "Torneo en Beneficio de Roney Hernández en el Ojo de Agua, Montemorelos, N.L. " +
    "Juega, dona y comparte: ";

  const whatsapp = document.getElementById("share-whatsapp");
  if (whatsapp) {
    whatsapp.href = "https://wa.me/?text=" + encodeURIComponent(mensaje + urlPagina);
  }

  const facebook = document.getElementById("share-facebook");
  if (facebook) {
    facebook.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(urlPagina);
  }

  const copiarEnlace = document.getElementById("share-copy");
  if (copiarEnlace) {
    copiarEnlace.addEventListener("click", function () {
      copiar(urlPagina, copiarEnlace.dataset.copyMsg || "Enlace copiado");
    });
  }
})();
