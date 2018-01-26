document.addEventListener("DOMContentLoaded",start);

var moduleHome = {
	start: 1
};

var moduleBackground = {
	start: 7
};

var modulePhilosophy = {
	start: 27
};

var moduleMachine = {
	start: 41
};

var moduleTeam = {
	start: 64
};

var moduleInterview = {
	start: 92
};

// Mark the answers to quizzes. (Supports letters A-E)
var quiz = new Array();
quiz[18] = 'B';
quiz[20] = 'E';
quiz[22] = 'C';
quiz[24] = 'D';
quiz[35] = 'C';
quiz[37] = 'A';
quiz[39] = 'D';
quiz[50] = 'D';
quiz[52] = 'B';
quiz[54] = 'C';
quiz[56] = 'A';
quiz[58] = 'C';
quiz[60] = 'D';
quiz[62] = 'A';
quiz[76] = 'C';
quiz[78] = 'D';
quiz[80] = 'C';
quiz[82] = 'A';
quiz[84] = 'A';
quiz[86] = 'D';
quiz[88] = 'B';
quiz[90] = 'A';
quiz[97] = 'C';
quiz[99] = 'A';
quiz[101] = 'B';
quiz[103] = 'C';

                
var lastPage = 106;

// Hash-based navigation
var pageNumber;
if (window.location.hash === "") {
	pageNumber = 1;
} else {
	pageNumber = window.location.hash.split('#')[1];
}
oldHash = window.location.hash;
hashInterval = setInterval(function(){
	if (oldHash != window.location.hash) {
		oldHash = window.location.hash;
		pageNumber = window.location.hash.split('#')[1];
		getPage(pageNumber+".html");
	}
}, 100);
var attentionMarker = new Array();


function start() {
	document.getElementById("JavascriptDisabled").style.display = "none";
	document.getElementById("navPrevious").addEventListener("click", previous);
	document.getElementById("navNext").addEventListener("click", next);
	
	document.getElementById("imageHome").addEventListener("click", function() {
		pageNumber = moduleHome.start;
		getPage(pageNumber+".html");
	});
	
	document.getElementById("imageBackground").addEventListener("click", function() {
		pageNumber = moduleBackground.start;
		getPage(pageNumber+".html");
	});
	
	document.getElementById("imagePhilosophy").addEventListener("click", function() {
		pageNumber = modulePhilosophy.start;
		getPage(pageNumber+".html");
	});
	
	document.getElementById("imageMachine").addEventListener("click", function() {
		pageNumber = moduleMachine.start;
		getPage(pageNumber+".html");
	});
	
	document.getElementById("imageTeam").addEventListener("click", function() {
		pageNumber = moduleTeam.start;
		getPage(pageNumber+".html");
	});
	
	document.getElementById("imageInterview").addEventListener("click", function() {
		pageNumber = moduleInterview.start;
		getPage(pageNumber+".html");
	});
	
	// Hide the previous button if this is the first web page.
	//TODO check hash.
	hidePrevious(true);
	checkSection();
	
	// Load the first web page.
	getPage(pageNumber+".html");
}

function hidePrevious(hide) {
	if (hide) {
		document.getElementById("navPrevious").style.visibility = "hidden";
	} else {
		document.getElementById("navPrevious").style.visibility = "visible";
	}
}

function hideNext(hide) {
	if (hide) {
		document.getElementById("navNext").style.visibility = "hidden";
	} else {
		document.getElementById("navNext").style.visibility = "visible";
	}
}

function previous() {
	getPage(--pageNumber+".html");
}

function next() {
	getPage(++pageNumber+".html");
}

function setAttentionMarker(id) {
	attentionMarker.push(setInterval(function() {
		var elem = document.getElementById(id);
		if (elem.className.indexOf(" attention") != -1) {
			elem.className = elem.className.replace(" attention", "");
		} else {
			elem.className += " attention";
		}
	}, 500));
}

function setQuizAnswerWrong(id) {
	var elem = document.getElementById(id);
	if (elem !== null) {
		elem.addEventListener("click", function() {
			markWrong(id);
		});
	}
}

function loadPage() {
	// After page is loaded.
	for (var i = 0; i<attentionMarker.length; i++) {
		window.clearInterval(attentionMarker[i]);
		var elem = document.getElementsByClassName('attention')[0];
		if (elem !== undefined)
			elem.className = elem.className.replace(" attention","");
	}
	switch (pageNumber) {
		case "1": setAttentionMarker("imageNext"); break;
		case "4": setAttentionMarker("sections"); setAttentionMarker("imagePrevious"); setAttentionMarker("imageNext"); break;
	}
	
	if (isQuiz()) {
		document.getElementById("answer"+quiz[pageNumber]).addEventListener("click", next);
		
		if (quiz[pageNumber]!='A') {
			setQuizAnswerWrong("answerA");
		}
		
		if (quiz[pageNumber]!='B') {
			setQuizAnswerWrong("answerB");
		}
		
		if (quiz[pageNumber]!='C') {
			setQuizAnswerWrong("answerC");
		}
		
		if (quiz[pageNumber]!='D') {
			setQuizAnswerWrong("answerD");
		}
		
		if (quiz[pageNumber]!='E') {
			setQuizAnswerWrong("answerE");
		}
	}
}

function checkSection() {
	// Before page load.
	if (isQuiz()) {
		hideNext(true);
	} else {
		if (pageNumber >= lastPage) {
			hideNext(true);
		} else {
			hideNext(false);
		}
	}
	
	if (pageNumber <= 1) {
		hidePrevious(true);
	} else {
		hidePrevious(false);
	}
	
	var counter = document.getElementById("progressText");
	
	var elem = document.getElementById("imageInterview");
	if (pageNumber >= moduleInterview.start) {
		elem.src = "images/interview_black.jpg";
		elem.alt = "Interview Awards(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_fifth.jpg";
		elem.alt = "Module five";
		
		counter.innerHTML = (pageNumber - moduleInterview.start + 1) + "/" + (lastPage - moduleInterview.start + 1);
	} else {
		elem.src = "images/interview_white.jpg";
		elem.alt = "Interview Awards";
	}
	
	var elem = document.getElementById("imageTeam");
	if (pageNumber >= moduleTeam.start && pageNumber < moduleInterview.start) {
		elem.src = "images/team_black.jpg";
		elem.alt = "Team Awards(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_fourth.jpg";
		elem.alt = "Module four";
		
		counter.innerHTML = (pageNumber - moduleTeam.start + 1) + "/" + (moduleInterview.start - moduleTeam.start);
	} else {
		elem.src = "images/team_white.jpg";
		elem.alt = "Team Awards";
	}
	
	var elem = document.getElementById("imageMachine");
	if (pageNumber >= moduleMachine.start && pageNumber < moduleTeam.start) {
		elem.src = "images/machine_black.jpg";
		elem.alt = "Machine Awards(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_third.jpg";
		elem.alt = "Module three";
		
		counter.innerHTML = (pageNumber - moduleMachine.start + 1) + "/" + (moduleTeam.start - moduleMachine.start);
	} else {
		elem.src = "images/machine_white.jpg";
		elem.alt = "Machine Awards";
	}
	
	var elem = document.getElementById("imagePhilosophy");
	if (pageNumber >= modulePhilosophy.start && pageNumber < moduleMachine.start) {
		elem.src = "images/philosophy_black.jpg";
		elem.alt = "Award Philosophy(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_second.jpg";
		elem.alt = "Module two";
		
		counter.innerHTML = (pageNumber - modulePhilosophy.start + 1) + "/" + (moduleMachine.start - modulePhilosophy.start);
	} else {
		elem.src = "images/philosophy_white.jpg";
		elem.alt = "Awards Philosophy";
	}
	
	var elem = document.getElementById("imageBackground");
	if (pageNumber >= moduleBackground.start && pageNumber < modulePhilosophy.start) {
		elem.src = "images/FIRSTbackground_black.jpg";
		elem.alt = "FIRST Background(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_first.jpg";
		elem.alt = "Module one";
		
		counter.innerHTML = (pageNumber - moduleBackground.start + 1) + "/" + (modulePhilosophy.start - moduleBackground.start);
	} else {
		elem.src = "images/FIRSTbackground_white.jpg";
		elem.alt = "FIRST Background";
	}
	
	var elem = document.getElementById("imageHome");
	if (pageNumber >= moduleHome.start && pageNumber < moduleBackground.start) {
		elem.src = "images/home_black.jpg";
		elem.alt = "Home(Current)";
		
		elem = document.getElementById("progressImage");
		elem.src = "images/module_zero.jpg";
		elem.alt = "Module zero";
		
		counter.innerHTML = pageNumber + "/" + (moduleBackground.start - 1);
	} else {
		elem.src = "images/home_white.jpg";
		elem.alt = "Home";
	}
}

function isQuiz(page) {
	return (quiz[pageNumber] !== undefined);
}

function markWrong(section) {
	var elem = document.getElementById(section);
	elem.className = "wrongAnswer";
	elem = document.getElementById(section+"Text");
	elem.className = "wrongAnswerBox";
}

function getPage(url, id) {
	try {
		var elementID = "content";
		
		asyncRequest = new XMLHttpRequest();
		
		// Register event handler
		asyncRequest.onreadystatechange = stateChange;
		
		// Build a post string
		var postString = "";
		
		// Make http GET request asynchronously
		asyncRequest.open("GET", url);
		
		// Set the Content-Type HTTP request header to indicate POST is being used to send data
		asyncRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		asyncRequest.send(postString);
		oldHash = window.location.hash;
		window.location.hash = "#" + pageNumber;
		checkSection();
	}
	catch(exception) {
		alert("Request failed: "+exception.message);
	}
}

// This function is called multiple times after open and send are called
function stateChange() {
	if (asyncRequest.readyState == 4) {
		document.getElementById("content").innerHTML = asyncRequest.responseText;
		loadPage();
	}
}