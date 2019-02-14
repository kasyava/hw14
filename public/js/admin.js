$(() => {


    let  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;
    let header=null;



    let checkAuth = () =>{
        if(user!==null){
            header = {"Token":user.token};
            if(user.role!=='admin') return;


           // $( ".container" ).css( "display", "none" );
            $( ".wrapper" ).css( "display", "block" );
            $( ".one" ).css( "display", "inline-block" );
            //$( ".two" ).css( "display", "inline-block" );



        }
    };

    checkAuth();

    //alert(location.origin);
    $('#idBack').attr('href', location.origin);

    const fillArtist = () =>{
        let selectorArtistList = $("#albumArtist");

        $.ajax(
            {
                url: "http://localhost:8000/artists",
                type: 'GET',
                processData: false,
                contentType: false
            })
            .then(response =>{
                selectorArtistList.empty();
                $.each(response, (i, item) => {
                    selectorArtistList.append($('<option>', {
                        value: item._id,
                        text : item.name
                    }));
                });

            });



    };

    const fillAlbum = () =>{
        let selectorAlbumList = $("#trackAlbum");

        $.ajax(
            {
                url: "http://localhost:8000/albums",
                type: 'GET',
                processData: false,
                contentType: false
            })
            .then(response =>{
                selectorAlbumList.empty();
                $.each(response, (i, item) => {
                    selectorAlbumList.append($('<option>', {
                        value: item._id,
                        text : item.title
                    }));
                });

            });



    };

    fillArtist();
    fillAlbum();


    $('#btnAddArtist').on('click', (e) =>{
        e.preventDefault();
        let data = new FormData(document.getElementById('addArtist'));
        console.log(data);
        $.ajax({
            url: "http://localhost:8000/artists",
            type: 'POST',
            data: data,
            processData: false,
            contentType: false
        }).then(response => {
            console.log(response);
            fillArtist();
        });

    });

    $('#btnAddAlbum').on('click', (e) =>{
        e.preventDefault();
        let data = new FormData(document.getElementById('addAlbum'));
        console.log(data);
        $.ajax({
            url: "http://localhost:8000/albums",
            type: 'POST',
            data: data,
            processData: false,
            contentType: false
        }).then(response => {
            console.log(response);
            fillAlbum();
        });

    });


    $('#btnAddTrack').on('click', (e) =>{
        e.preventDefault();
        let data = new FormData(document.getElementById('addTrack'));
        console.log(data);
        $.ajax({
            url: "http://localhost:8000/tracks",
            type: 'POST',
            data: data,
            processData: false,
            contentType: false
        }).then(response => console.log(response));

    })

});

