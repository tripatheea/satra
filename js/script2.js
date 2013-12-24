$('.card-back').on("click", function(){
	user_folded()
});

$(document).on("click",".card-front",function(){
	add_card('1')
});