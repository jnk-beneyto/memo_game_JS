"use strict";

window.addEventListener("load", () => {

  // Setting players counter
  var ptsPlayer1 = 0;
  var ptsPlayer2 = 0;

  // controlling number of cards up
  var cartasLevantadas = 0;

  // turn false => player1 move
  // turn true => player2 move
  var turno = false;

  // storing cards chosen
  var cartasEscogidas = [0, 0];

  // storing cards ID chosen
  var IDcartasEscogidas = [0, 0];

  // cards already up.Storing Id
  var cartasYAlevantadas = [];

  // Messages panel 
  var mensaje = document.querySelector(".mensajes");

  var marcadorPlayer1 = document.querySelector("#pts1");
  var marcadorPlayer2 = document.querySelector("#pts2");
  var marcoTurnoPl1 = document.querySelector("#pl1");
  var marcoTurnoPl2 = document.querySelector("#pl2");

  Iniciojuego();

  // setting player1 turn in order to start the game
  marcoTurnoPl1.classList.add("turno");

  // setting reset button
  var botonReset = document.querySelector(".reset");
  botonReset.addEventListener("click", () => {
    ptsPlayer1 = 0;
    ptsPlayer2 = 0;
    cartasLevantadas = 0;
    // changing the turn
    if (marcoTurnoPl2.classList.contains("turno")) {
      marcoTurnoPl1.classList.add("turno");
      marcoTurnoPl2.classList.remove("turno");
    }
    Iniciojuego();
  });

  let cartas = document.querySelectorAll(".box");
  cartas.forEach(function (elem) {
    elem.addEventListener("click", function test() {
      if (cartasLevantadas <= 2) {
        if (elem.classList.contains("tapa")) {
          if (cartasLevantadas == 2) {
            alert("Is not allowed to turn around more than 2 cards");
          } else {

            // removing tapa class to display the value's card
            elem.getElementsByTagName("img")[0].style.visibility =
              "visible"; //showing pic
            elem.classList.remove("tapa");
            ++cartasLevantadas;

            // getting file name (it is a number)
            var myimg = elem.getElementsByTagName("img")[0];
            var mysrc = myimg.src;
            var index = mysrc.lastIndexOf("/") + 1;
            var filename = mysrc.substr(index);
            var valor = filename[0];

            // storing into the array the value's card
            cartasEscogidas[cartasLevantadas - 1] = valor;

            // storing into the array the id's card
            IDcartasEscogidas[cartasLevantadas - 1] = elem.id;

            if (cartasLevantadas == 2) {
              var resultadoCheckeo = CheckCards(
                cartasEscogidas[0],
                cartasEscogidas[1]
              );
              if (resultadoCheckeo) {
                // checking if two cards are equals
                if (turno) {
                  ptsPlayer2++;
                  marcadorPlayer2.innerText = "PTS : " + ptsPlayer2;
                  mensaje.innerHTML = "got it Player2!! ";
                } else {
                  ptsPlayer1++;
                  marcadorPlayer1.innerText = "PTS : " + ptsPlayer1;
                  mensaje.innerHTML = "got it Player1!! ";
                }

                // storing into the array the ID of the cards already matched
                cartasYAlevantadas.push(IDcartasEscogidas[0]);
                cartasYAlevantadas.push(IDcartasEscogidas[1]);

                // adding acertada class to the already matched cards
                var cajaAcertada1 = document.getElementById(
                  IDcartasEscogidas[0]
                );
                var cajaAcertada2 = document.getElementById(
                  IDcartasEscogidas[1]
                );

                // removing event to the cards already matched and adding acertada class and removing tapa class
                cajaAcertada1.classList.add("acertada");
                cajaAcertada1.classList.remove("tapa");
                cajaAcertada1.removeEventListener("click", test(this));
                cajaAcertada1.setAttribute("style", "cursor:default;");

                cajaAcertada2.classList.add("acertada");
                cajaAcertada2.classList.remove("tapa");
                cajaAcertada2.removeEventListener("click", test(this));
                cajaAcertada2.setAttribute("style", "cursor:default;");

                if (ptsPlayer1 == 3) {
                  setTimeout(function () {

                    // changing the turn and turning around the cards
                    mensaje.innerHTML = "Player 1 won !!!";
                    ganador("You are the winner Player 1 !!!");
                  }, delayInMilliseconds);
                } else if (ptsPlayer2 == 3) {
                  setTimeout(function () {

                    // changing the turn and turning around the cards
                    mensaje.innerHTML = "Player 2 won !!!";
                    ganador("You are the winner Player 2 !!!");
                  }, delayInMilliseconds);
                } else {
                  cartasLevantadas = 0;
                }
              } else {

                // setting a 1 sec. delay
                var delayInMilliseconds = 1000;
                setTimeout(function () {

                  // changing the turn and turning around the cards
                  mensaje.innerHTML = "Error :(";
                  GiraCartasNoAcertadas();
                }, delayInMilliseconds);
              }
            }
          }
        }
      } else {
        alert("Is not allowed to turn around more than 2 cards");
      }
    });
  });


  function Iniciojuego() {

    // setting turn to false to give the fist turn to player 1
    var turno = false;
    ptsPlayer1 = 0;
    ptsPlayer2 = 0;
    cartasLevantadas = 0;

    marcadorPlayer1.innerText = "PTS : " + ptsPlayer1;
    marcadorPlayer2.innerText = "PTS : " + ptsPlayer2;

    mensaje.innerHTML = "START !!";

    // setting the values of the cards
    var valoresCartas = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

    // sorting array randomly
    function desordenar(unArray) {
      var t = unArray.sort(function (a, b) {
        return Math.random() - 0.5;
      });
      return [...t];
    }

    // loading the array in order to create a different game every time
    var numerosDesordenados = desordenar(valoresCartas);

    var todosLosBox = document.getElementsByClassName("box");

    //hidding pictures
    let cartas = document.querySelectorAll(".box");
    cartas.forEach(function (elem) {
      elem.style.backgroundColor =
        "white";
      elem.getElementsByTagName("img")[0].style.visibility =
        "hidden";
    })

    var sice = todosLosBox.length;
    for (var i = 0; i < sice; i++) {

      // hidding cards
      todosLosBox[i].classList.add("tapa");
      todosLosBox[i].getElementsByTagName("img")[0].style.visibility =
        "hidden";
      if (todosLosBox[i].classList.contains("acertada")) {
        todosLosBox[i].classList.remove("acertada");
      }

      // giving values
      var j = i + 1;
      var myimg = todosLosBox[i].getElementsByTagName("img")[0];
      myimg.src = "./img/" + numerosDesordenados[i] + ".svg";
    }
  }

  // check if two cards are equals
  function CheckCards(carta1, carta2) {

    if (carta1 == carta2) {
      return true;
    } else {
      return false;
    }
  }

  function GiraCartasNoAcertadas() {

    // hidding cards
    let cartas = document.querySelectorAll(".box");

    cartas.forEach(function (elem) {
      if (elem.classList.contains("acertada")) {
        elem.getElementsByTagName("img")[0].style.visibility =
          "visible";
      } else {
        elem.classList.add("tapa");
        elem.getElementsByTagName("img")[0].style.visibility =
          "hidden";
      }
    });

    // change the turn
    if (turno) {
      marcoTurnoPl1.classList.add("turno");
      marcoTurnoPl2.classList.remove("turno");
      turno = false;
    } else {
      marcoTurnoPl1.classList.remove("turno");
      marcoTurnoPl2.classList.add("turno");
      turno = true;
    }
    cartasLevantadas = 0;
  }

  // setting the winner and give the oportunity to keep playing
  function ganador(winner) {
    var opcion = confirm(winner + ".Keep playing?");
    if (opcion == true) {
      Iniciojuego();
    } else {
      window.close();
    }
  }
});