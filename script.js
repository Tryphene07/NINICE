// On attend que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", function() {

    // Targetting all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is visible on screen
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add the 'active' class to trigger the CSS animation
                // Stop observing once it has been revealed (optional)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options for the observer
        threshold: 0.15, // The element needs to be 15% visible before triggering
        rootMargin: "0px 0px -50px 0px" // Trigger a bit before the element actually comes on screen
    });

    // Start observing each reveal element
    revealElements.forEach((el) => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CALCUL DU TOTAL DYNAMIQUE ---
    const checkboxes = document.querySelectorAll('input[name="plat"]');
    const btnSubmit = document.querySelector('.btn-submit-order');
    const originalBtnText = btnSubmit.innerHTML;

    function updateTotal() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                // On récupère le prix dans le span .price-tag à côté
                const priceText = cb.parentElement.querySelector('.price-tag').innerText;
                total += parseInt(priceText); 
            }
        });
        
        // On met à jour le texte du bouton avec le total
        if (total > 0) {
            btnSubmit.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Commander pour ${total}€`;
        } else {
            btnSubmit.innerHTML = originalBtnText;
        }
    }

    checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));

    // --- 2. ANIMATION DE VALIDATION (SUCCESS) ---
    const orderForm = document.querySelector('.order-form');
    
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        // Animation du bouton
        btnSubmit.style.width = btnSubmit.offsetWidth + "px"; // Garde la largeur actuelle
        btnSubmit.innerHTML = '<i class="fa-solid fa-circle-check"></i> Envoyé !';
        btnSubmit.style.background = "#2ecc71"; // Vert succès
        
        // Petit effet de confettis ou message (optionnel)
        setTimeout(() => {
            alert("Merci Jemima ! Ta commande chez NINICE est bien reçue. On commence à piler le foutou ! 🥣");
            orderForm.reset();
            updateTotal();
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.style.background = ""; // Revient à l'orange
        }, 1000);
    });

    // --- 3. EFFET DE SURVOL 3D SUR LES CARTES ---
    const cards = document.querySelectorAll('.plat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
        });

        // Reset au départ de la souris
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateY(0deg) rotateX(0deg) translateY(0px)`;
        });
    });
});

