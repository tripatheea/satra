dealer = 0;					// 0 => PC. 1 => Player
playing = [1];				// Add elements when there are more than 2 players playing.
cardsPlayed = [];
players = []; players[0] = []; players[1] = [];

suits = ['hearts', 'spades', 'diamonds', 'clubs'];
ranks = $.map($(Array(9)),function(val, i) { return i + 2; })
ranks.unshift('ace');
ranks.push('jack', 'queen', 'king');
specialSet = [ [10, 10], ['queen', 9], ['king', 10], ['A', 'A'] ];
sumChart = new Array(); sumChart['ace'] = 1; sumChart['jack'] = 11; sumChart['queen'] = 12; sumChart['king'] = 13;
userFolded = false;
showNewCard = true;
sum = new Array();
for (i = 0; i < players.length; i++){
	sum[i] = 0;
}
timeToRestart = 3;

function draw_card(){
	drawnCard = [];
	suitsLength = 4;
	ranksLength = 13;
	drawnSuit = suits[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
	drawnRank = ranks[Math.floor(Math.random() * (12 - 0 + 1) + 0)];
	drawnCard = [drawnRank, drawnSuit];
	if ( cardsPlayed.length == 52 ){
		throw 'All Cards Exhausted!';
	}
	else if ( ! card_already_played(drawnCard) ){
		cardsPlayed.push(drawnCard);
		return drawnCard;
	}
	else {
		return draw_card();
	}
}

function draw_card_for_computer() {
	// A little bit of cheating to give the computer an edge but making sure that the game "feels" fair.
	drawnCard = draw_card();
	sumSoFar = calculate_sum(players[0]);
	if (random_magic(40)) {
		return drawnCard;
	}
	else {
		if (typeof drawnCard[0] != "number"){
				newRank = sumChart[drawnCard[0]];
			}
			else {
				newRank = drawnCard[0];
			}
		if (sumSoFar + newRank > 17) {
			var index = cardsPlayed.indexOf(drawnCard);
			if (index > -1) {
				cardsPlayed.splice(index, 1);
			}
			return draw_card_for_computer();
		}
		else {
			return drawnCard;
		}
	}
}

function card_already_played(drawnCard){
	for (i = 0; i < cardsPlayed.length; i++){
		card = cardsPlayed[i];
		if ( drawnCard[0] == card[0] && drawnCard[1] == card[1] ){
			return true;
			break;
		}
	}
	return false;
}

function calculate_sum(player){
	sum = 0
	for (i = 0; i < player.length; i++){
		if (typeof player[i][0] != "number"){
			sum += sumChart[player[i][0]];
		}
		else {
			sum += player[i][0];
		}
	}
	return sum;
}

function announce_results(sum, player) {
	if (sum == 17){
		if (player == 0) {
			// Computer got 17. User lost.
			message = "you:~$ You folded.<br>you:~$ You lost!";
			$('.user-msg').html(message);
			message = "computer:~$ Computer won! <div class='computer-cursor'>&nbsp;</div>";
			$('.computer-msg').html(message);
			// Send win count to server.
			win_count(0);
			cookie_win(0); counter($('.user-time'), timeToRestart);
			userFolded = true;
			return true;
		} else {
			message = "<br>you:~$ You won!";
			$('.user-msg').html(message);
			message = "computer:~$ Computer lost! <div class='computer-cursor'>&nbsp;</div>";
			$('.computer-msg').html(message);
			// Send win count to server.
			win_count(1);
			cookie_win(1); counter($('.user-time'), timeToRestart);
			userFolded = true;
			return true;
		}
	}
	else if (sum > 17){
		if (player == 0) {
			// Computer got over 17. User won.
			message = "you:~$ You folded.<br>you:~$ You won!";
			$('.user-msg').html(message);
			message = "computer:~$ Computer lost! <div class='computer-cursor'>&nbsp;</div>";
			$('.computer-msg').html(message);
			// Send win count to server.
			win_count(1);
			cookie_win(1); counter($('.user-time'), timeToRestart);
			userFolded = true;
			return true;
		}
		else {
			message = "<br>you:~$ You lost!";
			$('.user-msg').html(message);
			message = "computer:~$ Computer won! <div class='computer-cursor'>&nbsp;</div>";
			$('.computer-msg').html(message);
			// Send win count to server.
			win_count(0);
			cookie_win(0); counter($('.user-time'), timeToRestart);
			userFolded = true;
			return true;
		}
	}
	return false;
}

function user_folded() {
	// Throw in the message that user folded.
	message = "you:~$ You folded! <div class='user-cursor'>&nbsp;</div>";
	$('.user-msg').html(message);
	userFolded = true;
	// Show computer's first card.
	card = players[0][0];
	$('.card-back').remove();
	sourced = "<img class='card card-computer' src='images/cards/" + card[0] + '_of_' + card[1] + ".png'>&nbsp;";
	$('.computer').append(sourced);
	// Send fold count to server.
	fold_count(1, calculate_sum(players[1]));
	// The first hidden card has just been shown. Now, slowly show other cards too. 
	setTimeout( function(){
		show_computer_cards();
	}, 1000 );
	return;
}

function should_computer_fold() {
	// If the sum so far is 13, use some probability stuff. A little over 60% skewed towards drawing a new card.
	bias = Array(); bias['13'] = 40; bias['12'] = 15; bias['11'] = 5; 
	if (calculate_sum(players[0]) >= 14) {
		return true;
	}
	else if((calculate_sum(players[0]) >= 11) && (calculate_sum(players[0]) <= 13)) {
		return random_magic(bias[calculate_sum(players[0])]);
	}
	return false;
}

function counter($el, n) {
	(function loop() {
		$el.html("<br>Will restart in <strong>" + n + "</strong> s.<div class='user-cursor'>&nbsp;</div>");
		if (n == 0) {
			window.location = 'http://techsth.com/seventeen/';
		}
		if (n--) {
			setTimeout(loop, 1000);
		}
	})();
}

function everyone_folded() {
	message = "computer:~$ Computer folded. <div class='computer-cursor'>&nbsp;</div>";
	$('.computer-msg').html(message);
	computerSum = calculate_sum(players[0]);
	userSum = calculate_sum(players[1]);
	
	// Send fold count to server.
	fold_count(0, computerSum); 
	
	if (userSum > computerSum) {
		message = "you:~$ You folded.<br>you:~$ You won!";
		$('.user-msg').html(message);
		message = "computer:~$ Computer folded.<br>computer:~$ Computer lost! <div class='computer-cursor'>&nbsp;</div>";
		$('.computer-msg').html(message);
		// Send win count to server.
		win_count(1);
		cookie_win(1); counter($('.user-time'), timeToRestart);
	}
	else if(userSum < computerSum) {
		message = "you:~$ You folded.<br>you:~$ You lost!";
		$('.user-msg').html(message);
		message = "computer:~$ Computer folded.<br>computer:~$ Computer won! <div class='computer-cursor'>&nbsp;</div>";
		$('.computer-msg').html(message);
		// Send win count to server.
		win_count(0);
		cookie_win(0); counter($('.user-time'), timeToRestart);
	}
	else {
		message = "you:~$ You folded.<br>you:~$ It's a tie!";
		$('.user-msg').html(message);
		message = "computer:~$ Computer folded.<br>computer:~$ It's a tie!! <div class='computer-cursor'>&nbsp;</div>";
		// Send tie count to server.
		win_count(9);
		$('.computer-msg').html(message); counter($('.user-time'), timeToRestart);
	}
}

function show_computer_cards(){
	if ( ! announce_results(calculate_sum(players[0]), 0)) { // No interesting result yet. Proceed towards adding a new card.
		if ( ! should_computer_fold()) {
			//newDrawnCard = draw_card();
			newDrawnCard = draw_card_for_computer();
			players[0].push(newDrawnCard);
			sourced = "<img class='card card-front' src='images/cards/" + newDrawnCard[0] + '_of_' + newDrawnCard[1] + ".png'>&nbsp;";
			$('.computer').append(sourced);
			
			setTimeout( function(){
				show_computer_cards();
			}, 500 );
		}
		else {
			everyone_folded();
			return;
		}
	}
}

function add_card() {
	if ( ! userFolded) {
		card = draw_card();
		players[1].push(card);
		sourced = "<img class='card card-front' src='images/cards/" + card[0] + '_of_' + card[1] + ".png'>&nbsp;";
		$('.player').append(sourced);
	}
	
	/**
	/*	Calculate sum of the cards and call the announce_results method to see if there's something special (win by 17 or loss by 17+).
	/*  Else check to see if there's some special set of cards in the current player's array.
	/*	Else proceed to draw a new card and append it to the correct DOM.
	**/
	
	setTimeout( function(){
					announce_results(calculate_sum(players[1]), 1);
				}, 250 );
}



function deal_first_hand() {
	// Reset everything. It's like a brand new game because this function can be called recursively and not resetting everything can lead to disasters. I'm talking from experience.
	card1 = []; cardsPlayed = []; players = []; players[0] = []; players[1] = [];
	// Distribute cards.
	card1 = draw_card();	// For user.
	cardsPlayed.push(card1);
	card2 = draw_card();	// For computer.
	cardsPlayed.push(card2);
	card3 = draw_card();	// For user.
	cardsPlayed.push(card3);
	
	players[1].push(card1);			// For player.
	players[0].push(card2);			// For computer.
	players[1].push(card3);			// For player.
	if (calculate_sum(players[1]) >= 17) {
		// Game got over without dealing any more cards. Restart game.
		// Deal a new hand.
		deal_first_hand();
	}
	else {
		for (i = 0; i < players[1].length; i++){
			sourced = "<img class='card card-front' src='images/cards/" + players[1][i][0] + '_of_' + players[1][i][1] + ".png'>&nbsp;";
			$('.player').append(sourced);
		}
		sum = calculate_sum(players[1]);
		setTimeout( function(){
						announce_results(sum, 1);
					}, 250 );
	}
}

/*
$(document).ready(function(){
	t = Array();
	f = Array();
	for (i = 0; i < 100; i++) {
		a = random_magic(70);
		if (a){
			t.push('a');
		}
		else {
			f.push('b');
		}
	}
	console.log(t.length);
	console.log(f.length);
});
*/

function random_magic(biasForTruth){
	a = Math.floor(Math.random() * (10 - 1 + 1) + 1);
	if (a > biasForTruth/10){
		return false;
	}
	else {
		return true;
	}
}

function cookie_magic() {
	// Check if scores cookie exists. If not create one. If it does, set an array scores with the computer's and player's scores so far.
	var cookie_name = 'kak1p0La1AL';
	if ($.cookie(cookie_name)) {
		scores = jQuery.parseJSON($.cookie('kak1p0La1AL'));
		$('.user-score').html(scores[1]);
		$('.computer-score').html(scores[0]);
	}
	else {
		scores = new Object(); scores[0] = 0; scores[1] = 0;
		$.cookie('kak1p0La1AL', JSON.stringify(scores), { expires: 1 });
	}
}

function cookie_win(playerIndex) {
	newScores = Object();
	newScores[playerIndex] = scores[playerIndex] + 1;
	newScores[Math.abs(playerIndex - 1)] = scores[Math.abs(playerIndex - 1)];
	$.cookie('kak1p0La1AL', JSON.stringify(newScores), { expires: 1 });
	$('.user-score').html(newScores[1]);
	$('.computer-score').html(newScores[0]);
}

function fold_count(player, count) {
	data = 'player=' + player + '&count=' + count;
	$.ajax({
		url: "http://techsth.com/seventeen/analytics/fold_count.php",
		type: "POST",
		data: data,
		cache: false,
	});
}

function win_count(player) {
	data = 'player=' + player;
	$.ajax({
		url: "http://techsth.com/seventeen/analytics/win_count.php",
		type: "POST",
		data: data,
		cache: false,
	});
	if (player != 9) { score = calculate_sum(players[player]); } else { score = calculate_sum(players[0]); }
	score_count(player, score);
}

function score_count(player, score) {
	data = 'player=' + player + '&score=' + score;
	$.ajax({
		url: "http://techsth.com/seventeen/analytics/score_count.php",
		type: "POST",
		data: data,
		cache: false,
	});
}

$(document).ready(function() {
	$( ".card" ).draggable({ containment: "parent" });	
	if ( ! $.cookie('kak1p0La1AL')) {
		$(".instructions").fancybox().trigger('click');
	}
	cookie_magic();
	deal_first_hand();
});

$(document).ready(function() {
	/* Apply fancybox to multiple items */
	$("a.instructions").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false,
			'hideOnContentClick': true
	});
});

/*
$.removeCookie('kak1p0La1AL');
*/