// mengimport function yang ada di handler js
const {
    getDataBooks,
    getDataBooksById,
    addDataBooks,
    putDataBooks,
    deleteDataBooks,
} = require('./handler');


//buat route
const routes = [
    // mengambil seluruh data books
    {
        method: 'GET',
        path: '/books',
        handler: getDataBooks,
    },
    // mengambil data books berdasarkan id
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDataBooksById,
    },
    // menambah data books 
    {
        method: 'POST',
        path: '/books',
        handler: addDataBooks,
    },
    // mengupdate data books berdasarkan id
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: putDataBooks,
    },
    // menghapus data books berdasarkan id
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteDataBooks,
    }
];

module.exports = routes;