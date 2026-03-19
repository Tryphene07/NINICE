<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. On récupère les champs du formulaire
    $nom = htmlspecialchars($_POST['nom'] ?? 'Client');
    $contact = htmlspecialchars($_POST['contact'] ?? '');
    $retrait = htmlspecialchars($_POST['retrait'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    // 2. On gère les cases à cocher (plats)
    $plats = "";
    if (isset($_POST['plat']) && is_array($_POST['plat'])) {
        $plats = implode(", ", $_POST['plat']);
    }

    // 3. Requête SQL (Note bien : on utilise "contact" ici)
    $sql = "INSERT INTO commandes (nom_client, contact, plats_choisis, mode_retrait, message_special) 
            VALUES (:nom, :contact, :plats, :retrait, :message)";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nom'     => $nom,
            ':contact' => $contact,
            ':plats'   => $plats,
            ':retrait' => $retrait,
            ':message' => $message
        ]);

        // 4. Une fois fini, on renvoie vers le site
        header("Location: index.html?envoi=ok");
        exit();

    } catch (PDOException $e) {
        // En cas d'erreur, on l'affiche pour comprendre
        die("Erreur SQL : " . $e->getMessage());
    }
}
?>