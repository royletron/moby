var filesLoaded = 0;
var filesToLoad = 0;
var cols = ["69D2E7", "A7DBD8", "E0E4CC", "F38630", "FA6900", "556270", "4ECDC4", "C7F464", "FF6B6B", "C44D58"]
var dictionary = {
    a: {text: "Albatross", img: "http://i.imgur.com/EWdclpd.png", sound: ""},
    b: {text: "Bat", img: "http://i.imgur.com/ihQsrkZ.png", sound: ""},
    c: {text: "Cow", img: "http://i.imgur.com/UPGd5rm.png", sound: "https://dl.dropboxusercontent.com/u/11260906/Single%20Cow-SoundBible.com-2051754137.mp3"},
    d: {text: "Dog", img: "http://i.imgur.com/4O1XX43.png", sound: ""},
    e: {text: "Elephant", img: "http://i.imgur.com/jaJ8tX6.png", sound: ""},
    f: {text: "Fox", img: "http://i.imgur.com/wpoGoxL.png", sound: ""},
    g: {text: "Giraffe", img: "http://i.imgur.com/KB57AlW.png", sound: ""},
    h: {text: "Hippopotamus", img: "http://i.imgur.com/aDEmXSW.png", sound: ""},
    i: {text: "Iguana", img: "http://i.imgur.com/YBeyR0K.png", sound: ""},
    j: {text: "Jaguar", img: "http://i.imgur.com/GDXkR3y.png", sound: ""},
    k: {text: "Kangaroo", img: "http://i.imgur.com/Ft7rcqC.png", sound: ""},
    l: {text: "Lemur", img: "http://i.imgur.com/XIeAw27.png", sound: ""},
    m: {text: "Mandrill", img: "http://i.imgur.com/oOKWr6z.png", sound: ""},
    n: {text: "Newt", img: "http://i.imgur.com/Rhdz2Fw.png", sound: ""},
    o: {text: "Owl", img: "http://i.imgur.com/HR9gBlN.png", sound: ""},
    p: {text: "Pig", img: "http://i.imgur.com/zKuhqzW.png", sound: ""},
    q: {text: "Quail", img: "http://i.imgur.com/vhPIU4z.png", sound: ""},
    r: {text: "Rabbit", img: "http://i.imgur.com/BSGoNeE.png", sound: ""},
    s: {text: "Sheep", img: "http://i.imgur.com/NW04HQ8.png", sound: ""},
    t: {text: "Tiger", img: "http://i.imgur.com/5z67mBu.png", sound: ""},
    u: {text: "Urial", img: "http://i.imgur.com/DlCv3sV.png"},
    v: {text: "Vulture", img: "http://i.imgur.com/vE4Vn7u.png", sound: ""},
    w: {text: "Walrus", img: "http://i.imgur.com/yr4H5lP.png"},
    x: {text: "Xerus", img: "http://i.imgur.com/YkB870d.png"},
    y: {text: "Yak", img: "http://i.imgur.com/fRAeGXN.png"},
    z: {text: "Zebra", img: "http://i.imgur.com/Yxx7OIw.png"}
}
$(document).keypress(function(e){
    randomBG();
    var c = String.fromCharCode(e.which).toLowerCase();
    var item = dictionary[c];
    $('#title').text(item.text);
    $('#img').attr("src", item.img)
    if(item.audio != undefined){
    		item.audio.stop();
    		item.audio.play();
    }
})

function randomBG(){
    var pos = Math.floor(Math.random()*cols.length);
    var col = cols[pos];
    $('body').css("background", "#"+col);
}

$(document).ready(function(){
    $.each(dictionary, function(k, v){
        if(v.img != "" && v.img != undefined)
        {
            filesToLoad++;
            v.image = new Image();
            v.image.onload = isAppLoaded;
            v.image.src = v.img;
        }
        if(v.sound != "" && v.sound != undefined)
        {
            filesToLoad++;
            v.audio = new Howl({ urls: [v.sound], autoplay: false, onload: isAppLoaded});
        }
    });
})

function isAppLoaded()
{
    filesLoaded++;
    var perc = Math.ceil((filesLoaded/filesToLoad) * 100);
    $('body').css('background', 'linear-gradient(to right, #B1D27D 0%,#B1D27D '+perc+'%,#000000 '+(perc+1)+'%,#000000 100%);');
    $('body').css('background', '-webkit-linear-gradient(left, #B1D27D 0%,#B1D27D '+perc+'%,#000000 '+(perc+1)+'%,#000000 100%)')
    if (filesLoaded >= filesToLoad){
        console.log("Loaded yeah");
        $('#title').text('Ready');
        //randomBG();
    }
}
