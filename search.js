$(document).ready(function() {
        $('#searchInput').on('keyup', function() {
            let searchText = searchInput.value;
            console.log(searchText.length);
            if (searchText.length > 0) {
                searchApiRequest(searchText);
            }
        });

        $('#search').on('click',function() {
            let searchText = searchInput.value;
            if (searchText.length > 0) {
                useApiData(searchText);
            }
        })
});

async function searchApiRequest(searchText) {
        let resposne = await fetch('http://localhost:8089/search/querySuggestion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"q": `"${searchText}"`})
        });
        let data = await resposne.json();
        showList(data);
}

async function useApiData(searchText) {
        let resposne = await fetch('http://localhost:8089/search/query', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"q": `"${searchText}"`})
        });
        let data = await resposne.json();
        showResult(data);
}

function showList(data) {
        let list = '';
        for(let item of data.completions){
            list += `<option value="${item.expression}">`;
        }
        searchInputValues.innerHTML = list;
}

function showResult(data) {
        $('#search-result').show();
        let list = '';
        for(let item of data.results){
            let d = new Date(item.raw.date).toGMTString();
            list += `<div class="card mb-4 text-white bg-dark" style="width: 19rem;">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <a href="${item.uri}">Link</a>
                            <p class="card-text"><small>Description : ${item.excerpt}</small></p>
                        </div>
                        <div class="card-footer"><small class="text-muted">Date : ${d}</small></div>
                    </div>`;
        }
        dataRow.innerHTML = list;
}