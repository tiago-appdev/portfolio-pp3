document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', function () {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
      // Puedes ajustar el valor del scroll
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMobile = document.getElementById('navMobile');
  hamburgerMenu.addEventListener('click', () => {
    navMobile.classList.toggle('show');
  });
  const skillCategories = document.querySelectorAll('.skill-category');
  const textArray = [
    'Desarrollador Front-End ',
    'Desarrollador Mobile ',
    'Desarrollador Full Stack ',
  ];
  const typingSpeed = 150; // Velocidad al escribir (milisegundos)
  const erasingSpeed = 100; // Velocidad al borrar
  const delayBetweenWords = 2000; // Retraso antes de empezar a borrar
  const cursorBlinkSpeed = 400; // Tiempo de parpadeo del cursor
  let textIndex = 0;
  let charIndex = 0;
  let isBlinking = false;
  const typewriterSpan = document.getElementById('typewriter');
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  typewriterSpan.after(cursor);

  function type() {
    if (charIndex < textArray[textIndex].length) {
      if (!isBlinking) {
        cursorBlink();
      }
      typewriterSpan.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Cuando termine de escribir toda la frase, parpadea dos veces
      setTimeout(() => {
        stopCursorBlink();
        setTimeout(erase, delayBetweenWords);
      }, 2 * cursorBlinkSpeed);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriterSpan.textContent = textArray[textIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, typingSpeed);
    }
  }

  function cursorBlink() {
    if (!isBlinking) {
      isBlinking = true;
      cursor.style.animation = `blink ${cursorBlinkSpeed}ms step-end infinite`;
    }
  }

  function stopCursorBlink() {
    cursor.style.animation = 'none';
    isBlinking = false;
  }

  // Iniciar la animación de tipeo
  setTimeout(type, typingSpeed);

  document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Agregar clase cuando es visible
          observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
        }
      });
    },
    {
      threshold: 0.1, // El 10% del elemento debe estar visible para activar la animación
    }
  );

  skillCategories.forEach((category) => {
    observer.observe(category); // Observar cada cuadro de categoría
  });
});
