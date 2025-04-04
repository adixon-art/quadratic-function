function enter_power() {
	document.getElementById('formula').value += "²";
}

function calc() {
	var formula = document.getElementById('formula').value; // wzor funkcji
	var count = document.getElementById('count'); // blok, do ktorego zostana wpisane wszystkie obliczenia
	var a = "1", b = "0", c = "0"; // wspolczynniki
	
	/*
	Petla do przypisania wspolczynnikom odpowiednich wartosci.
	Zmienne:
	i - index wzoru
	j - index wzoru w mniejszych petlach do przypisania wartosci wspolczynnikom
	plus_minus_place - miejsce, gdzie ostatnio wystapil znak '+' lub '-' (sluzy do wyznaczenia wartosci wspolczynnika b)
	minus - do rozpoznawania, czy dany wspolczynnik jest ujemny
	*/
	for(var i = 0, plus_minus_place, minus = false; i < formula.length; i++) {
		if(formula[i] == "+")
			plus_minus_place = i;
		else if(formula[i] == "-") {
			plus_minus_place = i;
			minus = true;
		}
		else if(formula[i] == "x" && formula[i+1] == "²") {
			a = "";
			for(var j = 0; j < i; j++) {
				a += formula[j];
			}
			if(minus == true)
				minus = false;
		}
		else if(formula[i] == "x" && formula[i+1] != "²") {
			b = "";
			if(minus == true) {
				b += "-";
				minus = false;
			}
			for(var j = plus_minus_place + 1; j < i; j++) {
				b += formula[j];
			}
		}
		else if(i + 1 == formula.length && formula[i] != "x" && formula[i] != "²") {
			c = "";
			if(minus == true) {
				c += "-";
				minus = false;
			}
			for(var j = plus_minus_place + 1; j < i + 1; j++) {
				c += formula[j];
			}
		}
	}
	count.innerHTML = "a = " + a + "<br>b = " + b + "<br>c = " + c + "<br>";
	
	// Przekonwertowanie wspolczynnikow na typ float (wczesniej byly typu string), aby mozna bylo wykonywac na nich obliczenia
	a = parseFloat(a);
	b = parseFloat(b);
	c = parseFloat(c);
	
	/* Obliczanie miejsc zerowych */
	// Obliczanie delty
	var delta = b * b - 4 * a * c;
	count.innerHTML += "Δ = " + delta + "<br>";
	
	// jesli delta jest rowna 0, brak miejsc zerowych
	if(delta < 0)
		count.innerHTML += "Delta jest ujemna. Brak miejsc zerowych!<br>";
	// jesli delta jest wieksza od 0, istnieja 2 miejsca zerowe
	else if(delta > 0) {
		// Obliczanie pierwiastka z delty (aby mozna bylo obliczyc miejsca zerowe)
		var delta_root = Math.sqrt(delta);
		count.innerHTML += "√∆ = " + delta_root + "<br>";
		
		var x1 = (-b - delta_root) / 2 * a;
		count.innerHTML += "x1 = " + x1 + "<br>";
		
		var x2 = (-b + delta_root) / 2 * a;
		count.innerHTML += "x2 = " + x2 + "<br>";
	}
	// jesli delta jest rowna 0, istnieje tylko 1 miejsce zerowe
	else {
		var x0 = (-b) / 2 * a;
		count.innerHTML += "x0 = " + x0 + "<br>";
	}
	
	// Rysowanie wykresu funkcji na podstawie jej wzoru
	var y;
	var graph = document.getElementById('graph');
	graph.innerHTML = "";
	for(var x = -10; x <= 10; x += 0.005) {
		y = a * x * x + b * x + c;
		
		var top_ = (50 - y * 4.67);
		var left_ = (50.3 + x * 4.67);
		
		if(top_ > 3.5 && top_ < 96.5 && left_ > 3.5 && left_ < 96.5) {
			graph.innerHTML += '<div id="point' + x + '" class="points"></div>'
			var point = document.getElementById('point' + x);
			point.style.top = top_ + '%';	
			point.style.left = left_ + '%';
		}
	}
}