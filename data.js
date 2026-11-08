const BOOSTERS = 'mythoriaBoosters';
const COLLECTION = 'mythoriaCollection';
const DECK = 'mythoriaDeck';

function lire(cle) {
  let texte = localStorage.getItem(cle);
  if (texte === null) {
    return [];
  }
  return JSON.parse(texte);
}

function ecrire(cle, valeur) {
  localStorage.setItem(cle, JSON.stringify(valeur));
}

function uid() {
  return Date.now() + '-' + Math.random().toString(36).slice(2);
}

function esc(texte) {
  let p = document.createElement('p');
  p.textContent = texte;
  return p.innerHTML;
}


if (document.getElementById('catalogue')) {
  const panier = document.getElementById('panier');

  function maj() {
    let lignes = panier.children;
    let total = 0;
    for (let i = 0; i < lignes.length; i++) {
      total = total + Number(lignes[i].dataset.prix);
    }
    document.getElementById('total').textContent = total;
    document.getElementById('nombreArticles').textContent = lignes.length;
    document.getElementById('badgePanier').textContent = lignes.length;

    if (lignes.length > 0) {
      document.getElementById('panierVide').classList.add('hidden');
    } else {
      document.getElementById('panierVide').classList.remove('hidden');
    }
  }

  document.getElementById('catalogue').addEventListener('click', function (e) {
    let bouton = e.target.closest('.ajouter');
    if (!bouton) return;
    let produit = bouton.closest('.produit');
    if (!produit) return;

    let titre = produit.querySelector('.titre').textContent.trim();
    let prix = parseInt(produit.querySelector('.prix').textContent.replace(/\D/g, ''), 10);
    if (isNaN(prix)) {
      prix = 0;
    }
    let image = produit.querySelector('img').getAttribute('src');

    let li = document.createElement('li');
    li.className = 'pop flex items-center justify-between gap-3 rounded-lg bg-black/30 p-3';
    li.dataset.titre = titre;
    li.dataset.prix = prix;
    li.dataset.image = image;
    li.innerHTML = '<span></span><button class="supprimer rounded border border-red-500 px-3 py-1 text-red-400">Supprimer</button>';
    li.firstChild.textContent = titre + ' - ' + prix + ' DH';
    panier.append(li);
    maj();
  });

  panier.addEventListener('click', function (e) {
    if (!e.target.classList.contains('supprimer')) return;
    let li = e.target.closest('li');
    li.classList.add('out');
    setTimeout(function () {
      li.remove();
      maj();
    }, 200);
  });

  document.getElementById('viderPanier').onclick = function () {
    panier.innerHTML = '';
    maj();
  };

  document.getElementById('commander').onclick = function () {
    let lignes = panier.children;
    if (lignes.length === 0) {
      alert('Ton panier est vide !');
      return;
    }

    let boosters = lire(BOOSTERS);
    for (let i = 0; i < lignes.length; i++) {
      let nouveau = {
        id: uid(),
        titre: lignes[i].dataset.titre,
        prix: Number(lignes[i].dataset.prix),
        image: lignes[i].dataset.image,
        ouvert: false
      };
      boosters.push(nouveau);
    }
    ecrire(BOOSTERS, boosters);
    location.href = 'Chamber.html';
  };
}


if (document.getElementById('mesBoosters')) {
  const cartes = [
   
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 2400, defense: 1800, image: 'img/83c5a1014dce747d6b81e1f8b331663a.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 1500, defense: 1200, image: 'img/b1eeed94076e5d7268924e62961c583d.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/f70e5d1f4444933a272ce502ab93703e.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 0, defense: 0, image: 'img/491a715469ad388a945a4fc3fc6c3268.jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 0, defense: 0, image: 'img/5d48e67b866069df9ea08eff5da3ae2f.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 1700, defense: 1400, image: 'img/1f314c18c4bac4b59ca9f326d7b00f30.jpg' },
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 2400, defense: 1800, image: 'img/0895829790cde0ffb0f0503b7a1b8e7c.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 1500, defense: 1200, image: 'img/4430e6ef7e0e0302aaed620a016f120f.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/7549a66533fe326ef4f20beaee5b9b14.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 0, defense: 0, image: 'img/afe69f94cbfbaa54e4a809338677b2e3.jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 0, defense: 0, image: 'img/5d48e67b866069df9ea08eff5da3ae2f.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 1700, defense: 1400, image: 'img/1f314c18c4bac4b59ca9f326d7b00f30.jpg' },
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 2400, defense: 1800, image: 'img/0895829790cde0ffb0f0503b7a1b8e7c.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 1500, defense: 1200, image: 'img/4430e6ef7e0e0302aaed620a016f120f.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/7549a66533fe326ef4f20beaee5b9b14.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 1500, defense: 200, image: 'img/5db1125a0fb6a2bf78bec71f60a4239a.jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 4500, defense: 2000, image: 'img/f39d537884a4437e089f498b23e703cf.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 1700, defense: 1400, image: 'img/9fde3d060402b0ec4957fd7db092a896.jpg' },
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 4000, defense: 3000, image: 'img/00ad8960c2af3f7492316da92d0968c6.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 3000, defense: 2500, image: 'img/6ae2f1aa57418236e96264f6fc1bc163.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 2800, defense: 3200, image: 'img/6fb9b5f2884ff1814fe2fa735a3b494a.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 5000, defense: 5000, image: 'img/7aac9c5c8d7c7f6f15e8b8a9e4f5aff6.jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 2800, defense: 1400, image: 'img/95cf3c08814dfd0bea369e1c7d28e62f.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 4000, defense: 4000, image: 'img/697d37361464886ecda0ce1ca83c84fa.jpg' },
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 3000, defense: 1500, image: 'img/827ccb73297da9d21354c342fb692467.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 3000, defense: 2000, image: 'img/5716ce1a0dd77be4be22c895f8a8ded6.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 1800, defense: 1600, image: 'img/6825c9fbd2f28d92b82d39d1e317bd27.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 1900, defense: 1000, image: 'img/9587b0e3f79dbbfe27e7af7e24e33e80 (1).jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 4000, defense: 4000, image: 'img/521228a6edccd409fb018bd4d4374892.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 3300, defense: 3300, image: 'img/b7011a1836cdaba00ee137e0d934bdbf.jpg' }
  ];

  function afficherBoosters(animer) {
    if (animer === undefined) {
      animer = true;
    }

    let tous = lire(BOOSTERS);
    let html = '';
    let nombre = 0;

    for (let i = 0; i < tous.length; i++) {
      let b = tous[i];
      if (b.ouvert === false) {
        nombre = nombre + 1;
        let classe = '';
        if (animer) {
          classe = 'pop';
        }
        html = html +
          '<article class="' + classe + ' rounded-2xl border border-purple-900 bg-[#130D23] p-4">' +
          '<img src="' + esc(b.image) + '" alt="" class="h-56 w-full rounded-xl bg-black object-contain p-3">' +
          '<h2 class="mt-4 text-lg font-bold text-[#FFC247]">' + esc(b.titre) + '</h2>' +
          '<p class="my-2 text-sm text-gray-400">Prêt à ouvrir</p>' +
          '<button data-id="' + b.id + '" class="ouvrir w-full rounded-lg bg-[#FFC247] px-3 py-2 font-bold text-black hover:bg-white">Ouvrir le booster</button>' +
          '</article>';
      }
    }

    if (nombre > 0) {
      document.getElementById('messageVide').classList.add('hidden');
    } else {
      document.getElementById('messageVide').classList.remove('hidden');
    }
    document.getElementById('mesBoosters').innerHTML = html;
  }

  function ouvrir(id) {
    let boosters = lire(BOOSTERS);
    let booster = null;
    for (let i = 0; i < boosters.length; i++) {
      if (boosters[i].id == id) {
        booster = boosters[i];
      }
    }
    if (booster === null || booster.ouvert === true) return;

    document.getElementById('imageOuverture').src = booster.image;
    document.getElementById('zoneOuverture').classList.remove('hidden');
    document.getElementById('titreOuverture').textContent = booster.titre;


    const collection = lire(COLLECTION);
    let tirage = [];
    for (let k = 0; k < 3; k++) {
      let hasard = Math.floor(Math.random() * cartes.length);
      let c = cartes[hasard];
      let nouvelle = {
        id: uid(),
        nom: c.nom,
        type: c.type,
        rarete: c.rarete,
        attaque: c.attaque,
        defense: c.defense,
        image: c.image
      };
      tirage.push(nouvelle);
      collection.push(nouvelle);
    }
    ecrire(COLLECTION, collection);

    booster.ouvert = true;
    ecrire(BOOSTERS, boosters);

    let html = '';
    let uneRare = false;
    for (let j = 0; j < tirage.length; j++) {
      let carte = tirage[j];

      if (carte.rarete === 'Rare' || carte.rarete === 'Épique' || carte.rarete === 'Légendaire') {
        uneRare = true;
      }

      let stats = 'Carte spéciale';
      if (carte.type === 'Monstre') {
        stats = 'ATK : ' + carte.attaque + ' · DEF : ' + carte.defense;
      }

      html = html +
        '<article class="pop rounded-xl border border-purple-800 bg-black/40 p-3" style="animation-delay:' + (j * 120) + 'ms">' +
        '<img src="' + esc(carte.image) + '" alt="" class="h-44 w-full object-contain">' +
        '<h3 class="mt-2 font-bold text-[#FFC247]">' + esc(carte.nom) + '</h3>' +
        '<p class="mt-1 text-sm text-gray-300">Type : ' + carte.type + ' · Rareté : ' + carte.rarete + '</p>' +
        '<p class="mt-1 text-sm text-gray-400">' + stats + '</p>' +
        '</article>';
    }
    document.getElementById('cartesObtenues').innerHTML = html;

    if (uneRare) {
      document.getElementById('messageOuverture').textContent = '✨ Une carte rare ou spéciale ! Cartes ajoutées à la collection.';
    } else {
      document.getElementById('messageOuverture').textContent = 'Cartes ajoutées à la collection !';
    }

    afficherBoosters(false);
  }

  document.getElementById('mesBoosters').addEventListener('click', function (e) {
    let btn = e.target.closest('.ouvrir');
    if (btn) {
      ouvrir(btn.dataset.id);
    }
  });

  document.getElementById('fermerOuverture').onclick = function () {
    document.getElementById('zoneOuverture').classList.add('hidden');
  };

  afficherBoosters();
}



if (document.getElementById('livre')) {
  const TYPES = { Monstre: 'Monstre', 'Piège': 'Piège', Magie: 'Magie' };
  const PAR_PAGE = 4;
  const collection = lire(COLLECTION);
  let page = 0;

  for (let cle in TYPES) {
    document.getElementById('filtreType').innerHTML += '<option value="' + cle + '">' + TYPES[cle] + '</option>';
  }

  function filtrer() {
    let type = document.getElementById('filtreType').value;
    let resultat = [];
    for (let i = 0; i < collection.length; i++) {
      if (type === '' || collection[i].type === type) {
        resultat.push(collection[i]);
      }
    }
    return resultat;
  }

  function carteHTML(c) {
    return '<button data-id="' + c.id + '" class="pop rounded-lg border border-amber-900/40 bg-white/30 p-1 text-center text-xs hover:bg-white/60">' +
      '<img src="' + esc(c.image) + '" alt="" class="h-24 w-full object-contain">' +
      '<p class="font-bold">' + esc(c.nom) + '</p>' +
      '<p>' + c.rarete + '</p>' +
      '</button>';
  }

  function afficherGrimoire() {
    let liste = filtrer();
    let nbPages = Math.ceil(liste.length / (PAR_PAGE * 2));
    if (nbPages < 1) {
      nbPages = 1;
    }
    if (page > nbPages - 1) {
      page = nbPages - 1;
    }

    let debut = page * PAR_PAGE * 2;
    let htmlG = '';
    let htmlD = '';

    for (let i = debut; i < debut + PAR_PAGE; i++) {
      if (i < liste.length) {
        htmlG = htmlG + carteHTML(liste[i]);
      }
    }
    for (let j = debut + PAR_PAGE; j < debut + PAR_PAGE * 2; j++) {
      if (j < liste.length) {
        htmlD = htmlD + carteHTML(liste[j]);
      }
    }

    if (liste.length === 0) {
      if (collection.length > 0) {
        htmlG = '<p class="col-span-2 row-span-2 self-center text-center font-bold">Aucune carte avec ce filtre.</p>';
      } else {
        htmlG = '<p class="col-span-2 row-span-2 self-center text-center font-bold">Ton grimoire est vide.<br><a href="boutique.html" class="underline">Visiter la boutique</a></p>';
      }
    }

    document.getElementById('pageG').innerHTML = htmlG;
    document.getElementById('pageD').innerHTML = htmlD;

    document.getElementById('numPage').textContent = 'Page ' + (page + 1) + ' / ' + nbPages;
    document.getElementById('precedent').disabled = (page === 0);
    document.getElementById('suivant').disabled = (page >= nbPages - 1);
  }

  function modal(on) {
    let m = document.getElementById('modal');
    if (on) {
      m.classList.remove('hidden');
      m.classList.add('grid');
    } else {
      m.classList.add('hidden');
      m.classList.remove('grid');
    }
  }

  document.getElementById('precedent').onclick = function () {
    page = page - 1;
    afficherGrimoire();
  };
  document.getElementById('suivant').onclick = function () {
    page = page + 1;
    afficherGrimoire();
  };
  document.getElementById('filtreType').onchange = function () {
    page = 0;
    afficherGrimoire();
  };

  document.getElementById('livre').addEventListener('click', function (e) {
    let bouton = e.target.closest('[data-id]');
    if (!bouton) return;

    let c = null;
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id == bouton.dataset.id) {
        c = collection[i];
      }
    }
    if (c === null) return;

    let html =
      '<img src="' + esc(c.image) + '" alt="" class="mx-auto h-56 object-contain">' +
      '<h2 class="mt-3 text-center text-xl font-bold text-[#FFC247]">' + esc(c.nom) + '</h2>' +
      '<p class="mt-2 text-sm text-gray-300">Type : ' + c.type + '</p>' +
      '<p class="text-sm text-gray-300">Rareté : ' + c.rarete + '</p>';

    if (c.type === 'Monstre') {
      html = html + '<p class="text-sm text-gray-300">ATK : ' + c.attaque + ' · DEF : ' + c.defense + '</p>';
    }

    html = html + '<button id="fermer" class="mt-4 w-full rounded-lg border border-[#FFC247] py-2 text-[#FFC247] hover:bg-[#FFC247] hover:text-black">Fermer</button>';

    document.getElementById('detail').innerHTML = html;
    modal(true);
  });

  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target.id === 'modal' || e.target.id === 'fermer') {
      modal(false);
    }
  });

  afficherGrimoire();
}


if (document.getElementById('deck')) {
  const MAX = 20;
  const collection = lire(COLLECTION);

  function trouver(id) {
    for (let i = 0; i < collection.length; i++) {
      if (String(collection[i].id) === String(id)) {
        return collection[i];
      }
    }
    return null;
  }

  function dansLeDeck(id) {
    for (let i = 0; i < deck.length; i++) {
      if (String(deck[i]) === String(id)) {
        return true;
      }
    }
    return false;
  }

  let deck = [];
  let ancienDeck = lire(DECK);
  for (let a = 0; a < ancienDeck.length; a++) {
    if (trouver(ancienDeck[a]) !== null) {
      deck.push(ancienDeck[a]);
    }
  }

  function afficherDeck() {
    document.getElementById('nombre').textContent = deck.length;

    if (deck.length > 0) {
      document.getElementById('message').textContent = 'Clique sur Retirer pour enlever une carte.';
    } else {
      document.getElementById('message').textContent = 'Ton deck est vide.';
    }

    let htmlDeck = '';
    for (let i = 0; i < deck.length; i++) {
      let c = trouver(deck[i]);
      htmlDeck = htmlDeck +
        '<article class="rounded-lg border border-[#FFC247] bg-black/30 p-2 text-center">' +
        '<img src="' + esc(c.image) + '" alt="" class="h-28 w-full object-contain">' +
        '<p class="mt-2 text-sm font-bold">' + esc(c.nom) + '</p>' +
        '<button data-remove="' + c.id + '" class="mt-2 rounded border border-red-500 px-3 py-1 text-sm text-red-300">Retirer</button>' +
        '</article>';
    }
    document.getElementById('deck').innerHTML = htmlDeck;


    let htmlCollection = '';
    for (let j = 0; j < collection.length; j++) {
      let carte = collection[j];
      let choisi = dansLeDeck(carte.id);
      let bloque = choisi || deck.length >= MAX;

      let type = carte.type;
      if (!type) {
        type = 'Carte';
      }
      let rarete = carte.rarete;
      if (!rarete) {
        rarete = 'Rareté inconnue';
      }

      let disabled = '';
      let styleBouton = 'bg-[#FFC247] text-black hover:bg-white';
      if (bloque) {
        disabled = 'disabled';
        styleBouton = 'bg-gray-600 text-gray-300';
      }

      let texteBouton = 'Ajouter au deck';
      if (choisi) {
        texteBouton = 'Déjà ajoutée';
      }

      htmlCollection = htmlCollection +
        '<article class="rounded-lg border border-purple-900 bg-[#130D23] p-3 text-center">' +
        '<img src="' + esc(carte.image) + '" alt="" class="h-36 w-full object-contain">' +
        '<p class="mt-2 font-bold text-[#FFC247]">' + esc(carte.nom) + '</p>' +
        '<p class="my-1 text-xs text-gray-300">' + type + ' · ' + rarete + '</p>' +
        '<button data-add="' + carte.id + '" ' + disabled + ' class="mt-2 w-full rounded-lg px-3 py-2 text-sm font-bold ' + styleBouton + '">' +
        texteBouton +
        '</button>' +
        '</article>';
    }
    document.getElementById('collection').innerHTML = htmlCollection;

    if (collection.length > 0) {
      document.getElementById('collectionVide').classList.add('hidden');
    } else {
      document.getElementById('collectionVide').classList.remove('hidden');
    }

    let types = {};
    for (let k = 0; k < deck.length; k++) {
      let cc = trouver(deck[k]);
      if (cc !== null) {
        let nomType = cc.type;
        if (!nomType) {
          nomType = 'Autre';
        }
        if (types[nomType] === undefined) {
          types[nomType] = 0;
        }
        types[nomType] = types[nomType] + 1;
      }
    }

    if (deck.length > 0) {
      let texte = 'Total : ' + deck.length + ' carte(s)';
      for (let t in types) {
        texte = texte + ' · ' + t + ' : ' + types[t];
      }
      document.getElementById('stats').textContent = texte;
    } else {
      document.getElementById('stats').textContent = 'Aucune carte sélectionnée.';
    }
  }


  document.getElementById('collection').addEventListener('click', function (e) {
    let btn = e.target.closest('[data-add]');
    if (!btn) return;

    if (deck.length >= MAX) {
      alert('Ton deck est complet : maximum 20 cartes !');
      return;
    }
    if (!dansLeDeck(btn.dataset.add)) {
      deck.push(btn.dataset.add);
    }
    afficherDeck();
  });

  document.getElementById('deck').addEventListener('click', function (e) {
    let btn = e.target.closest('[data-remove]');
    if (!btn) return;

    let nouveauDeck = [];
    for (let i = 0; i < deck.length; i++) {
      if (String(deck[i]) !== btn.dataset.remove) {
        nouveauDeck.push(deck[i]);
      }
    }
    deck = nouveauDeck;
    afficherDeck();
  });

  document.getElementById('sauver').addEventListener('click', function () {
    ecrire(DECK, deck);
    alert('Deck enregistré !');
  });

  afficherDeck();
}

let Nombre = 5;

let collection = JSON.parse(localStorage.getItem("mythoriaCollection") || "[]");
let idsDuDeck = JSON.parse(localStorage.getItem("mythoriaDeck") || "[]");
let pioche = [];
let main = [];

for (let i = 0; i < idsDuDeck.length; i++) {
  for (let j = 0; j < collection.length; j++) {
    if (String(collection[j].id) === String(idsDuDeck[i])) {
      pioche.push(collection[j]);
    }
  }
}

let piocheAdv = collection.slice().sort(() => Math.random() - 0.5);
let mainAdv = [];
let score = { moi: 0, adv: 0 };

let boutonDraw = document.getElementById('draw-btn');
let zoneMain = document.getElementById('hand');
let compteur = document.getElementById('deck-count');
let boutonEndTurn = document.getElementById('end-turn-btn');

function afficherCompteur() {
  compteur.textContent = 'Deck: ' + pioche.length + ' cards';
}

function creerImageCarte(carte, mode) {
  let image = document.createElement('img');
 image.src = carte.image;
  image.className = 'card';
  image.title = carte.nom;
  image.dataset.attaque = carte.attaque;
  image.dataset.defense = carte.defense;
  image.dataset.mode = mode || 'attaque';
  if (mode === 'defense') image.style.transform = 'rotate(90deg)';
  return image;
}

function afficherMain() {
  zoneMain.innerHTML = '';
  for (let i = 0; i < main.length; i++) {
    zoneMain.appendChild(creerImageCarte(main[i]));
  }
}

function activerClick() {
  let slots = document.querySelectorAll('.slot1');

  zoneMain.addEventListener('click', function (e) {
    if (e.target.tagName !== 'IMG') return;

    let indexCarte = Array.from(zoneMain.children).indexOf(e.target);

    let slotLibre = null;
    for (let i = 0; i < slots.length; i++) {
      if (!slots[i].querySelector('img')) {
        slotLibre = slots[i];
        break;
      }
    }

    if (slotLibre === null) {
      alert('Terrain plein !');
      return;
    }

    let carte = main[indexCarte];
    let mode = confirm('OK = Attaque, Annuler = Défense') ? 'attaque' : 'defense';
    let image = creerImageCarte(carte, mode);

    slotLibre.textContent = '';
    slotLibre.appendChild(image);

    main.splice(indexCarte, 1);
    afficherMain();
  });
}

function adversairePioche() {
  for (let i = 0; i < Nombre; i++) {
    if (piocheAdv.length > 0) {
      mainAdv.push(piocheAdv.pop());
    }
  }
}

function adversaireJoue() {
  if (mainAdv.length === 0) return;

  let slotsAdv = document.querySelectorAll('#opponent-field .slot');

  let slotLibre = null;
  for (let i = 0; i < slotsAdv.length; i++) {
    if (!slotsAdv[i].querySelector('img')) {
      slotLibre = slotsAdv[i];
      break;
    }
  }
  if (slotLibre === null) return;

  let hasard = Math.floor(Math.random() * mainAdv.length);
  let carte = mainAdv[hasard];

  let image = creerImageCarte(carte, mode);

  slotLibre.textContent = '';
  slotLibre.appendChild(image);

  mainAdv.splice(hasard, 1);
}




boutonDraw.addEventListener('click', function () {
  if (pioche.length === 0) {
    alert('Ton deck est vide !');
    return;
  }

  for (let i = 0; i < Nombre; i++) {
    if (pioche.length > 0) {
      let hasard = Math.floor(Math.random() * pioche.length);
      main.push(pioche[hasard]);
      pioche.splice(hasard, 1);
    }
  }

  adversairePioche();
  afficherMain();
  afficherCompteur();
});

boutonEndTurn.addEventListener('click', function () {
  combat();
  adversaireJoue();
});


afficherCompteur();