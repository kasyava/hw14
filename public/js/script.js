
let baseURL;
let msgList;

$(() => {

    let  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;
    let header=null;

    baseURL = location.href;
    msgList = $('#msgList');



    let checkAuth = () =>{
        if(user!==null){
            header = {"Token":user.token};



            $( ".container" ).css( "display", "none" );
            $( ".wrapper" ).css( "display", "block" );
            $( ".one" ).css( "display", "inline-block" );
            $( ".two" ).css( "display", "inline-block" );

            if(user.role!=='admin') $('#idAddData').remove();

        }
    };

    checkAuth();


    $('#idLogout').on('click', (e) => {
        e.preventDefault();

        //const  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;

        if(user !== null){
            //const headers = {"Token":user.token};
            $.ajax({
                url: 'http://localhost:8000/users/sessions',
                headers: header,
                processData: false,
                contentType: false,
                type: 'DELETE'
            }).then(() =>{
                localStorage.removeItem('user');
                document.location.reload();
            })
        }

    });


    $('#login').on('click', (e) =>{
        e.preventDefault();

        const data = new FormData(document.getElementById('formLogin'));

        $.ajax({
            url: 'http://localhost:8000/users/sessions',
            data: data,
            headers: header,
            processData: false,
            contentType: false,
            type: 'POST'
        }).then(responce =>{
            localStorage.setItem('user', JSON.stringify(responce));
            document.location.reload();

        });
        //checkAuth();

    });





    const getQuery = (url) =>{
        return $.ajax(
            {
                url: url,
                type: 'GET',
                processData: false,
                contentType: false
            }
        );
    };

    getQuery('artists').then(result => printArtist(result));

    const printArtist = (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="col">');

            let name = $(`<p name="name" id="name${i}">`).text("Исполнитель: " + data[i].name);

            let information = $(`<p name="information" id="information${i}">`).text(data[i].information);

            let allAlbums = $(`<a id="allAlbums${data[i]._id}" href="">`).text("Все альбомы");
            let allTracks = $(`<a id="allTracks${data[i]._id}" href="">`).text("Все композиции");

            let image = $('<img height="150">');
            if(data[i].image) {
                image.attr("src", baseURL + "/uploads/" + data[i].image);
            }
            else{
                image.attr("src", baseURL + "/uploads/noimage.jpeg");
            }
            let imgDiv = $('<div id="mess" class="message-image">');
            imgDiv.append(image);

            let divName = $('<div class="message-author">').append(name);
            let divText = $('<div class="message-text">').append(information, allAlbums, allTracks);

            if(user!==null && user.role==='admin'){
                let delArtist = $(`<a id="delArtist${data[i]._id}" href="">`).text("УДАЛИТЬ ИСПОЛНИТЕЛЯ");
                divText.append(delArtist);

            }

            div.append(imgDiv, divName, divText);
            container.append(div);

            $(`#allAlbums${data[i]._id}`).on('click', (e)=>{

                e.preventDefault();

                getQuery(baseURL + 'albums?artist=' + data[i]._id)
                    .then((responce) => printAlbums(responce));

            });

            $(`#allTracks${data[i]._id}`).on('click', (e)=>{

                e.preventDefault();

                getQuery(baseURL + 'tracks/' + data[i]._id)
                    .then((responce) => printTracks(responce));

            });

            $(`#delArtist${data[i]._id}`).on('click', (e)=>{

                e.preventDefault();

                $.ajax({
                        headers: header,
                        url: baseURL + 'artists/' + data[i]._id,
                        type: 'DELETE',
                        processData: false,
                        contentType: false
                })
                .then(responce => {
                    console.log(responce);
                    getQuery('artists').then(result => printArtist(result));
                });


            });

        }
    };


    const printAllAlbums = (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="message-album">');

            let title = $(`<a href=""  id="album${data[i]._id}">`).text(data[i].title);

            let image = $('<img height="150">');
            if(data[i].cover) {
                image.attr("src", baseURL + "/uploads/" + data[i].cover);
            }
            else{
                image.attr("src", baseURL + "/uploads/noimage.jpeg");
            }

            div.append(image, '<br>', title);

            container.append(div);


            $(`#album${data[i]._id}`).on('click', (e)=>{

                e.preventDefault();

                getQuery(baseURL + 'albums/' + data[i]._id)
                    .then((responce) => printOneAlbum(responce));

            });
        }
    };

    const printOneAlbum = async (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        //for(let i = 0; i < data.length; i++) {
        let div = $('<div id="mess" class="col">');

        let title = $(`<p name="name" id="name${data._id}">`).text("Альбом: " + data.title);

        let artist = $(`<p  name="artist" id="artist${data._id}">`).text("Исполнитель: " + data.artist.name);
        let year = $(`<p name="year" id="year${data._id}"></p>`).text("Год выпуска: " + data.year);
        let allTracks = $(`<p id="allTracks${data._id}">`).text("Композиции вошедшие в альбом:");

        let image = $('<img height="150">');
        if(data.cover) {
            image.attr("src", baseURL + "/uploads/" + data.cover);
        }
        else{
            image.attr("src", baseURL + "/uploads/noimage.jpeg");
        }

        let imgDiv = $('<div id="mess" class="message-image">');
        imgDiv.append(image);

        let divName = $('<div class="message-author">').append(title);
        let divText = $('<div class="message-text">').append(artist, year, allTracks);

        let list = '<ul class="border">';

        await getQuery(baseURL + 'tracks?album=' + data._id)
            .then((responce) =>{

                responce.forEach((element) => {
                    list += '<ul>';
                    list += '<li style="color:red">'  + element.title +  '</li>';
                    list += '</ul>';
                });
                list += '</ul>';
            });

        divText.append(list);

        if(user!==null && user.role==='admin'){
            let delAlbum = $(`<a id="delAlbum${data._id}" href="">`).text("УДАЛИТЬ АЛЬБОМ");
            divText.append(delAlbum);

        }

        div.append(imgDiv, divName, divText);
        container.append(div);

        $(`#delAlbum${data._id}`).on('click', (e)=>{

            e.preventDefault();

            $.ajax({
                headers: header,
                url: baseURL + 'albums/' + data._id,
                type: 'DELETE',
                processData: false,
                contentType: false
            })
                .then(responce => {
                    console.log(responce);
                    getQuery('albums').then(result => printAllAlbums(result));
                });


        });

    };

    const printAlbums = (data) =>{
        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="col">');

            let title = $(`<p name="name" id="name${i}">`).text("Альбом: " + data[i].title);

            let artist = $(`<p  name="artist" id="artist${i}">`).text("Исполнитель: " + data[i].artist.name);
            let year = $(`<p name="year" id="year${i}"></p>`).text("Год выпуска: " + data[i].year);
            let allTracks = $(`<a id="allTracks${data[i]._id}" href="">`).text("Все композиции альбома");

            let image = $('<img height="150">');
            if(data[i].cover) {
                image.attr("src", baseURL + "/uploads/" + data[i].cover);
            }
            else{
                image.attr("src", baseURL + "/uploads/noimage.jpeg");
            }

            let imgDiv = $('<div id="mess" class="message-image">');
            imgDiv.append(image);

            let divName = $('<div class="message-author">').append(title);
            let divText = $('<div class="message-text">').append(artist, year, allTracks);

            div.append(imgDiv, divName, divText);
            container.append(div);

            $(`#allTracks${data[i]._id}`).on('click', (e)=>{

                e.preventDefault();

                getQuery(baseURL + 'tracks?album=' + data[i]._id)
                    .then((responce) =>printTracks(responce));

            });
        }
    };

    const printTracks = (data) =>{

        let container = msgList;
        container.empty();
        $('#wrapper').append(container);
        for(let i = 0; i < data.length; i++) {
            let div = $('<div id="mess" class="col">');

            let title = $(`<p name="name" id="name${i}">`).text("Название: " + data[i].title);

            let album = $(`<p  name="album" id="album${i}">`).text("Название альбома: " + data[i].album.title);
            let year = $(`<p name="year" id="year${i}"></p>`).text("Год выпуска: " + data[i].album.year);
            let duration = $(`<p name="artist" id="artist${i}"></p>`).text("Продолжительность: " + data[i].duration);

            let divName = $('<div class="message-author">').append(title);
            let divText = $('<div class="message-text">').append(album, year, duration);

            div.append(divName, divText);
            container.append(div);

        }
    };


    $('#idArtists').on('click', (e) => {
        e.preventDefault();
        getQuery(baseURL + 'artists').then(result => printArtist(result));
    });

    $('#idAlbums').on('click', (e) => {
        e.preventDefault();
        getQuery(baseURL + 'albums').then(result => printAllAlbums(result));
    });

    $('#idTracks').on('click', (e) => {
        e.preventDefault();
        getQuery(baseURL + 'tracks').then(result => printTracks(result));
    });

});