Satra
=========

A simple card game built with JavaScript with lots of help from jQuery.

A live working version at: http://techsth.com/satra/

--------------
This is a simple card game where the aim is to get your cards as close to 17 as possible. The following describe the rules and instructions on how to play:
			
			
- You'll be given two cards to start with.
- If you want more, click on any of your card. Your cards are shown while the computer's card is turned back.
- If the sum of ranks of your card reaches 17, you win. If it gets over 17, the computer wins.
- Go on adding cards till you're as close to 17 as possible.
- To fold, click on the computer's card. The computer's card is turned back.

--------------

Data Collection:
----------------
The game collects the following gameplay data:
- Score of user and computer when they fold.
- Number of wins and ties of computer and user.
- Score of the winner in each game.

The server-side code to save and present these data is in PHP. All PHP files are inside the directory "analytics".

Installation:
-------------
* Extract everything.
* Import the SQL dump analytics.db
* Edit all the PHP files inside ./analytics/ to set the proper DB name and credentials.
* Edit ./js/script.js and make the following changes:
 * Find the function 'counter()' (somewhere around line 174) and edit the url after window.location to the base url where the game is installed.
 * Find the function 'fold_count()' (somewhere around line 346) and edit the ajax url to wherever the ajax handling (fold_count) PHP is.
 * Find the function 'win_count()' (somewhere around line 356) and edit the ajax url to wherever the ajax handling (win_count) PHP is.
 * Find the function 'win_count()' (somewhere around line 368) and edit the ajax url to wherever the ajax handling (score_count) PHP is.

Thank you:
----------
The following helped a lot for the game (in no particular order):
* jQuery- http://jquery.com/
* jQuery UI- http://jqueryui.com/
* Bootstrap- http://getbootstrap.com/
* Google Chart API- https://google-developers.appspot.com/chart/
* jQuery Cookie- https://github.com/carhartl/jquery-cookie
* jQuery FancyBox- http://fancybox.net/

