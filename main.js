// ================= SCROLL REVEAL =================
// Fungsi untuk menampilkan animasi saat discroll
const reveals = document.querySelectorAll(".reveal");

const runReveal = () => {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if(sectionTop < triggerPoint){
      section.classList.add("active");
    }
  });
};

window.addEventListener("scroll", runReveal, { passive: true });
window.addEventListener("load", runReveal);
runReveal();

// ================= HAMBURGER MENU =================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isOpen);
  };

  hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

//button get started dan contact us pada hero section
document.querySelector('.btn-primary').addEventListener('click', () => {
  document.getElementById('kontak').scrollIntoView({
    behavior: 'smooth'
  });
});

 /* ===== FORM SUBMIT (EmailJS client-side) ===== */
  (function formSubmit(){
    const form = document.getElementById('reg-form');
    const status = document.getElementById('form-status');
    const fallbackBtn = document.getElementById('form-fallback');

    // GANTI nilai ini dengan konfigurasimu di EmailJS jika ingin pakai
    const EMAILJS_SERVICE = 'service_cyber_future';
    const EMAILJS_TEMPLATE = 'template_cyber_future';
    const EMAILJS_USER = 'YOUR_USER_ID';

    if (!form) return;

    function setStatus(message, state) {
      if (!status) return;
      status.textContent = message;
      status.dataset.state = state || 'idle';
    }

    // simple validation helper
    function isEmailValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      setStatus('', 'idle');

      const data = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        serverType: form.serverType.value.trim(),
        message: form.message.value.trim(),
      };

      // minimal validation
      if (!data.firstName || !data.lastName) {
        setStatus('Mohon isi nama lengkap.', 'error');
        return;
      }
      if (!isEmailValid(data.email)) {
        setStatus('Mohon masukkan email valid.', 'error');
        return;
      }
      if (!data.phone) {
        setStatus('Mohon isi nomor handphone.', 'error');
        return;
      }
      if (!data.serverType) {
        setStatus('Mohon pilih server.', 'error');
        return;
      }

      setStatus('Mengirim...', 'loading');

      // use EmailJS if configured
      if(window.emailjs && EMAILJS_SERVICE !== 'service_cyber_future') {
        try {
          emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, data)
            .then(() => {
              setStatus('Terima kasih! Pendaftaran telah terkirim.', 'success');
              form.reset();
            }, (err) => {
              console.error('EmailJS error:', err);
              setStatus('Gagal mengirim via EmailJS. Coba fallback email client.', 'error');
            });
        } catch (err) {
          console.error(err);
          setStatus('Gagal mengirim via EmailJS. Coba fallback email client.', 'error');
        }
      } else {
        // fallback: open mailto
        const subject = encodeURIComponent('Pendaftaran ROYALEAGLE FX - ' + data.firstName + ' ' + data.lastName);
        const body = encodeURIComponent(
          `Nama: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nServer: ${data.serverType}\nPesan:\n${data.message}`
        );
        const mailto = `mailto:royaleagle.fx1@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        setStatus('Membuka aplikasi email...', 'loading');
      }
    });

    // fallback button
    fallbackBtn && fallbackBtn.addEventListener('click', () => {
      const f = document.getElementById('reg-form');
      const subject = encodeURIComponent('Pendaftaran CFFOREX - ' + (f.firstName.value || ''));
      const body = encodeURIComponent(
        `Nama: ${f.firstName.value} ${f.lastName.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value}\nServer: ${f.serverType.value}\nPesan:\n${f.message.value}`
      );
      window.location.href = `mailto:royaleagle.fx1@gmail.com?subject=${subject}&body=${body}`;
    });
  })();


/* ===== FULLSCREEN GALLERY LOOP SLIDER ===== */
(function () {
  const slider = document.getElementById("gallery-slider");
  const slides = slider.children;
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");

  let index = 0;
  let interval;

  const update = () => {
    const slideWidth = slider.clientWidth;
  slider.style.transform = `translateX(-${index * slideWidth}px)`;
};

  const next = () => {
    index++;
    if (index >= slides.length) {
      index = 0;
    }
    update();
  };

  const prev = () => {
    index--;
    if (index < 0) {
      index = slides.length - 1;
    }
    update();
  };

  nextBtn.addEventListener("click", () => {
    next();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prev();
    resetAutoplay();
  });

  const startAutoplay = () => {
    interval = setInterval(next, 4000);
  };

  const resetAutoplay = () => {
    clearInterval(interval);
    startAutoplay();
  };

  startAutoplay();
})();

