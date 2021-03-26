// Pakt een woord uit lingo-nl.
function wordSelector() {
	var selector = Math.floor(Math.random() * words.length);
	console.log(words[selector]);
	// split haalt de leters uit elkaar en zet het in een array.
	chars = words[selector].split('');
	console.log(chars);
}

function speelbord() {
	var grid = document.getElementById("grid_container");
	var footer = document.getElementById("footer");
	for (var p = 1; p < 6; p++) {
		for (var i = 1; i < 6; i++) {
			var div = document.createElement('div');
			grid.appendChild(div);
			div.id = "div_" + i + '_' + p;
		}
	}
	div_1_1.innerHTML = chars[0];
	div_1_1.style.backgroundColor = "green";

	input = document.createElement('input');
	input.style.marginTop = "25px";
	input.style.height = "40px";
	input.style.width = "240px";
	input.style.fontSize = "30px";
	input.maxLength = "5";
	input.type = "text";
	input.style.textAlign = "center";
	input.id = "text_in";

	footer.appendChild(input);
	footer.style.textAlign = "center";

	k = 2;
	
	document.getElementById("text_in").onkeypress = function (event) {
		if (event.keyCode == 13) {
			var input_word = document.getElementById("text_in").value;
			check_word = input_word.split('');

			var testUserInput = input.value;

			if (testUserInput.length == chars.length) {
				document.getElementById('div_1_'+k).innerHTML = chars[0];
				document.getElementById('div_1_'+k).style.backgroundColor = "green";
				if (k < 5) {
					k++;
				}
				user_input();
				input.value = "";
			}
			else{
				alert("je moet 5 letter invoeren");
				input.value = "";
			}
		}	
	}
}


wordChoose = 1;

function user_input() {
	var input_word = document.getElementById("text_in").value;
	check_word = input_word.split('');
	
	console.log(input_word);
	console.log(check_word);

	document.getElementById('div_1_' + wordChoose).style.backgroundColor = "white";

	for (var wordSize = 1; wordSize < 6; wordSize++) {
		document.getElementById('div_' + wordSize + '_' + wordChoose).innerHTML = check_word[wordSize - 1];
	}

	checkWord();
}


function checkWord(){
	
	//check_word = user input
	//chars = is de array van de characters.
	control = new Array();


	//Verdubbelde de chars array om te kunnen bewerken.
	for (var num = 0; num <= 4; num++) {
		control.push(chars[num]);
		console.log(control);
	}
	
	//Als de overeenkomt met de juiste letter en de juiste plaats.
	for (var green = 0; green <= 4; green++) {
		if (control[green] == check_word[green]) {
			document.getElementById('div_' + (green+1) + '_' + wordChoose).style.backgroundColor = "green";
			control[green] = "*";
			check_word[green] = "";
		}
	}
	//Geeft aan als de letter goed maar is maar op verkeerde locatie.
	//Eerste for loop checked voor fouten letter/letters
	for (orange=0; orange<=4; orange++) {
		if (control[orange] != '*') {
			console.log('letter ', orange, ' is fout')
			//Eerst kijken als een leter fout is en daarna loop je door het woord heen om te kijken als deze letter ergens anders wel klopt
			for (i=0; i<=4; i++){
				console.log(check_word[orange], control[i])
				if (check_word[orange] == control[i]){
					document.getElementById('div_' + (orange+1) + '_' + wordChoose).style.backgroundColor = "orange";
				}
			}
		}
	}

	wordChoose++;
	console.log(control);
	if (control[0] == "*" && control[1] == "*" && control[2] == "*" && control[3] == "*" && control[4] == "*") {
		alert("Je hebt gewonnen, probeer het nog eens");
		location.reload();
	}
	if (wordChoose == 6) {
		alert('Je hebt gefaalt probeer het opnieuw het woord was '+ chars +'!!');
		location.reload();
	}
	
	for (var leeg = 0; leeg <= 5; leeg++) {
		control.pop(leeg);
	}
}


wordSelector();
speelbord();