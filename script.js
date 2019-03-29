
function displayRepos(responseJson) {
    console.log(responseJson.length);
    for(let i = 0; i<responseJson.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <p><a href="${responseJson[i]['html_url']}">${responseJson[i]['html_url']}</a></p>
            </li>`
          )};
        //display the results section  
        $('#results').removeClass('hidden');
    }

function getRepos(user) {
let url= `https://api.github.com/users/${user}/repos`
fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        $('#results-list').empty();
        $('#js-error-message').empty();
        let search = $('#js-search').val();
        console.log(search);
        getRepos(search);
    });
}

$(watchForm);