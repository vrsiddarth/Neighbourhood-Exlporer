
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
 
    // YOUR CODE GOES HERE!
var streetName = ($( "#street").val());
var cityName = ($( "#city").val());
var imgPath = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+streetName+","+cityName;
 $body.append('<img class="bgimg" src="'+imgPath+'">');
    $greeting.text('So, you want to live at '+streetName+'   ?');
 
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "e12c29466b834e199fdaaf8d86edc133",
  'q': cityName
});

$.getJSON(url, function(data){
  
var items = [];

    $.each( data.response.docs, function(key, value) {
    console.log( data.response.docs[key].web_url);
    items.push( "<li id='" + key + "'>  <a href=" + data.response.docs[key].web_url + ">" + data.response.docs[key].headline.main+ " </a></li>" );
    items.push( "<li id='" + key + "'>" + data.response.docs[key].snippet + "</li>" );

    });
     $( "<ul/>", {
    "class": "nytElem",
    html: items.join( "" )
  }).appendTo( "body" );
})
.done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
    $nytElem.text('Erro with the API Request !!');
  })
  .always(function() {
    console.log( "complete" );
  });
  console.log(city);
var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+cityName+'&format=json&callback=wikiCallback';
//https://en.wikipedia.org/w/api.php?action=opensearch&search=winterpark&format=json&callback=wikiCallback

var wikiClearTimeRequest = setTimeout(function(){
    $wikiElem.text("failed to get wikipedia resources");
}, 8000)

$.ajax({
  url: wikiUrl,
  dataType: 'jsonp',
  jsonp:'callback',
  success: function( resp ){
    console.log(resp);
    var articleList = resp[1];
    console.log(articleList.length);
    for(var i =0;i<articleList.length;i++){
        articleStr = articleList[i];
        var url = 'https://en.wikipedia.org/wiki/'+articleStr;
        $wikiElem.append('<li><a href="'+url+'">'+articleStr+'</a></li>');
    };
    
    clearTimeout(wikiClearTimeRequest);  
  }

});

function loadImage(imgPath, width, height, target) {
    $('<img src="'+ imgPath +'">').load(function() {
      $(this).width(width).height(height).appendTo("target");

    });
}
    
  

// loadImage(imgPath, 800, 800, '#body');

$( "input" )
  .keyup(function() {
    var value = $( this ).val();
    $( "p" ).text( value );
  })
  .keyup();
    return false;
};
$('#form-container').submit(loadData);
