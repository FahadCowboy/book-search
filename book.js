const loadBooks = async () => {
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value

    const url = `http://openlibrary.org/search.json?q=${searchText}`
    // const url = `https://openlibrary.org/search.json?q=javascript`
    
    const response = await fetch(url)
    const data = response.json()

    console.log(data)
}

const displayBooks = books => {
    console.log(books)
}