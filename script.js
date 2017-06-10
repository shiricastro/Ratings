$('form').submit(function(e){
    e.preventDefault();
    var result =$('form label span.activ').length;
    cleanStar();
    reviews.push(result);
    reviews.ReviwesPush(result);
});

var stars = $('form label span.star');
console.log(stars);

stars.mouseover(function(e){
    changeColor(e);
});
$('form label').mouseleave(function(e){
    $(e.currentTarget).children('.star:not(.activ)').each(function(index, el) {      
        $(el).html('&#9734;');
    });   
});
stars.click(function(e){
    changeClass(e);   
});

function changeClass(e){
  $(e.target).addClass('activ');
  $(e.target).html('&#9733;');
  $(e.target).siblings().each(function (i, el) {
    if ($(el).index() < $(event.target).index()) {
        $(el).addClass('activ');
        $(el).html('&#9733;');
    }
  });
}
function changeColor(e){  
  $(e.target).html('&#9733;');
  $(e.target).siblings().each(function (i, el) {
    if ($(el).index() < $(event.target).index()) {
        $(el).html('&#9733;');
    }
  });
}
function cleanStar(){
  $('form label span.star').each(function(i,el){
     $(el).html('&#9734;');
     $(el).removeClass('activ');
  });
  $('div.title-avg span.star').each(function(i,el){
     $(el).html('&#9734;');
  });
};



var reviews = (function () {
	var container = [];
        var reviewP5 =[];
        var reviewP4 =[];
        var reviewP3 =[];
        var reviewP2 =[];
        var reviewP1 =[];
        
	return {
		getAll: function () {return container;},
                get5Stars: function () {return reviewP5;},
                get4Stars: function () {return reviewP4;},
                get3Stars: function () {return reviewP3;},
                get2Stars: function () {return reviewP2;},
                get1Stars: function () {return reviewP1;},
		push: function (rate) {
			container.push(rate);
			ratesFunctions();
		},
                ReviwesPush: function(rate){
                    if (rate === 5){
                       reviewP5.push(rate);
                    }else if (rate === 4){
                       reviewP4.push(rate); 
                    }else if (rate === 3){
                       reviewP3.push(rate); 
                    }else if (rate === 2){
                       reviewP2.push(rate); 
                    }else{
                       reviewP1.push(rate); 
                    }
                    reviewsSum(rate);
                }
            };
})();

function ratesFunctions(){
    var reviewsArray = reviews.getAll();
    var reviewsCount = reviewsArray.length;
    $('span.reviews-total').text(reviewsCount);
    
    var reviewsSum =0;
    for(let i=0; i< reviewsCount; i++){      
        reviewsSum += reviewsArray[i]; 
    }
    var reviwsAvg = reviewsSum/reviewsCount;
    $('span.reviews-avg').text(reviwsAvg.toPrecision(2));
    
    colorStars(reviwsAvg);
};

function colorStars(avg){
    var avgw = Math.round(avg);
    console.log(avgw);
    $('div.title-avg span.star').each(function(i, el) {
        if ($(el).index() < avgw) {
            $(el).html('&#9733;');
        };        
    });
};

function reviewsSum(rate){ 
    let a = "get" + rate +"Stars";
    $('.total-rates-no' + rate + '').text(reviews[a]().length);
};