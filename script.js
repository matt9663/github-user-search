const baseURL = 'https://api.github.com/users/';

function renderResults(responseJson) {
    console.log(responseJson);
    for (i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li class="searchResult"><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></li>`
        )
    };
    $('#results').removeClass('hidden');
}

function getRepos(userName) {
    $('#results-list').empty();
    $('.errorMessage').text("");
    let fetchURL = baseURL + `${userName}/repos`;
    console.log(fetchURL);
    fetch(fetchURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => renderResults(responseJson))
    .catch(err => {
        $('.errorMessage').text(`Something broke down: ${err.message}`);
    })
}

function watchForSearch() {
    $('form').submit(event => {
        event.preventDefault();
        let searchedUser = $('#js-search-user').val();
        getRepos(searchedUser);
    });
}

$(watchForSearch);