
//This is the initial function which will executed if if the search button is clicked
const loadBooks = async () => {
// here we have catch the input field then cleared the input field after storing the given value.
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value
    inputField.value = ''

// here we have catch the reasult showing element then cleared all the existing elements inside those befor fetching again.
    const totalBooks = document.getElementById('total-books')
    totalBooks.textContent = ''
    const resultContainer = document.getElementById('result-container')
    resultContainer.textContent = ''

// We have checking here that the search value is empty or not
    if(searchText === ''){

        //if search value is empty, we are gonna through this error massage.
        const div = document.createElement('div')
        div.classList = 'alert alert-danger mx-auto text-center'
        div.innerHTML = `
            <div style="font-weight:bold; font-size: 1.4rem">
                Opps! Search query can not be empty!
            </div>
        `
        resultContainer.appendChild(div)
        return
    } else {
        //spinner activated here
        document.getElementById('spinner').style.display = 'block'

        //If search value is not empty, The API will be fetched.
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        const response = await fetch(url)
        const data = await response.json()

        //Here we are checking the the Array of data is empty or not
        if(data.docs.length === 0){
            //If the array of data is empty that means search value was incorrect, then error msg bellow will be executed.
            document.getElementById('spinner').style.display = 'none'
            const div = document.createElement('div')
            div.classList = 'alert alert-danger mx-auto text-center'
            div.innerHTML = `
                <div style="font-weight:bold; font-size: 1.4rem">
                    Opps! Your search query didn't match with any of books!
                </div>
            `
            resultContainer.appendChild(div)
            return
        }else{
        //If everything goes wll, we will send the real data to the display function.
            displayBooks(data)
        }
    }

}

const displayBooks = books => {
// Theese codes will show the total amout of book recived from server.
    const totalBooks = document.getElementById('total-books')
    const resultContainer = document.getElementById('result-container')

    const ol = document.createElement('ol')
        ol.classList = `list-group list-group-numbered col-12 col-lg-4 mx-auto mb-4`
        ol.innerHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                    <div style="font-weight:bold">Total books found</div>
                </div>
                <span class="badge bg-primary rounded-pill p-2 text-white">${books.numFound}</span>
            </li>
        `
        totalBooks.appendChild(ol)
        console.log(books.numFound)

//Code bellow will push each book's data into the result div 
    books.docs.forEach( book => {
        const div = document.createElement('div')
        div.classList = 'col-lg-4 py-3'
        div.innerHTML = `
        <div class="bg-white rounded">
            <div style="height: 320px;background-color: #2c2f59; border-radius: 3px;display:flex;justify-content: center;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="h-100" alt="...">
            </div>
            <div class="">
                <h5 class="p-3">${book.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent"><span style="font-weight:bold;">Author name:</span> ${book?.author_name?.[0]?? 'Not found'}</li>
                <li class="list-group-item bg-transparent"><span style="font-weight:bold;">First published:</span> ${book?.first_publish_year ?? 'Not found'}</li>
                <li class="list-group-item bg-transparent"><span style="font-weight:bold;">Publisher:</span> ${book?.publisher?.[0] ?? 'Not found'}</li>
            </ul>
        </div>
        `

        resultContainer.appendChild(div)
        document.getElementById('spinner').style.display = 'none'
    });
}