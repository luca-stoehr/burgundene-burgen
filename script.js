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
const wuerfelZug = [
    { wert: 1, gewicht: 4 },
    { wert: 2, gewicht: 2 }
];


// Spielzustand
    let punkte = 0;
    let runde = 1;
    let zug = 0;
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
        farbWuerfel1 = wuerfelFarben[Math.floor(Math.random() * wuerfelFarben.length)];
        farbWuerfel2 = wuerfelFarben[Math.floor(Math.random() * wuerfelFarben.length)];
        turnWuerfel = weighted_random(wuerfelZug);
        zug = zug+turnWuerfel;

        document.getElementById('wuerfel-1').textContent = wuerfel1;
        document.getElementById('wuerfel-2').textContent = wuerfel2;
        document.getElementById('farbwuerfel1').innerHTML = `<span class="kreis ${farbWuerfel1}"></span>`;
        document.getElementById('farbwuerfel2').innerHTML = `<span class="kreis ${farbWuerfel2}"></span>`;
        document.getElementById('wuerfel-turn').textContent = turnWuerfel;
        document.getElementById('zug-anzahl').textContent = `${zug}/10`;
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

// Hintergrundfunktionen

    function weighted_random(options) {
        var i;

        var weights = [options[0].gewicht];

        for (i = 1; i < options.length; i++)
            weights[i] = options[i].gewicht + weights[i - 1];
        
        var random = Math.random() * weights[weights.length - 1];
        
        for (i = 0; i < weights.length; i++)
            if (weights[i] > random)
                break;
        
        return options[i].wert;
    }

// Hauptprogramm

    // Event Listeners
    document.getElementById('nächste-runde').addEventListener('click', wuerfeln);

    // Spiel initialisieren
    initSpielfeld();
    erstelleHexGrid();
    console.log("Spiel gestartet!");