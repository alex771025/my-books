const bookInput = document.getElementById("bookInput");
const addBtn = document.getElementById("addBtn");
const markAllBtn = document.getElementById("markAllBtn");
const markAllUnreadBtn = document.getElementById("markAllUnreadBtn");
const list = document.getElementById("list");
const readCount = document.getElementById("readCount");
const unreadCount = document.getElementById("unreadCount");

const STORAGE_KEY = "my - books";

const nameBooks = localStorage.getItem(STORAGE_KEY);

let books = [];
if (nameBooks !== null) {
    const savedBooks = JSON.parse(nameBooks);
    if (Array.isArray(savedBooks)) {
        books = savedBooks;
    }
}

function addBookTitle(title) {
    const book = {
        name: title,
        isRead: false
    };
    books.push(book);
    showBooks(books);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

function showBooks(bookToShow) {
    list.textContent = "";
    for (const book of bookToShow) {
        const li = document.createElement("li");
        const bookName = document.createElement("span");
        bookName.textContent = book.name;
        li.appendChild(bookName);
        if (book.isRead === true) {
            bookName.classList.add("read");
        }

        const readBtn = document.createElement("button");
        readBtn.textContent = getReadButtonText(book);
        readBtn.addEventListener("click", () => {
            book.isRead = !book.isRead;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
            showBooks(books);
        })


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Изтрий";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            const titleIndex = books.indexOf(book);
            if (titleIndex === -1) {
                return;
            }
            books.splice(titleIndex, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
            showBooks(books);
        });

        li.appendChild(deleteBtn);
        li.appendChild(readBtn);
        list.appendChild(li);
    }
    readCount.textContent = `Прочетени книги: ${countReadBooks(bookToShow)}`;
    unreadCount.textContent = `Непрочетени книги: ${countUnreadBooks(bookToShow)}`;


}

function getReadButtonText(book) {
    if (book.isRead === true) {
        return "Маркирай като непрочетена";
    } else {
        return "Маркирай като прочетена";
    }
}

function countReadBooks(booksToCheck) {
    let total = 0;
    for (const book of booksToCheck) {
        if (book.isRead === true) {
            total++
        }

    }
    return total;
}

function countUnreadBooks(booksToCheck){
    let total = 0;
    for(const book of booksToCheck){
        if(book.isRead === false){
            total++;
        }
    }
    return total;
}


        

function markAllIsRead(markedBook) {

    for (const book of markedBook) {
        book.isRead = true;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(markedBook));

    showBooks(markedBook);
}

markAllBtn.addEventListener("click", ()=> {
    markAllIsRead(books);
})

function markAllUnread(booksToChange){
    for(const book of booksToChange){
        book.isRead = false;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksToChange));
    showBooks(booksToChange)
}

markAllUnreadBtn.addEventListener("click", ()=> {
    markAllUnread(books);
})




addBtn.addEventListener("click", () => {
    const bookTitle = bookInput.value.trim();
    if (bookTitle === "") {
        return;
    }

    addBookTitle(bookTitle);
    bookInput.value = "";
    bookInput.focus();

})
showBooks(books);




