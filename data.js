

//boutiques
const BOOSTERS = 'mythoriaBoosters';
const COLLECTION = 'mythoriaCollection';

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

//chambers
if ($('#mesBoosters')) {
  const cartes = [
    { nom: 'Dragon des ombres',       type: 'Monstre', rarete: 'Rare',       attaque: 2400, defense: 1800, image: 'img/0895829790cde0ffb0f0503b7a1b8e7c.jpg' },
    { nom: 'Gardien mystique',        type: 'Monstre', rarete: 'Commune',    attaque: 1500, defense: 1200, image: 'img/4430e6ef7e0e0302aaed620a016f120f.jpg' },
    { nom: 'Phénix légendaire',       type: 'Monstre', rarete: 'Légendaire', attaque: 3000, defense: 2500, image: 'img/7549a66533fe326ef4f20beaee5b9b14.jpg' },
    { nom: 'Piège du portail',        type: 'Piège',   rarete: 'Épique',     attaque: 0,    defense: 0,    image: 'img/afe69f94cbfbaa54e4a809338677b2e3.jpg' },
    { nom: 'Magie des étoiles',       type: 'Magie',   rarete: 'Rare',       attaque: 0,    defense: 0,    image: 'img/5d48e67b866069df9ea08eff5da3ae2f.jpg' },
    { nom: 'Chevalier du crépuscule', type: 'Monstre', rarete: 'Commune',    attaque: 1700, defense: 1400, image: 'img/1f314c18c4bac4b59ca9f326d7b00f30.jpg' }
  ];
  const RARES = ['Rare', 'Épique', 'Légendaire'];

 
  function afficher(animer = true) {
    const boosters = lire(BOOSTERS);
    $('#messageVide').classList.toggle('hidden', boosters.length > 0);

    $('#mesBoosters').innerHTML = boosters.map(b => `
      <article class="${animer ? 'pop' : ''} rounded-2xl border border-purple-900 bg-[#130D23] p-4">
        <img src="${esc(b.image)}" alt="" class="h-56 w-full rounded-xl bg-black object-contain p-3">
        <h2 class="mt-4 text-lg font-bold text-[#FFC247]">${esc(b.titre)}</h2>
        <p class="my-2 text-sm text-gray-400">${b.ouvert ? 'Déjà ouvert' : 'Prêt à ouvrir'}</p>
        ${b.ouvert ? '' : `<button data-id="${b.id}" class="ouvrir w-full rounded-lg bg-[#FFC247] px-3 py-2 font-bold text-black hover:bg-white">Ouvrir le booster</button>`}
      </article>`).join('');
  }

  async function ouvrir(id) {
    const boosters = lire(BOOSTERS);
    const booster = boosters.find(b => b.id == id);
    if (!booster || booster.ouvert) return;

    const img = $('#imageOuverture');
    img.src = booster.image;
    $('#zoneOuverture').classList.remove('hidden');
    $('#titreOuverture').textContent = booster.titre;
    $('#messageOuverture').textContent = 'Ouverture du booster...';
    $('#cartesObtenues').innerHTML = '';


    
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

    afficher(false);
  }

  
  $('#mesBoosters').addEventListener('click', e => {
    const btn = e.target.closest('.ouvrir');
    if (btn) ouvrir(btn.dataset.id);
  });

  $('#fermerOuverture').onclick = () => $('#zoneOuverture').classList.add('hidden');

  afficher();
}

//grimoires
  const TYPES = {
    
    };
    const PAR_PAGE = 4; 

  
    const collection = JSON.parse(localStorage.getItem('mythoriaCollection') || '[]');
    let page = 0;

    
    for (const cle in TYPES) $('#filtreType').innerHTML += `<option value="${cle}">${TYPES[cle]}</option>`;

    function filtrer() {
      const type = $('#filtreType').value;
      // const rarete = $('#filtreRarete').value;
      return collection.filter(c => (!type || c.type === type) );
    }

    function carteHTML(c) {
      return `<button data-id="${c.id}" class="pop rounded-lg border border-amber-900/40 bg-white/30 p-1 text-center text-xs hover:bg-white/60">
        <img src="${c.image}" alt="" class="h-24 w-full object-contain">
        <p class="font-bold">${c.nom}</p>
        <p>${c.rarete}</p>
      </button>`;
    } 

    function afficher() {
      const liste = filtrer();
      const nbPages = Math.max(1, Math.ceil(liste.length / (PAR_PAGE * 2)));
      page = Math.min(page, nbPages - 1);

      const debut = page * PAR_PAGE * 2;
      const gauche = liste.slice(debut, debut + PAR_PAGE);
      const droite = liste.slice(debut + PAR_PAGE, debut + PAR_PAGE * 2);

      $('#pageG').innerHTML = gauche.map(carteHTML).join('');
      $('#pageD').innerHTML = droite.map(carteHTML).join('');


      if (liste.length === 0) {
        $('#pageG').innerHTML = collection.length
          ? '<p class="col-span-2 row-span-2 self-center text-center font-bold">Aucune carte avec ce filtre.</p>'
          : '<p class="col-span-2 row-span-2 self-center text-center font-bold">Ton grimoire est vide.<br><a href="boutique.html" class="underline">Visiter la boutique</a></p>';
      }

   
    }

    function modal(afficherIt) {
      $('#modal').classList.toggle('hidden', !afficherIt);
      $('#modal').classList.toggle('grid', afficherIt);
    }


    $('#livre').addEventListener('click', e => {
      const bouton = e.target.closest('[data-id]');
      if (!bouton) return;
      const c = collection.find(x => x.id == bouton.dataset.id);

      $('#detail').innerHTML = `
        <img src="${c.image}" alt="" class="mx-auto h-56 object-contain">
        <h2 class="mt-3 text-center text-xl font-bold text-[#FFC247]">${c.nom}</h2>
        <p class="mt-2 text-sm text-gray-300">Type : ${TYPES[c.type] || c.type}</p>
        <p class="text-sm text-gray-300">Rareté : ${c.rarete}</p>
        ${c.type !== 'Sort' ? `<p class="text-sm text-gray-300">ATK : ${c.attaque} · PV : ${c.vie}</p>` : ''}
       
        <button id="fermer" class="mt-4 w-full rounded-lg border border-[#FFC247] py-2 text-[#FFC247] hover:bg-[#FFC247] hover:text-black">Fermer</button>`;
      modal(true);
    });

   
    $('#modal').addEventListener('click', e => {
      if (e.target.id === 'modal' || e.target.id === 'fermer') modal(false);
    });


    afficher();