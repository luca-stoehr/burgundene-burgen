const spielbrett = [
    ["blau", "blau", "grau", "grau"],
    ["orange", "orange", "lila", "lila", "orange"],
    ["orange", "gruen", "hellgruen", "hellgruen", "gruen", "lila"],
    ["orange", "blau", "blau", "lila", "orange", "orange", "orange"],
    ["hellgruen", "gruen", "lila", "blau", "gruen", "hellgruen"],
    ["hellgruen", "grau", "blau", "lila", "lila"],
    ["grau", "orange", "hellgruen", "hellgruen"]
];

const wuerfelFarben = ["blau", "gruen", "lila", "orange", "grau", "hellgruen"];


// Spielzustand
    let punkte = 0;
    let runde = 1;
    let wuerfel1 = 0;
    let wuerfel2 = 0;
    let farbWuerfel1 = null;
    let farbWuerfel2 = null;
    let turnWuerfel = null;
    let spielfeldZustand = [];

    // Initialisiere Spielfeld-Zustand
    function initSpielfeld() {
        spielfeldZustand = spielbrett.map(reihe => 
            reihe.map(farbe => ({ farbe: farbe, belegt: false, plaettchen: null }))
        );
    }

    // Erstelle Sechseck-Spielfeld
    function erstelleHexGrid() {
        const hexGrid = document.getElementById('hex-grid');
        hexGrid.innerHTML = '';

        spielbrett.forEach((reihe, reiheIndex) => {
            const hexRow = document.createElement('div');
            hexRow.className = 'hex-row';

            reihe.forEach((farbe, spalteIndex) => {
                const hexagon = document.createElement('div');
                hexagon.className = `hexagon hex-${farbe} leer`;
                hexagon.dataset.reihe = reiheIndex;
                hexagon.dataset.spalte = spalteIndex;
                
                hexagon.addEventListener('click', () => {
                    hexagonKlick(reiheIndex, spalteIndex);
                });

                hexRow.appendChild(hexagon);
            });

            hexGrid.appendChild(hexRow);
        });
    }

    // Würfeln
    function wuerfeln() {
        wuerfel1 = Math.floor(Math.random() * 6) + 1;
        wuerfel2 = Math.floor(Math.random() * 6) + 1;
        farbwuerfel1 = wuerfelFarben[Math.floor(Math.random() * wuerfelFarben.length)];
        farbwuerfel2 = wuerfelFarben[Math.floor(Math.random() * wuerfelFarben.length)];

        document.getElementById('wuerfel-1').textContent = wuerfel1;
        document.getElementById('wuerfel-2').textContent = wuerfel2;
        document.getElementById('farbwuerfel1').innerHTML = `<span class="kreis ${farbwuerfel1}"></span>`;
        document.getElementById('farbwuerfel2').innerHTML = `<span class="kreis ${farbwuerfel2}"></span>`;
        document.getElementById('plaettchen-info').textContent = 
            `Gewürfelt: ${wuerfel1} und ${wuerfel2}. Wähle ein Feld!`;
    }

    // Hexagon angeklickt
    function hexagonKlick(reihe, spalte) {
        const feld = spielfeldZustand[reihe][spalte];

        if (wuerfel1 === 0 && wuerfel2 === 0) {
            document.getElementById('plaettchen-info').textContent = 
                'Bitte erst würfeln!';
            return;
        }

        if (feld.belegt) {
            document.getElementById('plaettchen-info').textContent = 
                'Dieses Feld ist bereits belegt!';
            return;
        }

        // Plättchen platzieren
        feld.belegt = true;
        feld.plaettchen = { wert: wuerfel1 + wuerfel2 };

        // Visuelle Aktualisierung
        const hexElement = document.querySelector(
            `.hexagon[data-reihe="${reihe}"][data-spalte="${spalte}"]`
        );
        hexElement.classList.remove('leer');
        hexElement.classList.add('belegt');
        hexElement.textContent = wuerfel1 + wuerfel2;

        // Punkte vergeben
        punkte += wuerfel1 + wuerfel2;
        document.getElementById('punkte').textContent = punkte;

        // Würfel zurücksetzen
        wuerfel1 = 0;
        wuerfel2 = 0;
        document.getElementById('wuerfel1').textContent = '?';
        document.getElementById('wuerfel2').textContent = '?';
        document.getElementById('plaettchen-info').textContent = 
            `Plättchen platziert! +${feld.plaettchen.wert} Punkte`;

        runde++;
        document.getElementById('runde').textContent = runde;
    }

    // Event Listeners
    document.getElementById('nächste-runde').addEventListener('click', wuerfeln);

    // Spiel initialisieren
    initSpielfeld();
    erstelleHexGrid();
    console.log("Spiel gestartet!");