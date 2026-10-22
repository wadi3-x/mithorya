const data = {
    nom
} 
const carte = document.getElementById("carte");
const carte1 = document.getElementById("carte1");
const carte2 = document.getElementById("carte2");
const carte3 = document.getElementById("carte3");
const carte4 = document.getElementById("carte4");
const carte5 = document.getElementById("carte5");
let s = 0
carte.addEventListener("click", function () {
    if (s === 0) {
        carte.src = "/img/lucky.jpg";
        s = 1

    } else if (s === 1) {
        carte.src = "/img/cart mklouba.jpg"
        s = 0
    }
});
let v = 0
carte1.addEventListener("click", function () {
    if (v === 0) {
        carte1.src = "/img/lucky2.jpg";
        v = 1
    } else if (v === 1) {
        carte1.src = "/img/cart mklouba.jpg"
        v = 0
    }
});
let f = 0
carte2.addEventListener("click", function () {
    if (f === 0) {
        carte2.src = "/img/lucky3.jpg";
        f = 1
    } else if (f === 1) {
        carte2.src = "/img/cart mklouba.jpg";
        f = 0
    }
});
let r = 0
carte3.addEventListener("click", function () {
    if (r === 0) {
        carte3.src = "/img/lucky4.jpg";
        r = 1
    } else if (r === 1) {
        carte3.src = "/img/cart mklouba.jpg";
        r = 0
    }
});
let g = 0
carte4.addEventListener("click", function () {
    if (g === 0) {
        carte4.src = "/img/lucky5.jpg";
        g = 1
    } else if (g === 1) {
        carte4.src = "/img/cart mklouba.jpg";
        g = 0
    }
});
let u = 0
carte5.addEventListener("click", function () {
    if (u === 0) {
        carte5.src = "/img/lucky6.jpg";
        u = 1
    } else if (u === 1) {
        carte5.src = "/img/cart mklouba.jpg";
        u = 0
    }
});
const catalogue = document.querySelector('#catalogue');
const panier = document.querySelector('#panier');
const totalSpan = document.querySelector('#total');

let total = 0;

function ajouterProduit(titre, prix) {
    const li = document.createElement('li');
    li.textContent = `${titre} _ ${prix} DH `;
    li.dataset.prix = prix; 

    const btn = document.createElement('button');
    btn.textContent = 'supprimer';
    btn.className = 'supprimer';

    li.appendChild(btn);
    panier.appendChild(li);

    total += prix;
    totalSpan.textContent = total;
}

catalogue.addEventListener('click', (e) => {
    if (!e.target.classList.contains('ajouter')) return;

    const produit = e.target.closest('.produit');
    const titre = produit.querySelector('.titre').textContent;
    const prixTexte = produit.querySelector('.prix').textContent.split('_')[1].replace('DH', '');
    const prix = parseInt(prixTexte, 10);

    ajouterProduit(titre, prix);
});

panier.addEventListener('click', (e) => {
    if (!e.target.classList.contains('supprimer')) return;

    const li = e.target.closest('li');
    total -= Number(li.dataset.prix);
    totalSpan.textContent = total;
    li.remove();
});
