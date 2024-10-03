document.addEventListener('DOMContentLoaded', () => {
  // Escucha el evento de scroll en la ventana
  window.addEventListener('scroll', function () {
    const nav = document.querySelector('.nav-container');

    // Si el scroll supera los 50px, se añade la clase 'scrolled' al menú de navegación
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Maneja el evento de clic en el menú hamburguesa para mostrar u ocultar el menú para celulares
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMobile = document.getElementById('navMobile');
  hamburgerMenu.addEventListener('click', () => {
    navMobile.classList.toggle('show');
  });

  // Selecciona todas las categorías de habilidades
  const skillCategories = document.querySelectorAll('.skill-category');

  // Frases a escribir en la animación de tipeo
  const textArray = [
    'Desarrollador Front-End ',
    'Desarrollador Mobile ',
    'Desarrollador Full Stack ',
  ];

  // Configuraciones de tiempos para la animación de tipeo
  const typingSpeed = 150; // Velocidad al escribir (milisegundos)
  const erasingSpeed = 100; // Velocidad al borrar
  const delayBetweenWords = 2000; // Retraso antes de borrar
  const cursorBlinkSpeed = 400; // Velocidad de parpadeo del cursor

  let textIndex = 0; // Índice del texto actual
  let charIndex = 0; // Índice del carácter actual
  let isBlinking = false; // Estado del parpadeo del cursor

  const typewriterSpan = document.getElementById('typewriter');

  // Crea el cursor parpadeante y lo coloca después del span donde se escribe
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  typewriterSpan.after(cursor);

  // Función que escribe el texto letra por letra
  function type() {
    if (charIndex < textArray[textIndex].length) {
      if (!isBlinking) {
        cursorBlink();
      }
      typewriterSpan.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Al terminar de escribir, parpadea dos veces antes de borrar
      setTimeout(() => {
        stopCursorBlink();
        setTimeout(erase, delayBetweenWords);
      }, 2 * cursorBlinkSpeed);
    }
  }

  // Función que borra el texto letra por letra
  function erase() {
    if (charIndex > 0) {
      typewriterSpan.textContent = textArray[textIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textIndex = (textIndex + 1) % textArray.length; // Pasa a la siguiente frase
      setTimeout(type, typingSpeed);
    }
  }

  // Función para hacer parpadear el cursor
  function cursorBlink() {
    if (!isBlinking) {
      isBlinking = true;
      cursor.style.animation = `blink ${cursorBlinkSpeed}ms step-end infinite`;
    }
  }

  // Detener el parpadeo del cursor
  function stopCursorBlink() {
    cursor.style.animation = 'none';
    isBlinking = false;
  }

  // Iniciar la animación de tipeo
  setTimeout(type, typingSpeed);

  // Evento para hacer scroll suave hacia arriba al hacer clic en el botón 'scrollToTop'
  document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // IntersectionObserver para observar si las categorías de habilidades son visibles en el viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Añade la clase 'visible' cuando el elemento entra en el viewport
          observer.unobserve(entry.target); // Deja de observar una vez que se anima
        }
      });
    },
    {
      threshold: 0.1, // 10% del elemento debe ser visible para activar la animación
    }
  );

  // Observa cada categoría de habilidades
  skillCategories.forEach((category) => {
    observer.observe(category);
  });
});
