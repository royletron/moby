var filesLoaded = 0;
var filesToLoad = 0;
var cols = ["69D2E7", "A7DBD8", "E0E4CC", "F38630", "FA6900", "556270", "4ECDC4", "C7F464", "FF6B6B", "C44D58", "FEB07B", "E4A8D2", "D8254D", "1693A5", "FA565F", "FAF6E8", "68DDD2", "E8ED76"];

$(document).keypress(function(e){
    var c = String.fromCharCode(e.which).toLowerCase();
    gotoKey(c);
})

function gotoKey(k)
{
    $('#info').hide();
    var key = dictionary[k];
    var item = key[Math.floor(Math.random()*key.length)];
    if(item != undefined)
    {
        randomBG();
        var img = item.images[Math.floor(Math.random()*item.images.length)];
        $('#img-holder').hide();
        $('#title').text(item.name);
        $('#img').attr("src", img.url)
        if(item.audio != undefined){
            item.audio.stop();
            item.audio.play();
        }
        $('#img-holder').fadeIn(300);
    };
}

function randomBG(){
    var pos = Math.floor(Math.random()*cols.length);
    var col = cols[pos];
    $('body').css("background", "#"+col);
}

function start()
{
	$('body').html('<h1 id="title">Loading... </h1><h2 id="info">hold \'yer orses\'</h2><div id="img-holder"><img id="img"/></div>')
    $.each(dictionary, function(k, v){
        $.each(v, function(j, iv){
            $.each(iv.images, function(h, image){
                if(image.url != "" && image.url != undefined)
                {
                    filesToLoad++;
                    var i = new Image();
                    i.onload = isAppLoaded;
                    i.src = image.url;
                }
            })
        })
    });
    if(mobile)
    {
        $('body').append('<div id="mobile-keys"></div>');
        for (var i = 65; i <= 90; i++) {
            var btn = $('<a class="btn btn--soft">'+String.fromCharCode(i)+'</a>');
            btn.click(function(e){
                gotoKey($(e.target).text().toLowerCase());
            });
            $('#mobile-keys').append(btn);
        }
    }
}

function isAppLoaded()
{
    filesLoaded++;
    var perc = Math.ceil((filesLoaded/filesToLoad) * 100);
    $('body').css('background', 'linear-gradient(to right, #B1D27D 0%,#B1D27D '+perc+'%,#000000 '+(perc+1)+'%,#000000 100%);');
    $('body').css('background', '-webkit-linear-gradient(left, #B1D27D 0%,#B1D27D '+perc+'%,#000000 '+(perc+1)+'%,#000000 100%)')
    if (filesLoaded >= filesToLoad){
        console.log("Loaded yeah");
        $('#title').text('Ready');
        $('#info').text('now press any letter of the alphabet')
        //randomBG();
    }
}
