// Beispiel-Kartendaten
const beispielKarten = [
    { id: 1, name: "Feuerball", kosten: 3, effekt: "5 Schaden" },
    { id: 2, name: "Heilung", kosten: 2, effekt: "+3 Leben" },
    { id: 3, name: "Blitz", kosten: 4, effekt: "7 Schaden" },
    { id: 4, name: "Schild", kosten: 1, effekt: "+2 Rüstung" },
    { id: 5, name: "Beschwörung", kosten: 5, effekt: "Kreatur" }
];

// Spielzustand
let spielerHand = [];
let spielerFeld = [];
let gegnerHand = [];
let gegnerFeld = [];
let deck = [...beispielKarten, ...beispielKarten]; // Doppelt für mehr Karten

// Funktion zum Erstellen einer Karte (HTML Element)
function erstelleKarteElement(karte, istGegner = false) {
    const karteDiv = document.createElement('div');
    karteDiv.className = istGegner ? 'karte gegner-karte' : 'karte';
    karteDiv.dataset.id = karte.id;
    
    if (istGegner) {
        karteDiv.innerHTML = `
            <div class="karte-name">???</div>
            <div class="karte-kosten">?</div>
        `;
    } else {
        karteDiv.innerHTML = `
            <div class="karte-name">${karte.name}</div>
            <div class="karte-kosten">${karte.kosten}</div>
            <div class="karte-effekt">${karte.effekt}</div>
        `;
        
        // Karte ausspielen durch Klick
        karteDiv.addEventListener('click', () => {
            karteAusspielen(karte);
        });
    }
    
    return karteDiv;
}

// Karte ziehen
function karteZiehen() {
    if (deck.length === 0) {
        alert("Keine Karten mehr im Deck!");
        return;
    }
    
    const gezogeneKarte = deck.pop();
    spielerHand.push(gezogeneKarte);
    aktualisiereAnzeige();
}

// Karte ausspielen
function karteAusspielen(karte) {
    const index = spielerHand.findIndex(k => k.id === karte.id);
    if (index !== -1) {
        spielerHand.splice(index, 1);
        spielerFeld.push(karte);
        aktualisiereAnzeige();
        console.log(`${karte.name} wurde ausgespielt!`);
    }
}

// Anzeige aktualisieren
function aktualisiereAnzeige() {
    // Spieler Hand
    const spielerHandContainer = document.getElementById('spieler-hand-container');
    spielerHandContainer.innerHTML = '';
    spielerHand.forEach(karte => {
        spielerHandContainer.appendChild(erstelleKarteElement(karte));
    });

    // Spieler Feld
    const spielerFeldContainer = document.getElementById('spieler-feld-container');
    spielerFeldContainer.innerHTML = '';
    spielerFeld.forEach(karte => {
        spielerFeldContainer.appendChild(erstelleKarteElement(karte));
    });

    // Gegner Hand (verdeckt)
    const gegnerHandContainer = document.getElementById('gegner-hand-container');
    gegnerHandContainer.innerHTML = '';
    gegnerHand.forEach(karte => {
        gegnerHandContainer.appendChild(erstelleKarteElement(karte, true));
    });

    // Gegner Feld
    const gegnerFeldContainer = document.getElementById('gegner-feld-container');
    gegnerFeldContainer.innerHTML = '';
    gegnerFeld.forEach(karte => {
        gegnerFeldContainer.appendChild(erstelleKarteElement(karte, true));
    });

    // Info Panel
    document.getElementById('deck-anzahl').textContent = deck.length;
}

// Spiel initialisieren
function spielStarten() {
    // Starthand ziehen
    for (let i = 0; i < 5; i++) {
        karteZiehen();
    }
    
    // Gegner bekommt auch Karten
    for (let i = 0; i < 3; i++) {
        if (deck.length > 0) {
            gegnerHand.push(deck.pop());
        }
    }
    
    aktualisiereAnzeige();
    console.log("Spiel gestartet!");
}

// Event Listeners
document.getElementById('karte-ziehen-btn').addEventListener('click', karteZiehen);

// Spiel starten
spielStarten();