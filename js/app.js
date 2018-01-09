//letter libraries
let consonants = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
let vowels = ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ','ㅐ','ㅔ','ㅒ','ㅖ'];
let thirdLetter = ['ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
let secondLetterExceps = ['ㅗ','ㅜ','ㅡ'];
let thirdLetterVowelv1 = ['ㅏ','ㅐ','ㅣ'];
let thirdLetterVowelv2 = ['ㅓ','ㅔ','ㅣ'];
let doubleContPrelims = ['ㄱ','ㄴ','ㄹ','ㅂ'];
let doubleContEndings = ['ㅅ','ㅈ','ㅎ','ㄱ','ㅁ','ㅂ','ㅌ','ㅍ','ㅎ'];
let dictionary = {
	'Backquote': ['`','~','`','~'], //[0] = english, no shift
	'Digit1': ['1','!','1','!'], //[1] = english, with shift
	'Digit2': ['2','@','2','@'], //[2] = korean, no shift
	'Digit3': ['3','#','3','#'], //[3] = korean, with shift
	'Digit4': ['4','$','4','$'],
	'Digit5': ['5','%','5','%'],
	'Digit6': ['6','^','6','^'],
	'Digit7': ['7','&','7','&'],
	'Digit8': ['8','*','8','*'],
	'Digit9': ['9','(','9','('],
	'Digit0': ['0',')','0',')'],
	'Minus': ['-','_','-','_'],
	'Equal': ['=','+','=','+'],
	'Backspace': ['','','',''],
	'Tab': ['	','	','	','	'],
	'KeyQ': ['q','Q','ㅂ','ㅃ'],
	'KeyW': ['w','W','ㅈ','ㅉ'],
	'KeyE': ['e','E','ㄷ','ㄸ'],
	'KeyR': ['r','R','ㄱ','ㄲ'],
	'KeyT': ['t','T','ㅅ','ㅆ'],
	'KeyY': ['y','Y','ㅛ','ㅛ'],
	'KeyU': ['u','U','ㅕ','ㅕ'],
	'KeyI': ['i','I','ㅑ','ㅑ'],
	'KeyO': ['o','O','ㅐ','ㅒ'],
	'KeyP': ['p','P','ㅔ','ㅖ'],
	'BracketLeft': ['[','{','[','{'],
	'BracketRight': [']','}',']','}'],
	'Backslash': ['\\','|','\\','|'],
	'CapsLock': ['','','',''],
	'KeyA': ['a','A','ㅁ','ㅁ'],
	'KeyS': ['s','S','ㄴ','ㄴ'],
	'KeyD': ['d','D','ㅇ','ㅇ'],
	'KeyF': ['f','F','ㄹ','ㄹ'],
	'KeyG': ['g','G','ㅎ','ㅎ'],
	'KeyH': ['h','H','ㅗ','ㅗ'],
	'KeyJ': ['j','J','ㅓ','ㅓ'],
	'KeyK': ['k','K','ㅏ','ㅏ'],
	'KeyL': ['l','L','ㅣ','ㅣ'],
	'Semicolon': [';',':',';',':'],
	'Quote': ["'",'"',"'",'"'],
	'Enter': ['\n','\n','\n','\n'],
	'ShiftLeft': ['','','',''],
	'KeyZ': ['z','Z','ㅋ','ㅋ'],
	'KeyX': ['x','X','ㅌ','ㅌ'],
	'KeyC': ['c','C','ㅊ','ㅊ'],
	'KeyV': ['v','V','ㅍ','ㅍ'],
	'KeyB': ['b','B','ㅠ','ㅠ'],
	'KeyN': ['n','N','ㅜ','ㅜ'],
	'KeyM': ['m','M','ㅡ','ㅡ'],
	'Comma': [',','<',',','<'],
	'Period': ['.','>','.','>'],
	'Slash': ['/','?','/','?'],
	'ShiftRight': ['','','',''],
	'Space': [' ',' ',' ',' '],
	'ArrowLeft': ['','','',''],
	'ArrowUp': ['','','',''],
	'ArrowDown': ['','','',''],
	'ArrowRight': ['','','','']
}

//other global lets
let intKorLetter = [];
let prevKorChar = [];
let shiftUp = true;
let key = document.getElementsByClassName("key");
let txtarea = document.getElementById('displayedText');
let caretPos;
let makeListeners = function() {clickButton(this.getAttribute("id"));};
let CapsLockActive = false;
let shiftActive = false;

document.getElementById('engSelect').addEventListener("click", function() { //switch from eng to kor keyboards
    shiftOff();
    CapsLockActive = false;
    shiftActive = false;
    document.getElementById('engSelect').classList.add('active');
    document.getElementById('korSelect').classList.remove('active');
    document.getElementById('ShiftLeft').classList.remove('active');
	document.getElementById('ShiftRight').classList.remove('active');
    document.getElementById('CapsLock').classList.remove('active');
	
    let kor = document.getElementsByClassName('kor');
    for (let q = 0; q<kor.length; q++){
    	kor[q].classList.add('hidden');
    }

    let eng = document.getElementsByClassName('eng');
    for (let q = 0; q<eng.length; q++){
    	eng[q].classList.remove('hidden');
    }
});

document.getElementById('korSelect').addEventListener("click", function() { //switch from kor to eng keyboards
	shiftOff();
	CapsLockActive = false;
    shiftActive = false;
    document.getElementById('korSelect').classList.add('active');
    document.getElementById('engSelect').classList.remove('active');
    document.getElementById('ShiftLeft').classList.remove('active');
	document.getElementById('ShiftRight').classList.remove('active');
    document.getElementById('CapsLock').classList.remove('active');

    let kor = document.getElementsByClassName('kor');
    for (let q = 0; q<kor.length; q++){
    	kor[q].classList.remove('hidden');
    }

    let eng = document.getElementsByClassName('eng');
    for (let q = 0; q<eng.length; q++){
    	eng[q].classList.add('hidden');
    }
});

document.onkeypress = function(e) { //keyboard press listener
	clickButton(e.code);
}

document.onkeydown = function(e) {
	switch(e.code){ //for non-print keyboard presses
		case 'Backspace':
			backAtCaret();
			break;
		case 'Delete':
			deleteAtCaret();
			break;
		case 'CapsLock':
			if (CapsLockActive === false) {
				document.getElementById('CapsLock').classList.add('active');
				CapsLockActive = true;
				shiftOn();
			} else {
				document.getElementById('CapsLock').classList.remove('active');
				CapsLockActive = false;
				shiftOff();
			};
			break;
		case 'ShiftLeft':
			if (shiftActive === false && shiftUp === true) { //prevent multiple shift downkeys
				document.getElementById('ShiftLeft').classList.add('active');
				document.getElementById('ShiftRight').classList.add('active');
				shiftActive = true;
				shiftUp = false;
				shiftOn();
			};
			break;
		case 'ShiftRight':
			if (shiftActive === false && shiftUp === true) { //prevent multiple shift downkeys
				document.getElementById('ShiftLeft').classList.add('active');
				document.getElementById('ShiftRight').classList.add('active');
				shiftActive = true;
				shiftUp = false;
				shiftOn();
			};
			break;
		case 'ControlLeft':
			console.log('Control');
			break;
		case 'ControlRight':
			console.log('Control');
			break;
		case 'AltLeft':
			console.log('Alt');
			break;
		case 'AltRight':
			console.log('Alt');
			break;
		case 'ArrowLeft':
		    caretPos = txtarea.selectionEnd;
		    if (txtarea.selectionStart != caretPos){
		    	deselect();
		    	intKorLetter = [];
		    }
		    txtarea.selectionStart = caretPos-1;
		    txtarea.selectionEnd = caretPos-1;
		    txtarea.focus();
		    break;
		case 'ArrowRight':
		    caretPos = txtarea.selectionEnd;
		    if (txtarea.selectionStart != caretPos){
		    	deselect();
		    	intKorLetter = [];
		    } else {
		    	txtarea.selectionStart = caretPos+1;
		    	txtarea.selectionEnd = caretPos+1;
		    }
		    txtarea.focus();
			break;
	}
	toggleActive(e.code, e.type);
}

document.onkeyup = function(e) { //turn shift key off active if not holding
	if (e.code == 'ShiftRight' || e.code == 'ShiftLeft'){
		shiftActive = false;
		shiftUp = true;
		document.getElementById('ShiftLeft').classList.remove('active');
		document.getElementById('ShiftRight').classList.remove('active');
		if (CapsLockActive === false){
			shiftOff();
		}
	}
	toggleActive(e.code, e.type);
}

for (let i = 0; i < key.length; i++) { //put a click listener on each key
	key[i].addEventListener('click', makeListeners, false);
	key[i].addEventListener('mousedown', function(){
											this.classList.add('active');
											});
	if (key[i].code != 'CapsLock' || key[i].code != 'ShiftLeft' || key[i].code != 'ShiftRight') {
		key[i].addEventListener('mouseup', function(){
												this.classList.remove('active');
												});
	}
}

function insertAtCaret(text) { //inserts text at cursor location in textarea (or replaces text if text is selected)
    caretPos = txtarea.selectionStart;
    let front = (txtarea.value).substring(0, caretPos);
    let back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);

    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
	txtarea.selectionStart = caretPos;
	txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function selectCurrentKor() { //selects one char to work on
    caretPos = txtarea.selectionEnd;

    txtarea.selectionStart = caretPos-1;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function deselect() { //deselects so text isn't replaced
    caretPos = txtarea.selectionEnd;

    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    prevKorChar = [];
}

function backAtCaret() { //Backspace text at cursor location in textarea (or deletes text if text is selected)
    caretPos = txtarea.selectionStart;
    let front;
    let back;

    if (intKorLetter.length > 0 && checkSelect()) { //if in korean char, Backspace just one letter instead of whole char
    	front = (txtarea.value).substring(0, caretPos);
    	back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    	if (prevKorChar.length > 0){
    		txtarea.value = front + prevKorChar[prevKorChar.length-1] + back;
    		txtarea.selectionStart = caretPos;
    		txtarea.selectionEnd = caretPos+1;
    	} else {
    		txtarea.value = front + back;
    		txtarea.selectionStart = caretPos;
    		txtarea.selectionEnd = caretPos;
    	}
    	prevKorChar.splice(prevKorChar.length-1,1);
    } else {
    	deselect();
    	front = (txtarea.value).substring(0, caretPos-1);
    	back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    	txtarea.value = front + back;
	    caretPos = caretPos-1;
	    txtarea.selectionStart = caretPos;
	    txtarea.selectionEnd = caretPos;
    }
    txtarea.focus();
}

function deleteAtCaret() { //Backspace text at cursor location in textarea (or deletes text if text is selected)
	deselect();
    caretPos = txtarea.selectionStart;
    let front = (txtarea.value).substring(0, caretPos);
    let back = (txtarea.value).substring(txtarea.selectionEnd+1, txtarea.value.length);

    txtarea.value = front + back;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function previousChar() { //reports character before caret
    caretPos = txtarea.selectionEnd;
    return (txtarea.value).substring(caretPos-1, caretPos);
}

function checkSelect() { //checks to see if any text is selected
	if (txtarea.selectionStart != txtarea.selectionEnd) {
		return true;
	} else {
		return false;
	}
}

function addLetterToChar(newLetter) { //adds korean letter to char
	if (consonants.indexOf(previousChar()) > -1 && consonants.indexOf(newLetter) == -1 && checkSelect() == true) { //move from 1 letter in char to 2 letters in char
		let firstLetter = (consonants.indexOf(previousChar()))*588;
		let seccondLetter = (newLetter.charCodeAt(0)-12623)*28;
		let offset = 44032;
		prevKorChar.push(previousChar());
		insertAtCaret(String.fromCharCode(firstLetter+seccondLetter+offset));
		selectCurrentKor();
		intKorLetter.push(newLetter);
	} else if (((previousChar().charCodeAt(0) - 44032) % 28) == 0 && previousChar().charCodeAt(0) > 44031 && checkSelect() == true) { //move from 2 letters in char to 3 letters in char (and 3->4 if second and third letter is a vowel)
		if (thirdLetter.indexOf(newLetter) > -1){ //if const
			let addLetter = previousChar().charCodeAt(0)+thirdLetter.indexOf(newLetter)+1;
			prevKorChar.push(previousChar());
			insertAtCaret(String.fromCharCode(addLetter));
			selectCurrentKor();
			intKorLetter.push(newLetter);
		} else if ((thirdLetterVowelv1.indexOf(newLetter) > -1 || thirdLetterVowelv2.indexOf(newLetter) > -1) && secondLetterExceps.indexOf(intKorLetter[intKorLetter.length-1]) > -1) { //if vowel exceptions
			if (secondLetterExceps.indexOf(intKorLetter[intKorLetter.length-1]) == 0 && (newLetter == 'ㅏ' || newLetter == 'ㅐ' || newLetter == 'ㅣ')){ //for ㅗ
				let addLetter = previousChar().charCodeAt(0)+(thirdLetterVowelv1.indexOf(newLetter)*28)+28;
				prevKorChar.push(previousChar());
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter.push(newLetter);
			} else if (secondLetterExceps.indexOf(intKorLetter[intKorLetter.length-1]) == 1 && (newLetter == 'ㅓ' || newLetter == 'ㅔ' || newLetter == 'ㅣ')) { //for ㅜ
				let addLetter = previousChar().charCodeAt(0)+(thirdLetterVowelv2.indexOf(newLetter)*28)+28;
				prevKorChar.push(previousChar());
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter.push(newLetter);
			} else if (intKorLetter == 'ㅡ' && newLetter == 'ㅣ') { //for ㅡ
				let addLetter = previousChar().charCodeAt(0)+28;
				prevKorChar.push(previousChar());
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter.push(newLetter);
			} else {
				deselect();
				insertAtCaret(newLetter);
				selectCurrentKor();
				intKorLetter = [];
				intKorLetter.push(newLetter);
			}
		} else {
			deselect();
			insertAtCaret(newLetter);
			intKorLetter = [];
		}
	} else if (doubleContPrelims.indexOf(intKorLetter[intKorLetter.length-1]) > -1 && doubleContEndings.indexOf(newLetter) > -1 && checkSelect() == true && previousChar().charCodeAt(0) > 44031) { //if last letter is double cons
		switch (intKorLetter[intKorLetter.length-1]){
			case 'ㄱ':
				if (newLetter == 'ㅅ') {
					let addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = [];
				}
				break;
			case 'ㄴ':
				if (newLetter == 'ㅈ') {
					let addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅎ') {
					let addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = [];
				}
				break;
			case 'ㄹ':
				if (newLetter == 'ㄱ') {
					let addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅁ') {
					let addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅂ') {
					let addLetter = previousChar().charCodeAt(0)+3;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅅ') {
					let addLetter = previousChar().charCodeAt(0)+4;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅌ') {
					let addLetter = previousChar().charCodeAt(0)+5;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅍ') {
					let addLetter = previousChar().charCodeAt(0)+6;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else if (newLetter == 'ㅎ') {
					let addLetter = previousChar().charCodeAt(0)+7;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = [];
				}
				break;
			case 'ㅂ':
				if (newLetter == 'ㅅ') {
					let addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = [];
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = [];
				}
				break;
		}
	} else if (previousChar().charCodeAt(0) > 44031 && consonants.indexOf(intKorLetter[intKorLetter.length-1]) > -1 && vowels.indexOf(newLetter) > -1) { //if 3rd letter is consonant and 4th is vowel, separate into two chars
		insertAtCaret(prevKorChar[prevKorChar.length-1]);
		deselect();
		let firstLetterValue = consonants[consonants.indexOf(intKorLetter[intKorLetter.length-1])];
		let firstLetter = (consonants.indexOf(intKorLetter[intKorLetter.length-1]))*588;
		let seccondLetter = (newLetter.charCodeAt(0)-12623)*28;
		let offset = 44032;
		insertAtCaret(String.fromCharCode(firstLetter+seccondLetter+offset));
		selectCurrentKor();
		prevKorChar = [];
		prevKorChar.push(firstLetterValue);
		intKorLetter = [];
		intKorLetter.push(firstLetterValue);
		intKorLetter.push(newLetter);
	} else {
		deselect();
		insertAtCaret(newLetter);
		intKorLetter = [];
		intKorLetter.push(newLetter);
	}
}

function toggleActive(whichKey, upOrDown) { //show onscreen which keys are being pressed
	if (upOrDown == 'keydown' && document.getElementById(whichKey) != null && whichKey != 'CapsLock'){
		document.getElementById(whichKey).classList.add('active');
	} else if (document.getElementById(whichKey) != null && whichKey != 'CapsLock') {
		document.getElementById(whichKey).classList.remove('active');
	}
}

function shiftOn () {
	if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //shift english keyboard display
		let engShift = document.getElementsByClassName('eng');
	    for (let q = 0; q<engShift.length; q++){
	    	engShift[q].classList.add('hidden');
	    }

	    let engCapShift = document.getElementsByClassName('ecapital');
	    for (let q = 0; q<engCapShift.length; q++){
	    	engCapShift[q].classList.remove('hidden');
	    }

	    let normShift = document.getElementsByClassName('norm');
	    for (let q = 0; q<normShift.length; q++){
	    	normShift[q].classList.add('hidden');
	    }

	    let normCapShift = document.getElementsByClassName('ncapital');
	    for (let q = 0; q<normCapShift.length; q++){
	    	normCapShift[q].classList.remove('hidden');
	    }
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //shift korean keyboard display
		let korShift = document.getElementsByClassName('noncapital');
	    for (let q = 0; q<korShift.length; q++){
	    	korShift[q].classList.add('hidden');
	    }

	    let korCapShift = document.getElementsByClassName('kcapital');
	    for (let q = 0; q<korCapShift.length; q++){
	    	korCapShift[q].classList.remove('hidden');
	    }

	    let normShift = document.getElementsByClassName('norm');
	    for (let q = 0; q<normShift.length; q++){
	    	normShift[q].classList.add('hidden');
	    }

	    let normCapShift = document.getElementsByClassName('ncapital');
	    for (let q = 0; q<normCapShift.length; q++){
	    	normCapShift[q].classList.remove('hidden');
	    }
	} 
}

function shiftOff () {
	if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //shift english keyboard display back to lower
		let engShift = document.getElementsByClassName('eng');
	    for (let q = 0; q<engShift.length; q++){
	    	engShift[q].classList.remove('hidden');
	    }

	    let engCapShift = document.getElementsByClassName('ecapital');
	    for (let q = 0; q<engCapShift.length; q++){
	    	engCapShift[q].classList.add('hidden');
	    }

	    let normShift = document.getElementsByClassName('norm');
	    for (let q = 0; q<normShift.length; q++){
	    	normShift[q].classList.remove('hidden');
	    }

	    let normCapShift = document.getElementsByClassName('ncapital');
	    for (let q = 0; q<normCapShift.length; q++){
	    	normCapShift[q].classList.add('hidden');
	    }
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //shift korean keyboard display back to lower
		let korShift = document.getElementsByClassName('noncapital');
	    for (let q = 0; q<korShift.length; q++){
	    	korShift[q].classList.remove('hidden');
	    }

	    let korCapShift = document.getElementsByClassName('kcapital');
	    for (let q = 0; q<korCapShift.length; q++){
	    	korCapShift[q].classList.add('hidden');
	    }

	    let normShift = document.getElementsByClassName('norm');
	    for (let q = 0; q<normShift.length; q++){
	    	normShift[q].classList.remove('hidden');
	    }

	    let normCapShift = document.getElementsByClassName('ncapital');
	    for (let q = 0; q<normCapShift.length; q++){
	    	normCapShift[q].classList.add('hidden');
	    }
	}
}

function clickButton(buttonId) { //transforms clicks or keypresses into chars in textarea
	let charToAdd = '';
	if ((document.getElementById('engSelect').className).indexOf('active') > -1 && (CapsLockActive === false && shiftActive === false)) { //english characters with no shift/caps
		charToAdd = dictionary[buttonId][0];
	} else if ((document.getElementById('engSelect').className).indexOf('active') > -1 && (CapsLockActive === true || shiftActive === true)) { //english characters with shift/caps
		charToAdd = dictionary[buttonId][1];
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1 && (CapsLockActive === false && shiftActive === false)) { //korean characters with no shift/caps
		charToAdd = dictionary[buttonId][2];
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1 && (CapsLockActive === true || shiftActive === true)) { //korean characters with shift/caps
		charToAdd = dictionary[buttonId][3];
	}

	if (buttonId == 'Backspace') { //if clicked, backspaces
		backAtCaret();
	}

	if (buttonId == 'CapsLock') { //if clicked, toggles caps lock
		if (CapsLockActive === false){
			CapsLockActive = true;
			document.getElementById('CapsLock').classList.add('active');
			shiftOn();
		} else {
			CapsLockActive = false;
			document.getElementById('CapsLock').classList.remove('active');
			shiftOff();
		}
	}

	if (buttonId == 'ShiftLeft' || buttonId == 'ShiftRight') { //if clicked, toggles shift
		if (shiftActive === false) {
			shiftActive = true;
			document.getElementById('ShiftLeft').classList.add('active');
			document.getElementById('ShiftRight').classList.add('active');
			shiftOn();
		} else {
			shiftActive = false;
			document.getElementById('ShiftLeft').classList.remove('active');
			document.getElementById('ShiftRight').classList.remove('active');
			shiftOff();
		}
	}

	if (charToAdd.charCodeAt(0) == 9 || //Tab
		charToAdd.charCodeAt(0) == 10 || //enter
		(charToAdd.charCodeAt(0) >= 32 && charToAdd.charCodeAt(0) <= 126) || //eng letters and numbers
		(charToAdd.charCodeAt(0) >= 186 && charToAdd.charCodeAt(0) <= 191) || //some symbols
		(charToAdd.charCodeAt(0) == 219 || charToAdd.charCodeAt(0) == 222) //more symbols
		) {
		deselect();
		insertAtCaret(charToAdd);
	} else if (charToAdd != '') {
		addLetterToChar(charToAdd);
		selectCurrentKor();
	}
}

//functions for korean character debugging

function charCodes(letter){
	return letter.charCodeAt(0);
}

function revCharCodes(num){
	return String.fromCharCode(num);
}