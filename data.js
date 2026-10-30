
const BOOSTERS = 'mythoriaBoosters';
const COLLECTION = 'mythoriaCollection';
const DECK = 'mythoriaDeck';

const $ = s => document.querySelector(s);
const lire = cle => JSON.parse(localStorage.getItem(cle) || '[]');
const ecrire = (cle, v) => localStorage.setItem(cle, JSON.stringify(v));
const uid = () => Date.now() + '-' + Math.random().toString(36).slice(2);
const esc = s => Object.assign(document.createElement('p'), { textContent: s }).innerHTML;


if ($('#catalogue')) {
  const panier = $('#panier');

  function maj() {
    const lignes = [...panier.children];
    $('#total').textContent = lignes.reduce((s, li) => s + Number(li.dataset.prix), 0);
    $('#nombreArticles').textContent = $('#badgePanier').textContent = lignes.length;
    $('#panierVide').classList.toggle('hidden', lignes.length > 0);
  }

  $('#catalogue').addEventListener('click', e => {
    const produit = e.target.closest('.ajouter')?.closest('.produit');
    if (!produit) return;

    const titre = produit.querySelector('.titre').textContent.trim();
    const prix = parseInt(produit.querySelector('.prix').textContent.replace(/\D/g, ''), 10) || 0;
    const image = produit.querySelector('img').getAttribute('src');

    const li = document.createElement('li');
    li.className = 'pop flex items-center justify-between gap-3 rounded-lg bg-black/30 p-3';
    Object.assign(li.dataset, { titre, prix, image });
    li.innerHTML = '<span></span><button class="supprimer rounded border border-red-500 px-3 py-1 text-red-400">Supprimer</button>';
    li.firstChild.textContent = `${titre} - ${prix} DH`;
    panier.append(li);
    maj();
  });

  panier.addEventListener('click', e => {
    if (!e.target.classList.contains('supprimer')) return;
    const li = e.target.closest('li');
    li.classList.add('out');
    setTimeout(() => { li.remove(); maj(); }, 200);
  });

  $('#viderPanier').onclick = () => { panier.innerHTML = ''; maj(); };

  $('#commander').onclick = () => {
    const lignes = [...panier.children];
    if (!lignes.length) return alert('Ton panier est vide !');

    const boosters = lire(BOOSTERS);
    lignes.forEach(li => boosters.push({
      id: uid(),
      titre: li.dataset.titre,
      prix: Number(li.dataset.prix),
      image: li.dataset.image,
      ouvert: false
    }));
    ecrire(BOOSTERS, boosters);
    location.href = 'Chamber.html';
  };
}


if ($('#mesBoosters')) {
  const cartes = [
    { nom: 'Dragon des ombres', type: 'Monstre', rarete: 'Rare', attaque: 2400, defense: 1800, image: 'img/0895829790cde0ffb0f0503b7a1b8e7c.jpg' },
    { nom: 'Gardien mystique', type: 'Monstre', rarete: 'Commune', attaque: 1500, defense: 1200, image: 'img/4430e6ef7e0e0302aaed620a016f120f.jpg' },
    { nom: 'Phénix légendaire', type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/7549a66533fe326ef4f20beaee5b9b14.jpg' },
    { nom: 'Piège du portail', type: 'Piège', rarete: 'Épique', attaque: 0, defense: 0, image: 'img/afe69f94cbfbaa54e4a809338677b2e3.jpg' },
    { nom: 'Magie des étoiles', type: 'Magie', rarete: 'Rare', attaque: 0, defense: 0, image: 'img/5d48e67b866069df9ea08eff5da3ae2f.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 1700, defense: 1400, image: 'img/1f314c18c4bac4b59ca9f326d7b00f30.jpg' },
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
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune', attaque: 3300, defense: 3300, image: 'img/b7011a1836cdaba00ee137e0d934bdbf.jpg' },

  ];
  const RARES = ['Rare', 'Épique', 'Légendaire'];

  function afficherBoosters(animer = true) {
   
    const boosters = lire(BOOSTERS).filter(b => !b.ouvert);
    $('#messageVide').classList.toggle('hidden', boosters.length > 0);

    $('#mesBoosters').innerHTML = boosters.map(b => `
      <article class="${animer ? 'pop' : ''} rounded-2xl border border-purple-900 bg-[#130D23] p-4">
        <img src="${esc(b.image)}" alt="" class="h-56 w-full rounded-xl bg-black object-contain p-3">
        <h2 class="mt-4 text-lg font-bold text-[#FFC247]">${esc(b.titre)}</h2>
        <p class="my-2 text-sm text-gray-400">Prêt à ouvrir</p>
        <button data-id="${b.id}" class="ouvrir w-full rounded-lg bg-[#FFC247] px-3 py-2 font-bold text-black hover:bg-white">Ouvrir le booster</button>
      </article>`).join('');
  }

  function ouvrir(id) {
    const boosters = lire(BOOSTERS);
    const booster = boosters.find(b => b.id == id);
    if (!booster || booster.ouvert) return;

    $('#imageOuverture').src = booster.image;
    $('#zoneOuverture').classList.remove('hidden');
    $('#titreOuverture').textContent = booster.titre;

    const tirage = Array.from({ length: 3 }, () => ({
      ...cartes[Math.floor(Math.random() * cartes.length)],
      id: uid()
    }));

    ecrire(COLLECTION, [...lire(COLLECTION), ...tirage]);
    booster.ouvert = true;
    ecrire(BOOSTERS, boosters);

    $('#cartesObtenues').innerHTML = tirage.map((c, i) => `
      <article class="pop rounded-xl border border-purple-800 bg-black/40 p-3" style="animation-delay:${i * 120}ms">
        <img src="${esc(c.image)}" alt="" class="h-44 w-full object-contain">
        <h3 class="mt-2 font-bold text-[#FFC247]">${esc(c.nom)}</h3>
        <p class="mt-1 text-sm text-gray-300">Type : ${c.type} · Rareté : ${c.rarete}</p>
        <p class="mt-1 text-sm text-gray-400">${c.type === 'Monstre' ? `ATK : ${c.attaque} · DEF : ${c.defense}` : 'Carte spéciale'}</p>
      </article>`).join('');

    $('#messageOuverture').textContent = tirage.some(c => RARES.includes(c.rarete))
      ? '✨ Une carte rare ou spéciale ! Cartes ajoutées à la collection.'
      : 'Cartes ajoutées à la collection !';

    afficherBoosters(false); 
  }

  $('#mesBoosters').addEventListener('click', e => {
    const btn = e.target.closest('.ouvrir');
    if (btn) ouvrir(btn.dataset.id);
  });
  $('#fermerOuverture').onclick = () => $('#zoneOuverture').classList.add('hidden');

  afficherBoosters();
}


if ($('#livre')) {
  const TYPES = { Monstre: 'Monstre', 'Piège': 'Piège', Magie: 'Magie' };
  const PAR_PAGE = 4;               // 4 cartes par page -> 8 par double page
  const collection = lire(COLLECTION);
  let page = 0;

  for (const cle in TYPES) $('#filtreType').innerHTML += `<option value="${cle}">${TYPES[cle]}</option>`;

  const filtrer = () => {
    const type = $('#filtreType').value;
    return collection.filter(c => !type || c.type === type);
  };

  const carteHTML = c => `
    <button data-id="${c.id}" class="pop rounded-lg border border-amber-900/40 bg-white/30 p-1 text-center text-xs hover:bg-white/60">
      <img src="${esc(c.image)}" alt="" class="h-24 w-full object-contain">
      <p class="font-bold">${esc(c.nom)}</p>
      <p>${c.rarete}</p>
    </button>`;

  function afficherGrimoire() {
    const liste = filtrer();
    const nbPages = Math.max(1, Math.ceil(liste.length / (PAR_PAGE * 2)));
    page = Math.min(page, nbPages - 1);

    const debut = page * PAR_PAGE * 2;
    $('#pageG').innerHTML = liste.slice(debut, debut + PAR_PAGE).map(carteHTML).join('');
    $('#pageD').innerHTML = liste.slice(debut + PAR_PAGE, debut + PAR_PAGE * 2).map(carteHTML).join('');

    if (liste.length === 0) {
      $('#pageG').innerHTML = collection.length
        ? '<p class="col-span-2 row-span-2 self-center text-center font-bold">Aucune carte avec ce filtre.</p>'
        : '<p class="col-span-2 row-span-2 self-center text-center font-bold">Ton grimoire est vide.<br><a href="boutique.html" class="underline">Visiter la boutique</a></p>';
    }

    $('#numPage').textContent = `Page ${page + 1} / ${nbPages}`;
    $('#precedent').disabled = page === 0;
    $('#suivant').disabled = page >= nbPages - 1;
  }

  function modal(on) {
    $('#modal').classList.toggle('hidden', !on);
    $('#modal').classList.toggle('grid', on);
  }

  $('#precedent').onclick = () => { page--; afficherGrimoire(); };
  $('#suivant').onclick = () => { page++; afficherGrimoire(); };
  $('#filtreType').onchange = () => { page = 0; afficherGrimoire(); };

  $('#livre').addEventListener('click', e => {
    const bouton = e.target.closest('[data-id]');
    if (!bouton) return;
    const c = collection.find(x => x.id == bouton.dataset.id);
    if (!c) return;

    $('#detail').innerHTML = `
      <img src="${esc(c.image)}" alt="" class="mx-auto h-56 object-contain">
      <h2 class="mt-3 text-center text-xl font-bold text-[#FFC247]">${esc(c.nom)}</h2>
      <p class="mt-2 text-sm text-gray-300">Type : ${c.type}</p>
      <p class="text-sm text-gray-300">Rareté : ${c.rarete}</p>
      ${c.type === 'Monstre' ? `<p class="text-sm text-gray-300">ATK : ${c.attaque} · DEF : ${c.defense}</p>` : ''}
      <button id="fermer" class="mt-4 w-full rounded-lg border border-[#FFC247] py-2 text-[#FFC247] hover:bg-[#FFC247] hover:text-black">Fermer</button>`;
    modal(true);
  });

  $('#modal').addEventListener('click', e => {
    if (e.target.id === 'modal' || e.target.id === 'fermer') modal(false);
  });

  afficherGrimoire();
}


if ($('#deck')) {
  const MAX = 20;
  const collection = lire(COLLECTION);
  // on garde seulement les ids qui existent encore dans la collection
  let deck = lire(DECK).filter(id => collection.some(c => String(c.id) === String(id)));

  const trouver = id => collection.find(c => String(c.id) === String(id));

  function afficherDeck() {
    $('#nombre').textContent = deck.length;
    $('#message').textContent = deck.length ? 'Clique sur Retirer pour enlever une carte.' : 'Ton deck est vide.';

    $('#deck').innerHTML = deck.map(id => {
      const c = trouver(id);
      return `<article class="rounded-lg border border-[#FFC247] bg-black/30 p-2 text-center">
        <img src="${esc(c.image)}" alt="" class="h-28 w-full object-contain">
        <p class="mt-2 text-sm font-bold">${esc(c.nom)}</p>
        <button data-remove="${c.id}" class="mt-2 rounded border border-red-500 px-3 py-1 text-sm text-red-300">Retirer</button>
      </article>`;
    }).join('');

    $('#collection').innerHTML = collection.map(c => {
      const choisi = deck.some(id => String(id) === String(c.id));
      const bloque = choisi || deck.length >= MAX;
      return `<article class="rounded-lg border border-purple-900 bg-[#130D23] p-3 text-center">
        <img src="${esc(c.image)}" alt="" class="h-36 w-full object-contain">
        <p class="mt-2 font-bold text-[#FFC247]">${esc(c.nom)}</p>
        <p class="my-1 text-xs text-gray-300">${c.type || 'Carte'} · ${c.rarete || 'Rareté inconnue'}</p>
        <button data-add="${c.id}" ${bloque ? 'disabled' : ''}
          class="mt-2 w-full rounded-lg px-3 py-2 text-sm font-bold ${bloque ? 'bg-gray-600 text-gray-300' : 'bg-[#FFC247] text-black hover:bg-white'}">
          ${choisi ? 'Déjà ajoutée' : 'Ajouter au deck'}
        </button>
      </article>`;
    }).join('');

    $('#collectionVide').classList.toggle('hidden', collection.length > 0);

    const types = {};
    deck.forEach(id => {
      const c = trouver(id);
      if (c) types[c.type || 'Autre'] = (types[c.type || 'Autre'] || 0) + 1;
    });
    $('#stats').textContent = deck.length
      ? `Total : ${deck.length} carte(s) · ${Object.entries(types).map(([t, n]) => t + ' : ' + n).join(' · ')}`
      : 'Aucune carte sélectionnée.';
  }


  $('#collection').addEventListener('click', e => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    if (deck.length >= MAX) return alert('Ton deck est complet : maximum 20 cartes !');
    if (!deck.some(id => String(id) === btn.dataset.add)) deck.push(btn.dataset.add);
    afficherDeck();
    localStorage.getItem('mythoriaCollection')
  });

  $('#deck').addEventListener('click', e => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    deck = deck.filter(id => String(id) !== btn.dataset.remove);
    afficherDeck();
  });

  $('#sauver').addEventListener('click', () => {
    ecrire(DECK, deck);
    alert('Deck enregistré !');
  });

  afficherDeck();
}

