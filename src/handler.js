// mengimport nanoid
const { nanoid } = require('nanoid');
// mengimport books
const books = require('./books');

// method get data
const getDataBooks = (request, z) => {
    const { name, reading, finished } = request.query;

    // menyimpan data
    let filterBooks = books;

    if (name !== undefined) {
        filterBooks = filterBooks.filter((book) => book
            .name.toLowerCase().includes(name.toLowerCase()));
    }

    else if (reading !== undefined) {
        filterBooks = filterBooks.filter((book) => book.reading === !!Number(reading));
    }

    else if (finished !== undefined) {
        filterBooks = filterBooks.filter((book) => book.finished === !!Number(finished));
    }

    const response = z.response({
        status: 'success',
        data: {
            books: filterBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);

    return response;
};

// method get data by id
const getDataBooksById = (request, z) => {
    const { bookId } = request.params;
    const checkBookById = books.filter((book) => book.id === bookId)[0];

    if (checkBookById !== undefined) {
        const response = z.response({
            status: "success",
            data: {
                book: checkBookById,
            },
        });
        response.code(200);
        return response;
    } else {
        const response = z.response({
            status: "fail",
            message: "Buku tidak ditemukan",
        });
        response.code(404);
        return response;
    }
}

// method add data
const addDataBooks = (request, z) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    // mengecheck apabila nama tidak diisi
    if (name === undefined || name === "" || name === null) {
        const response = z.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }
    // mengecheck apabila readPage lebih besar dari pageCount
    else if (pageCount < readPage) {
        const response = z.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else {
        // jika berhasil semua
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        // memasukkan nilai finished apabila pageCount sama dengan readPage
        const finished = readPage === pageCount;
        const addBook = {
            id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
        }

        books.push(addBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (isSuccess) {
            const response = z.response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: id
                }
            });
            response.code(201);
            return response
        }
    }
}

//method put data
const putDataBooks = (request, z) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const index = books.findIndex((book) => book.id === bookId);

    if (name === undefined || name === "" || name === null) {
        const response = z.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (pageCount < readPage) {
        const response = z.response({
            status: "fail",
            message:
                "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else if (index === -1) {
        const response = z.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    } else {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished: pageCount === readPage,
            updatedAt: new Date().toString(),
        };
        const response = z.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
}

// method delete data
const deleteDataBooks = (request, z) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = z.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    } else {
        const response = z.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    }
}

// mengexport module yang sudah dibuat
module.exports = {
    getDataBooks,
    getDataBooksById,
    addDataBooks,
    putDataBooks,
    deleteDataBooks,
};