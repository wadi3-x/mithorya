

// const catalogue = document.querySelector('#catalogue');
// const panier = document.querySelector('#panier');
// const totalSpan = document.querySelector('#total');
// const nombreSpan = document.querySelector('#nombreArticles');
// const panierVide = document.querySelector('#panierVide');
// const btnVider = document.querySelector('#viderPanier');

// let total = 0;
// let nombre = 0;

// function majAffichage() {
//     totalSpan.textContent = total;
//     nombreSpan.textContent = nombre;
//     panierVide.classList.toggle('hidden', nombre > 0);
//     document.querySelector('#badgePanier').textContent = nombre;
// }



// function ajouterProduit(titre, prix) {
//     const li = document.createElement('li');
//     li.className = 'flex items-center justify-between rounded-lg bg-black/30 p-3';
//     li.textContent = `${titre} - ${prix} DH`;
//     li.dataset.prix = prix;

//     const btn = document.createElement('button');
//     btn.textContent = 'supprimer';
//     btn.className = 'supprimer rounded-lg border border-red-500 px-3 py-1 text-sm text-red-400 hover:bg-red-500 hover:text-white';

//     li.appendChild(btn);
//     panier.appendChild(li);

//     total += prix;
//     nombre++;
//     majAffichage();
// }




// //  buy
// catalogue.addEventListener('click', (e) => {
//     if (!e.target.classList.contains('ajouter')) return;

//     const produit = e.target.closest('.produit');
//     const titre = produit.querySelector('.titre').textContent.trim();

//     const prix = parseInt(produit.querySelector('.prix').textContent.replace(/\D/g, ''), 10);

//     ajouterProduit(titre, prix);
// });
// //  suprimer
// panier.addEventListener('click', (e) => {
//     if (!e.target.classList.contains('supprimer')) return;

//     const li = e.target.closest('li');
//     total -= Number(li.dataset.prix);
//     nombre--;
//     li.remove();
//     majAffichage();
// });


// btnVider.addEventListener('click', () => {
//     panier.innerHTML = '';
//     total = 0;
//     nombre = 0;
//     majAffichage();
// });

const CLE_BOOSTERS = 'mythoriaBoosters';
const CLE_COLLECTION = 'mythoriaCollection';

function lire(cle) {
    return JSON.parse(localStorage.getItem(cle) || '[]');
}


const catalogue = document.querySelector('#catalogue');
const panier = document.querySelector('#panier');

if (catalogue && panier) {
    let total = 0;
    let nombre = 0;

    function actualiserPanier() {
        document.querySelector('#total').textContent = total;
        document.querySelector('#nombreArticles').textContent = nombre;
        document.querySelector('#badgePanier').textContent = nombre;
        document.querySelector('#panierVide').classList.toggle('hidden', nombre > 0);
    }

    catalogue.addEventListener('click', function (event) {
        const bouton = event.target.closest('.ajouter');
        if (!bouton) return;

        const produit = bouton.closest('.produit');
        const titre = produit.querySelector('.titre').textContent.trim();
        const prix = parseInt(produit.querySelector('.prix').textContent.replace(/\D/g, ''), 10) || 0;
        const image = produit.querySelector('img').getAttribute('src');

        const ligne = document.createElement('li');
        ligne.className = 'flex items-center justify-between gap-3 rounded-lg bg-black/30 p-3';
        ligne.dataset.prix = prix;
        ligne.dataset.titre = titre;
        ligne.dataset.image = image;
        ligne.innerHTML = `<span>${titre} - ${prix} DH</span><button class="supprimer rounded border border-red-500 px-3 py-1 text-red-400">Supprimer</button>`;
        panier.appendChild(ligne);
        total += prix;
        nombre++;
        actualiserPanier();
    });

    panier.addEventListener('click', function (event) {
        if (!event.target.classList.contains('supprimer')) return;
        const ligne = event.target.closest('li');
        total -= Number(ligne.dataset.prix);
        nombre--;
        ligne.remove();
        actualiserPanier();
    });

    document.querySelector('#viderPanier').addEventListener('click', function () {
        panier.innerHTML = '';
        total = 0;
        nombre = 0;
        actualiserPanier();
    });

    document.querySelector('#commander').addEventListener('click', function () {
        if (panier.children.length === 0) {
            alert('Ton panier est vide !');
            return;
        }
        const boosters = lire(CLE_BOOSTERS);
        [...panier.children].forEach(function (ligne) {
            boosters.push({
                id: Date.now() + Math.random(),
                titre: ligne.dataset.titre,
                prix: Number(ligne.dataset.prix),
                image: ligne.dataset.image,
                ouvert: false
            });
        });
        localStorage.setItem(CLE_BOOSTERS, JSON.stringify(boosters));
        window.location.href = 'Chamber.html';
    });
}


const zoneBoosters = document.querySelector('#mesBoosters');
if (zoneBoosters) {
    const zoneOuverture = document.querySelector('#zoneOuverture');
    const imageOuverture = document.querySelector('#imageOuverture');
    const cartesObtenues = document.querySelector('#cartesObtenues');
    const messageOuverture = document.querySelector('#messageOuverture');

    const cartes = [
        { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 2400, defense: 1800, image: 'img/0895829790cde0ffb0f0503b7a1b8e7c.jpg' },
        { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 1500, defense: 1200, image: 'img/4430e6ef7e0e0302aaed620a016f120f.jpg' },
        { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/7549a66533fe326ef4f20beaee5b9b14.jpg' },
        { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 0, defense: 0, image: 'img/afe69f94cbfbaa54e4a809338677b2e3.jpg' },
        { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 0, defense: 0, image: 'img/5d48e67b866069df9ea08eff5da3ae2f.jpg' },
        { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 1700, defense: 1400, image: 'img/1f314c18c4bac4b59ca9f326d7b00f30.jpg' }
    ];

    function afficherBoosters() {
        const boosters = lire(CLE_BOOSTERS);
        zoneBoosters.innerHTML = '';
        document.querySelector('#messageVide').classList.toggle('hidden', boosters.length > 0);

        boosters.forEach(function (booster) {
            const article = document.createElement('article');
            article.className = 'carte-animee rounded-2xl border border-purple-900 bg-[#130D23] p-4';
            article.innerHTML = `<img src="${booster.image}" alt="" class="h-56 w-full rounded-xl bg-black object-contain p-3"><h2 class="mt-4 text-lg font-bold text-[#FFC247]"></h2><p class="my-2 text-sm text-gray-400">${booster.ouvert ? 'Déjà ouvert' : 'Prêt à ouvrir'}</p>`;
            article.querySelector('h2').textContent = booster.titre;
            if (!booster.ouvert) {
                const bouton = document.createElement('button');
                bouton.textContent = 'Ouvrir le booster';
                bouton.className = 'ouvrir w-full rounded-lg bg-[#FFC247] px-3 py-2 font-bold text-black hover:bg-white';
                bouton.addEventListener('click', function () { ouvrirBooster(booster.id); });
                article.appendChild(bouton);
            }
            zoneBoosters.appendChild(article);
        });
    }

    function ouvrirBooster(id) {
        const boosters = lire(CLE_BOOSTERS);
        const booster = boosters.find(function (item) { return item.id === id; });
        if (!booster || booster.ouvert) return;

        imageOuverture.src = booster.image;
        imageOuverture.classList.remove('animation-booster');
        void imageOuverture.offsetWidth;
        imageOuverture.classList.add('animation-booster');
        zoneOuverture.classList.remove('hidden');
        document.querySelector('#titreOuverture').textContent = booster.titre;
        messageOuverture.textContent = 'Ouverture du booster...';
        cartesObtenues.innerHTML = '';

        setTimeout(function () {
            const collection = lire(CLE_COLLECTION);
            let rareTrouvee = false;

            for (let i = 0; i < 3; i++) {
                const index = Math.floor(Math.random() * cartes.length);
                const carte = { ...cartes[index], id: Date.now() + Math.random() };
                collection.push(carte);
                if (carte.rarete === 'Rare' || carte.rarete === 'Épique' || carte.rarete === 'Légendaire') rareTrouvee = true;

                const element = document.createElement('article');
                element.className = 'carte-animee rounded-xl border border-purple-800 bg-black/40 p-3';
                element.innerHTML = `<img src="${carte.image}" alt="" class="h-44 w-full object-contain"><h3 class="mt-2 font-bold text-[#FFC247]"></h3><p class="mt-1 text-sm text-gray-300"></p><p class="mt-1 text-sm text-gray-400"></p>`;
                element.querySelector('h3').textContent = carte.nom;
                element.querySelectorAll('p')[0].textContent = `Type : ${carte.type} · Rareté : ${carte.rarete}`;
                element.querySelectorAll('p')[1].textContent = carte.type === 'Monstre' ? `ATK : ${carte.attaque} · DEF : ${carte.defense}` : 'Carte spéciale';
                cartesObtenues.appendChild(element);
            }
            localStorage.setItem(CLE_COLLECTION, JSON.stringify(collection));
            booster.ouvert = true;
            localStorage.setItem(CLE_BOOSTERS, JSON.stringify(boosters));
            messageOuverture.textContent = rareTrouvee ? '✨ Une carte rare ou spéciale ! Cartes ajoutées à la collection.' : 'Cartes ajoutées à la collection !';
            afficherBoosters();
        }, 500);
    }

    document.querySelector('#fermerOuverture').addEventListener('click', function () {
        zoneOuverture.classList.add('hidden');
    });
    afficherBoosters();
}