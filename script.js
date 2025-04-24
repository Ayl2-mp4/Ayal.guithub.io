// Webhook Discord (REMPLACE PAR TON LIEN)
const webhookURL = "https://discord.com/api/webhooks/1349720900290740344/cL1vvaoRcIwS79k0Ikk7Di0fAu3qUfYLZCc6VfTRrLbfkiUrkveIInr84CZLVEPZVRf1";

// ID du rôle GFX à mentionner (REMPLACE PAR L'ID DU RÔLE)
const roleID = "1349722838382149673";

// Récupère le service depuis l'URL
const params = new URLSearchParams(window.location.search);
const service = params.get("service");

// Associe les images et titres aux services
const services = {
    "banniere": { title: "Bannière Personnalisée", img: "images/banniere.png", price: "10€" },
    "logo": { title: "Logo Professionnel", img: "images/logo.png", price: "15€" },
    "thumbnail": { title: "Thumbnail YouTube", img: "images/thumbnail.png", price: "5€" }
};

// Vérifie si le service existe
if (service && services[service]) {
    document.getElementById("service-title").innerText = services[service].title;
    document.getElementById("service-img").src = services[service].img;
    document.getElementById("service-price").innerText = `Prix : ${services[service].price}`;
} else {
    document.querySelector(".service-container").innerHTML = "<h1>Service introuvable</h1>";
}

// Récupération et mise à jour du compteur de commandes
let orderCount = localStorage.getItem("orderCount") ? parseInt(localStorage.getItem("orderCount")) : 0;

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const contactInfo = document.getElementById("contact-info").value;

    if (!contactInfo) {
        alert("Veuillez entrer votre email ou compte Discord.");
        return;
    }

    // Incrémentation du compteur
    orderCount++;
    localStorage.setItem("orderCount", orderCount);

    // Création du message Discord avec ping du rôle
    const data = {
        content: `<@&${roleID}> **Nouvelle commande !** 📌\n🆔 Commande #${orderCount}\n📌 Service : ${services[service].title}\n💰 Prix : ${services[service].price}\n📧 Contact : ${contactInfo}`
    };

    // Envoi au webhook Discord
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("success-message").style.display = "block";
            document.getElementById("order-form").reset();
        } else {
            alert("Erreur lors de l'envoi de la commande.");
        }
    })
    .catch(error => {
        alert("Erreur de connexion au webhook.");
        console.error(error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".service-description");

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Vérifier au chargement
});
