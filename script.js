// 1 EFFETTO DI DIGITAZIONE NOME 

const h1Element = document.querySelector('#typingText');
const text = h1Element.textContent;
h1Element.textContent = "";

let index = 0;
const speed = 100;

function typeEffect() {

    if (index === 0) {
        h1Element.style.visibility = "visible";
    }

    if (index < text.length) {

        h1Element.textContent += text.charAt(index);
        index++;

        setTimeout(typeEffect, speed);
    }
}

// Avvio
typeEffect();








//2 ANIMAZIONE PROGRESS BAR
const skillsSection = document.getElementById('sectionC'); 
const progressBars = document.querySelectorAll('.progress-bar');
const competenzeLinks = document.querySelectorAll('a[href="#sectionC"]'); // Modificato per selezionare tutti i link a #sectionC
const otherLinks = document.querySelectorAll('a[href^="#"]:not([href="#sectionC"])'); 

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.opacity = 0;
        p.style.width = 0;
    });
}

hideProgress();

function checkSkillsSectionVisibility() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && sectionPos > 0) {
        showProgress();
    } else {
        hideProgress();
    }
}

window.addEventListener('scroll', checkSkillsSectionVisibility);

competenzeLinks.forEach(link => {
    link.addEventListener('click', () => {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(showProgress, 500); 
    });
});

otherLinks.forEach(link => {
    link.addEventListener('click', () => {
        hideProgress();
    });
});





// 3 Mostra/nasconde l'overlay del menu 
const toggler = document.getElementById('navbar-toggler');
const overlayMenu = document.getElementById('overlayMenu');

toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    overlayMenu.classList.toggle('show');
});



$(document).ready(function () {
    // Aggiunge e rimuove la classe 'open' per mostrare o nascondere l'overlay
    $('#navbar-toggler').on('click', function () {
        $('#overlayMenu').addClass('overlay-menu');
    });

    $('.overlay-menu-list .overlay-menu-item').on('click', function () {
        $('#overlayMenu').collapse('hide');
        $('#navbar-toggler').removeClass('active');
    });


});




//4 Collegamento Curriculum e Linkedin e Location
document.addEventListener('DOMContentLoaded', (event) => {
    const downloadCvButton = document.getElementById('download-cv-button');
    const cvUrl = 'cv.pdf';

    downloadCvButton.addEventListener('click', () => {
        //verifico se il file esiste
        fetch(cvUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {

                    window.location.href = cvUrl;
                } else {
                    alert('CV non disponibile');
                }
            })
            .catch(error => {
                console.error('Errore nel controllo della disponibilità del CV:', error);
                alert('CV non disponibile');
            });
    });

    document.getElementById('linkedin-button').addEventListener('click', () => {
        console.log('LinkedIn button clicked');
        window.open('https://www.linkedin.com', '_blank');
    });
});

document.getElementById('location-button').addEventListener('click', function() {
    // Location name for Minturno, LT
    const locationName = 'Minturno, LT';
    // Google Maps URL with the location name
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}&hl=it`;
    // Open Google Maps in a new tab
    window.open(mapsUrl, '_blank');
});





//5 Modifica allo scroll la section1 (z-index=-1)

const section1 = document.querySelector('.section1');

function handleScroll() {
    if (window.scrollY > 100) {
        section1.classList.add('scrolled');
    } else {
        section1.classList.remove('scrolled');
    }
}


window.addEventListener('scroll', handleScroll);



//6 Bottone email

//invia
document.getElementById('send-email-button').addEventListener('click', function () {

    document.getElementById('popAlert').style.visibility = 'visible';
    document.getElementById('copy').style.visibility = 'visible';
    document.getElementById('open').style.visibility = 'visible';


    // popup
    document.getElementById('popAlert').classList.add('active');
});

document.getElementById('open').addEventListener('click', function () {

    document.getElementById('popAlert').classList.add('hidden');

    document.getElementById('copy').style.visibility = 'hidden';
    document.getElementById('open').style.visibility = 'hidden';

    document.getElementById('popAlert').style.visibility = 'hidden';

    window.location.href = 'mailto:danielaspitaleri3@gmail.com';
});

//copia
document.getElementById('copy').addEventListener('click', function () {

    const email = 'danielaspitaleri3@gmail.com';
    const notification = document.getElementById('notification');
    const popup = document.getElementById('popAlert');


    navigator.clipboard.writeText(email).then(() => {

        notification.classList.remove('hidden');
        notification.classList.add('visible');

        // Nasconde la notifica dopo 4 secondi
        setTimeout(() => {
            notification.classList.remove('visible');
            notification.classList.add('hidden');
        }, 1500);


    })
    document.getElementById('copy').style.visibility = 'hidden';
    document.getElementById('open').style.visibility = 'hidden';
    document.getElementById('popAlert').style.visibility = 'hidden';

});









//8 scroll section1
window.addEventListener('scroll', function() {
    const section1 = document.querySelector('.section1');
    const sectionB = document.querySelector('#sectionB');
    const sectionBTop = sectionB.getBoundingClientRect().top;
  
    if (sectionBTop <= 0) {
      section1.classList.add('fixed-section1');
    } else {
      section1.classList.remove('fixed-section1');
    }
  });

//9 Swiper 
const swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        const isFirstSlide = this.isBeginning;
        const isLastSlide = this.isEnd;

        document.querySelector('.swiper-button-next').style.display = isLastSlide ? 'none' : 'flex';
        if (isLastSlide) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(showProgress, 500); 
        } else {
            hideProgress(); //reset se non è l'ultima slide
        }
        document.querySelector('.swiper-button-prev').style.display = isFirstSlide ? 'none' : 'flex';
      }
    }
  });

  // Nascondi la freccia sinistra all'inizio
  document.querySelector('.swiper-button-prev').style.display = 'none';
  
  