function dodajZnacznik(nazwaZnacznika) {
  var poleTekstowe = document.querySelector('#poleTekstowe');
  var tekst = poleTekstowe.value;
  var poczatekZaznaczenia = poleTekstowe.selectionStart;
  var koniecZaznaczenia = poleTekstowe.selectionEnd;
  var zaznaczonyTekst = tekst.substring(poczatekZaznaczenia, koniecZaznaczenia);

  if (zaznaczonyTekst) {
    if (nazwaZnacznika === 'ol' || nazwaZnacznika === 'ul') {
      var linie = zaznaczonyTekst.split('\n');
      var sformatowanyTekst = '';
      for (var i = 0; i < linie.length; i++) {
        sformatowanyTekst += '<li>' + linie[i] + '</li>';
      }
      sformatowanyTekst = '<' + nazwaZnacznika + '>' + sformatowanyTekst + '</' + nazwaZnacznika + '>';
      poleTekstowe.setRangeText(sformatowanyTekst, poczatekZaznaczenia, koniecZaznaczenia, 'end');
    } else if (nazwaZnacznika === 'a') {
      var link = prompt("Wprowadź adres URL:");
      if (link) {
        var nowyTekst = '<a href="' + link + '">' + zaznaczonyTekst + '</a>';
        poleTekstowe.setRangeText(nowyTekst, poczatekZaznaczenia, koniecZaznaczenia, 'end');
      }
    } else {
      var poczatekZnacznika = '<' + nazwaZnacznika + '>';
      var koniecZnacznika = '</' + nazwaZnacznika + '>';
      var nowyTekst = poczatekZnacznika + zaznaczonyTekst + koniecZnacznika;
      poleTekstowe.setRangeText(nowyTekst, poczatekZaznaczenia, koniecZaznaczenia, 'end');
    }
    poleTekstowe.focus();
  }
}

function aktualizujWynik() {
  var poleTekstowe = document.querySelector('#poleTekstowe');
  var wynikDiv = document.querySelector('#wynik');
  var tekst = poleTekstowe.value;
  wynikDiv.innerHTML += tekst + '<br>';
  poleTekstowe.value = '';
}

document.querySelector('#addBtn').addEventListener('click', function() {
  var poleTekstowe = document.querySelector('#poleTekstowe');
  var poczatekZaznaczenia = poleTekstowe.selectionStart;
  var koniecZaznaczenia = poleTekstowe.selectionEnd;
  var zaznaczonyTekst = poleTekstowe.value.substring(poczatekZaznaczenia, koniecZaznaczenia);

  if (zaznaczonyTekst) {
    if (zaznaczonyTekst.includes('\n')) {
      dodajZnacznik('ul');
    } else {
      dodajZnacznik('span');
    }
  }
  aktualizujWynik();
});

document.querySelector('#resetBtn').addEventListener('click', function() {
  var poleTekstowe = document.querySelector('#poleTekstowe');
  var wynikDiv = document.querySelector('#wynik');
  poleTekstowe.value = '';
  wynikDiv.innerHTML = '';
});

document.querySelectorAll('.narzedzia input[type="checkbox"]').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      var nazwaZnacznika = this.id.slice(0, -8); 
      dodajZnacznik(nazwaZnacznika);
      this.checked = false; 
    }
  });
});
