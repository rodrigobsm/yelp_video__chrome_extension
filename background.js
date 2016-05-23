$("#super-container > div > div > div.column.column-beta.sidebar > div.open-rail.clearfix").prepend('<div class="island platform yform js-platform no-js-hidden ytype" data-ro-mode-action="place an order" data-component-bound="true" style="position: relative;"><h3 class="alternate js-platform-header"><span aria-hidden="true" style="width: 24px; height: 24px;" class="icon icon--24-order icon--size-24"><svg class="icon_svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#24x24_youtube"></use></svg></span> YouTube Videos</h3><div id="videos_youtube">Please wait, loading...</p><div class="js-recovery-flow-container hidden"></div><div class="throbber-overlay" style="display: none;"><div class="throbber-container"></div></div></div>');
$("body").prepend('<div id="youtube_video_player"><iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe></div>');

var title = encodeURIComponent($(".biz-page-title").html());
var url = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q="+title+"&key=AIzaSyAFPkCA5SZwdCdrWyOG4P7mfmSLDj14KKs&type=video";

$.getJSON(url, function( data ) {
  var items = [];
  $.each(data.items, function( i, item ) {
  
  	var img = item.snippet.thumbnails.medium.url;
    var url = "https://www.youtube.com/watch?v="+item.id.videoId;
        url = url.replace("watch?v=", "v/");  // fix same origin issue
	var title = item.snippet.title;
	
    items.push("<li><a title='"+title+"' data-url='"+url+"'><img src='" + img + "' width='100%'></a></li>");
    
  });
  
  $("#videos_youtube").html("");
 
  $( "<ul/>", {
    "class": "youtube_list",
    html: items.join( "" )
  }).appendTo("#videos_youtube");
  
    // function to load video player
	$(".youtube_list li a").bind('click', function(){
		$("#youtube_video_player").find("iframe").attr("src", $(this).attr('data-url')+"?autoplay=1");
		$("#youtube_video_player").fadeIn();
	});
  
});

// click to close
$("#youtube_video_player").bind('click', function(){
	$("#youtube_video_player").find("iframe").attr("src",""); // stop video
	$("#youtube_video_player").fadeOut();
});
