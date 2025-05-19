// Navmenu
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('show');
  });
});


// Translator
const translations = {
  en: {
    welcome: "WELCOME",
    forClients: "For Clients",
    services: "Our Services",
    list: [
      "Medical Consultation (online and offline)",
      "Laboratory Services",
      "Pharmaceutical Services",
      "Home-Based Medical Care",
      "Minor Procedures (e.g., wound care)"
    ],
    book: "Book Your Appointment",
    education: "Get Free Health education here!",
    forStaff: "For Staff",
    oath: "The Hippocratic Oath",
    login: "Login",
    other: "Other Services",
    contact: "Contact Us"
  },
  sw: {
    welcome: "KARIBU",
    forClients: "Kwa Wateja",
    services: "Huduma Zetu",
    list: [
      "Ushauri wa Kimatibabu (mtandaoni na ana kwa ana)",
      "Huduma za Maabara",
      "Huduma za Dawa",
      "Huduma za Matibabu Nyumbani",
      "Huduma za Kutunza Vidonda na Kadhalika"
    ],
    book: "Weka -appointment- yako hapa",
    education: "Bonyeza hapa kwa elimu ya afya bure!",
    forStaff: "Kwa Wafanyakazi",
    oath: "Kiapo cha Mhudumu wa Afya",
    login: "Login",
    other: "Huduma Nyingine",
    contact: "Wasiliana Nasi"
  },
  fr: {
    welcome: "BIENVENUE",
    forClients: "Pour les Clients",
    services: "Nos Services",
    list: [
      "Consultation médicale (en ligne et sur place)",
      "Services de laboratoire",
      "Services pharmaceutiques",
      "Soins médicaux à domicile",
      "Procédures comme les soins des plaies"
    ],
    book: "Prenez rendez-vous ici",
    education: "Cliquez ici pour une éducation gratuite à la santé!",
    forStaff: "Pour le Personnel",
    oath: "Le Serment d’Hippocrate",
    login: "Se connecter",
    other: "Autres Services",
    contact: "Contactez-nous"
  }
};

// Function to apply selected language
function applyLanguage(lang) {
  const t = translations[lang] || translations["en"];

  document.querySelector(".welcome").textContent = t.welcome;

  // Clients section
  const clientSection = document.querySelectorAll(".card .container")[0];
  clientSection.querySelector("h2").textContent = t.forClients;
  clientSection.querySelector(".title").textContent = t.services;

  const listItems = clientSection.querySelectorAll("ul.services li");
  listItems.forEach((li, i) => {
    li.textContent = t.list[i] || "";
  });

  clientSection.querySelector(".education").textContent = t.education;
  clientSection.querySelector(".button").textContent = t.book;

  // Staff section
  const staffSection = document.querySelectorAll(".card .container")[1];
  staffSection.querySelector("h2").textContent = t.forStaff;
  staffSection.querySelector(".title").textContent = t.oath;
  staffSection.querySelector(".button").textContent = t.login;

  // Footer
  const footerTitles = document.querySelectorAll("footer h1");
  if (footerTitles.length >= 2) {
    footerTitles[0].textContent = t.other;
    footerTitles[1].textContent = t.contact;
  }
}

// Set default language to Swahili on page load
window.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("language-select");
  if (selector) {
    selector.value = "sw";
    applyLanguage("sw");

    selector.addEventListener("change", function () {
      applyLanguage(this.value);
    });
  }
});
