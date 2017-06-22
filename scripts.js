var favMov = localStorage.getItem("fav");
try{
localstorage.setItem("fav", "hello");
}catch(err){
    console.log("No favourite film");
}

if (favMov == null) {
    $("#m-navbar-fav-choice").text("No movie selected");
} else {
    $("#m-navbar-fav-choice").text(localStorage.getItem("fav"));
}

$("#inputlg").keypress(function (e) {
    try{
    var search = $("#inputlg").val();
    if (e.which == '13') {
        $("#movie-content").fadeOut(500, function () {
            $('#movie-content').html('');
            $.ajax({
                url: "http://www.omdbapi.com/?s=" + search + "&r=json",
                dataType: "JSON",
                data: {
                    escape: "javascript"
                }
            }).done(function (data) {
                try {
                    var i = data.Search.length;
                    $.each(data.Search, function (i, item) {
                        var newdiv = $('<div>', {
                            style: 'font-style: italic; padding: 20px;background-color: #eee;box-shadow: 0 0 2px #999;font-size: 18px; margin: 10px;'
                        });
                        var text = ('<h3>' + item.Title + " (" + item.Year + ")" + '</h3>');
                        var img = $('<img src=' + item.Poster + ' class="img-thumbnail" width="80" height="120">');
                        newdiv.prepend(text);
                        newdiv.append(img);
                        newdiv.append($('<button class="fav" style="background-color: white; font-size: 18px; border-color: rgba(0, 0, 0, 0.1); margin: 10px; float: right;"><img src="images/heart.png" width="60px" height="60px"></button>').on("click", function () {
                            localStorage.setItem("fav", item.Title);
                            $("#m-navbar-fav-choice").text(item.Title);
                        }));
                        newdiv.appendTo('#movie-content');
                    });
                    $("#movie-content").fadeIn(500);
                } catch (err) {
                    console.log("No results");
                }
            });
        });
    }}catch(err){
        console.log(err);
    }
});

$("#fetchBtn").on("click", function () {
    $("#mediaLib").fadeOut(500, function () {
        $('#mediaLib').html('');
        var format = $("#fetchFormat").val();
        $.ajax({
            url: "server.php?",
            dataType: "json",
            data: {
                action: "getMedia",
                type: format
            }
        }).done(function (data) {
            $.each(data.files, function (i, item) {
                var newdiv = $('<div>', {
                    style: 'font-style: italic; padding: 20px;background-color: #eee;box-shadow: 0 0 2px #999;font-size: 18px; margin: 10px;'
                });
                var type = item.type;
                switch (type) {
                case "audio":
                    var audio = $('<audio style="width: 100%;" controls="controls" src="' + item.path + '"></audio>');
                    newdiv.append(audio);
                    break;
                case "video":
                    var video = $('<video controls="controls" src="' + item.path + '" style="max-width: 100%; max-height: 100%;"></video>');
                    newdiv.append(video);
                    break;
                case "photo":
                    var img = $('<img src=' + item.path + ' class="img-thumbnail" max-width="100%" max-height="100%">');
                    newdiv.append(img);
                    break;
                }
                var text = ('<h3>' + item.title + '</h3>');
                newdiv.prepend(text);
                newdiv.appendTo('#mediaLib');
            });
        }).fail(function (data) {
            alert("Failed to Retrieve, Try Again");
        });
    });
    $("#mediaLib").fadeIn(500);
});

$("#fetchBtnAll").on("click", function () {
    $("#mediaLib").fadeOut(500, function () {
        $('#mediaLib').html('');
        $.ajax({
            url: "server.php?",
            dataType: "json",
            data: {
                action: "getMedia"
            }
        }).done(function (data) {
            $.each(data.files, function (i, item) {
                var newdiv = $('<div>', {
                    style: 'font-style: italic; padding: 20px;background-color: #eee;box-shadow: 0 0 2px #999;font-size: 18px; margin: 10px;'
                });
                var type = item.type;
                switch (type) {
                case "audio":
                    var audio = $('<audio style="width: 100%;" controls="controls" src="' + item.path + '"></audio>');
                    newdiv.append(audio);
                    break;
                case "video":
                    var video = $('<video controls="controls" src="' + item.path + '" style="max-width: 100%; max-height: 100%;"></video>');
                    newdiv.append(video);
                    break;
                case "photo":
                    var img = $('<img src=' + item.path + ' class="img-thumbnail" max-width="100%" max-height="100%">');
                    newdiv.append(img);
                    break;
                }
                var text = ('<h3>' + item.title + '</h3>');
                newdiv.prepend(text);
                newdiv.appendTo('#mediaLib');
            });
        }).fail(function (data) {
            alert("Failed to Retrieve, Try Again");
        });
    });
    $("#mediaLib").fadeIn(500);
});

$("#selFormat").change(function () {
    var str = "";
    $("#selFormat option:selected").each(function () {
        str = $(this).text();
    });
    switch (str) {
    case "Pick a format":
        break;
    case "Photo":
        $("#testtest").empty();
        $("#testtest").append('<input id="selObj" type="file" name="media" class="btn" accept="image/*" capture="camera" class="form-control">');
        break;
    case "Video":
        $("#testtest").empty();
        $("#testtest").append('<input id="selObj" type="file" name="media" class="btn" accept="video/*" capture="camcorder" class="form-control">');

        break;
    case "Audio":
        $("#testtest").empty();
        $("#testtest").append('<input id="selObj" type="file" name="media" class="btn" accept="audio/*" capture="microphone" class="form-control">');

        break;
    }

    $("#selObj").html()
}).trigger("change");