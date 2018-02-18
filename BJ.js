// BLACKJACK PROJECT
///__________________
//Tableau avec les cartes valant 1 pt
var lower_cards = ['01', '14', '27', '40'];
//Tableau avec les cartes valant 2 pt
var two_cards = ['02', '15', '28', '41'];
//Tableau avec les cartes valant 3 pt
var three_cards = ['03', '16', '29', '42'];
//Tableau avec les cartes valant 4 pt
var four_cards = ['04', '17', '30', '43'];
//Tableau avec les cartes valant 5 pt
var five_cards = ['05', '18', '31', '44'];
//Tableau avec les cartes valant 6 pt
var six_cards = ['06', '19', '32', '45'];
//Tableau avec les cartes valant 7 pt
var seven_cards = ['07', '20', '33', '46'];
//Tableau avec les cartes valant 8 pt
var eigth_cards = ['08', '21', '34', '47'];
//Tableau avec les cartes valant 9 pt
var nine_cards = ['09', '22', '35', '48'];
//Tableau avec les cartes valant 10 pt
var higher_cards = ['10','11','12','13','23','24','25','26','36','37','38','39','49','50','51','52'];
///_________________
var RankCards = []; // Tableau 2D => (rangs + cartes correspondantes)
RankCards.push(lower_cards);
RankCards.push(two_cards);
RankCards.push(three_cards);
RankCards.push(four_cards);
RankCards.push(five_cards);
RankCards.push(six_cards);
RankCards.push(seven_cards);
RankCards.push(eigth_cards);
RankCards.push(nine_cards);
RankCards.push(higher_cards);
// RankCards[i][j]
// => [i] est l'indice correspondant aux différentes valeurs des cartes possibles (1 a 10 pt)
// => [j] est l'indice correspondant aux différentes cartes contenues dans les listes de valeurs
///_______________________________________________________________
// Fonction permettant de trouver la valeur d'une carte grâce au tableau RankCards
function findCardValue(number) {
  for (j=0; j<RankCards.length; j++) {
    for (i=0; i<RankCards[j].length; i++) {
      if (RankCards[j][i]==number) {
        var cardValue = j+1;
        return cardValue;
      }
    }
  }
}
///_________________________________________________________________
//
var player_cards = [];
var bank_cards = [];
var player_score = [];
var bank_score = [];
///_________________________________________________________________
// Fonction qui permet de ne pas tirer 2 cartes identiques
// => Prend en parametres les listes id_cards (cad player_cards ou bank_cards) et un nombre
function Check_cards(id_cards,numb) {
  var out = "";
  var i;
  for (i=0; i<id_cards.length; i++) {
    var card = id_cards[i];
    if (card == numb) {
      var out = "same";
      return out;
    }
  }
  return out;
}
///_________________________________________________________________
// Fonction qui permet de tirer un nombre au hasard entre 1 et 52
function Random(){
  var nb = Math.floor(Math.random()*52)+1;
  if (nb<10){
    var nb = "0"+ nb; // Ajout d'un 0 pour s'adapter a l'appelation des fichiers
  }
  return nb;
}
///_________________________________________________________________
// Fonction permettant le calcul du score et son enregistrement dans une liste
// => Peut prendre en parametres les listes 'bank_score' ou 'player_score'
function Score_calculator(list_score) {
  var score = 0;
  if (list_score.length === 0) {
    var score = 0;
  }
  else if (list_score.length === 1) {
    var score = list_score[0];
  }
  else if (list_score.length > 1) {
    for (i=0; i<list_score.length; i++) {
      var score = score + list_score[i];
    }
  }
  var i;
  for (i = 0; list_score.length!==0; i++) {
    list_score.shift(i);
  }
  list_score.push(score);
  return list_score[0];
}
///_______________________________
//Fonction permettant l'affichage du texte/résultat de la manche (par overlay/superposition) en modifiant le fichier HTML
// => Prend en parametres "aff" qui est a remplacer par le texte/resultat que l'on veut afficher
function display_res(aff) {
  var element = document.getElementById("text").firstChild;
  if (element == null) {
    var element = document.getElementById("text");
    var value = text.nodeValue;
    var node = document.createTextNode(aff);
    element.appendChild(node);
    document.getElementById("overlay").style.display = "block";
    }
  if (element != null) {
    var value = element.nodeValue;
    element.nodeValue = aff;
    document.getElementById("overlay").style.display = "block";
    }
}
///_______________________________
// Fonction qui permet de ne pas afficher l'élément superposé en cours de partie
function off() {
    document.getElementById("overlay").style.display = "none";
}
///_________________________________________________________________
// Fonction permettant l'affichage du résultat de la manche en fonction du score des 2 joueurs
// => Prend en parametres les listes 'bank_score' et 'player_score'
function Score_Text_Display(bank_score,player_score) {
  var res = "";
  var bank = bank_score[0];
  var player = player_score[0];
  if (bank>player && bank <= 21) {
    display_res("Vous avez perdu");
  }
  else if (player>bank && player <= 21) {
    display_res("Vous avez gagné");
  }
  else if (player===bank && player <= 21) {
    display_res("Aucun gagnant");
  }
  else if (player > 21) {
    display_res("Vous avez perdu");
  }
  else if (bank > 21 && player <= 21) {
    display_res("Vous avez gagné");
  }
}
///_________________________________________________________________
// Fonction permettant la sélection au hasard de 2 cartes en même temps lors du chargement de la page HTML
// Gestion du fait que 2 cartes identiques ne doivent pas apparaitre en meme temps
function randomImg(){
  var nb1 = Random();
  document.getElementById('carte_banque').src = "CARTE/" + nb1 + ".BMP";
  bank_cards.push(nb1);
  var value_bank = findCardValue(nb1);
  bank_score.push(value_bank);
  var score = Score_calculator(bank_score);
  replace_text('texte1', score, "MISSING");

  var nb2 = Random();
  if (nb2 != nb1) {
    document.getElementById('carte_joueur').src = "CARTE/" + nb2 + ".BMP";
  }
  else if (nb2 == nb1) {
    var nb2 = Random();
    document.getElementById('carte_joueur').src = "CARTE/" + nb2 + ".BMP";
  }
  player_cards.push(nb2);
  var value_player = findCardValue(nb2);
  player_score.push(value_player);
  var score = Score_calculator(player_score);
  replace_text('texte2', score, "MISSING");
}
//______________________________
// Fonction permettant de remplacer une portion de texte par un autre dans le fichier HTML
// => Prend en parametres "textid"(id du texte que l'on veut modifier), nb (l'élément que l'on veut remplacer), value_list (élément qui sert de remplacement)
function replace_text(textid, value_list, nb) {
  var text = document.getElementById(textid).innerHTML;
  var res = text.replace(nb, value_list);
  document.getElementById(textid).innerHTML = res;
}
///_________________________________________________________________
// Fonction permettant la sélection au hasard d'une seule carte - Version utilisée lorsqu'une nouvelle partie est lancée
// => Prend en parametres id_cards (listes cartes banque ou joueur), id_score (score banque ou joueur), texte (id du texte a modifier)
function randomOne_bis(id_cards, id_score, texte) {
  var nb = Random();
  if (id_score.length != 0) {
    var old_score = id_score[0];
    reinitialisation_liste(id_score);
    reinitialisation_liste(id_cards);

    id_cards.push(nb);
    var value_id = findCardValue(nb);
    id_score.push(value_id);

    var score = Score_calculator(id_score);
    replace_text(texte, score, old_score);
    }

  else if (id_score.length === 0) {
    id_cards.push(nb);
    var value_id = findCardValue(nb1);
    id_score.push(value_id);

    var score = Score_calculator(id_score);
    replace_text(texte, score, "MISSING");
    }
  var path = "CARTE/" + nb + ".BMP";
  return path;
}
///_________________________________________________________________
// Fonction permettant le stockage des données dans les listes et création du chemin du fichier image
function storage_card_info(nb, id_score, id_cards, texte) {
  id_cards.push(nb);
  var old_score = Score_calculator(id_score);
  var value_id = findCardValue(nb);
  id_score.push(value_id);
  var score = Score_calculator(id_score);
  replace_text(texte, score, old_score);
  var path = "CARTE/" + nb + ".BMP";
  return path;
}
///___________________________________
// Fonction permettant la sélection au hasard d'une seule carte lors de la partie (Bouton Carte et Bouton Reste)
function randomOne(id_score, id_cards, texte) {
  var nb = Random();
  var check = Check_cards(id_cards,nb);
  if (check == "same") {
    var nb = Random();
    var path = storage_card_info(nb, id_score, id_cards, texte);
    return path;
  }
  else if (check !== "same") {
    var path = storage_card_info(nb, id_score, id_cards, texte);
    return path;
  }
}
///_________________________________________________________________
// _Gestion du bouton "Carte"
document.getElementById("card").addEventListener("click", CardPicker);
///______________________________
// Fonction qui permet d'ajouter une carte en plus pour le joueur
function CardPicker() {
    var para = document.getElementById('CJ');
    var img = document.createElement('img');
    var path = randomOne(player_score, player_cards, "texte2");
    img.src = path;
    para.appendChild(img);
    if (player_score[0] > 21) {
      display_res("Vous avez perdu");
    }
}
///_________________________________________________________________
// _Gestion du boutton "Reste"
document.getElementById("stay").addEventListener("click", Steady);
///______________________________
// Fonction qui permet d'ajouter des cartes en plus pour la banque
function Steady() {
//  var i;
//  for (i = 0; i<4; i++) {} => Boucle servant dans le cas où l'on veut ajouter 4 cartes de suite pour la banque
    while (bank_score[0] < player_score[0]) {
      var para = document.getElementById('BC');
      var img = document.createElement('img');
      var path = randomOne(bank_score, bank_cards, "texte1");
      img.src = path;
      para.appendChild(img);
    }
    Score_Text_Display(bank_score,player_score);
}
///______________________________
// Fonction qui permet d'ajouter des cartes/images dans le fichier HTML
// => Prend en parametres "par" (id du paragraphe à modifier), id_cards, id_score, texte (id du texte à modifier)
function appendImage(par,id_cards,id_score,texte) {
  var para = document.getElementById(par);
  var img = document.createElement('img');
  var path = randomOne_bis(id_cards, id_score,texte);
  img.src = path;
  para.appendChild(img);
}
///_________________________________________________________________
// _Gestion du boutton "Rejouer"
document.getElementById("replay").addEventListener("click", Restart);
///______________________________
// Fonction qui permet de lancer une nouvelle partie
function Restart() {
    var paraJ = document.getElementById('CJ');
    var parent = document.getElementById('plateau');
    var nparaJ = document.createElement('p');
    nparaJ.id = 'CJ';
    parent.replaceChild(nparaJ, paraJ);
    appendImage(nparaJ.id,player_cards,player_score,"texte2");
    var paraB = document.getElementById('BC');
    var nparaB = document.createElement('p');
    nparaB.id = 'BC';
    parent.replaceChild(nparaB, paraB);
    appendImage(nparaB.id,bank_cards,bank_score,"texte1");
}
///______________________________
// Fonction qui permet la réinitialisation des listes lors de l'utilisation du bouton rejouer
function reinitialisation_liste(listes) {
  var i;
  for (i = 0; listes.length!==0; i++) {
    listes.shift(i);
  }
  return listes;
}
