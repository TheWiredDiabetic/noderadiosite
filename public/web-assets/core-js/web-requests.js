async function fetchOnAir() {
    axios.get('https://localhost:3000/api/v1/onair')
    .then(response => {
        let apiData = response.data;
        if (apiData) {
            console.log(apiData);
            console.log("Success - retrieved data from API.");
            document.getElementById('song-title').innerText = apiData.song.title;
            document.getElementById('song-subtitle').innerText = apiData.song.artist;
            document.getElementById('song-cover').src = apiData.song.covers.medium;
        };
    });
};

fetchOnAir();