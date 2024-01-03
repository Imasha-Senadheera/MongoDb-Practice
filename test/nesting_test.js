const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

// Describe our tests
describe('Nesting records', function () {

    beforeEach(function (done) {
        // Drop the collection
        mongoose.connection.collections.authors.drop(function () {
            done();
        });
    });

    // Create tests
    it('Creates an author with sub-documents', function (done) {

        var pat = new Author({
            name: 'Jay Shetty',
            books: [{ title: 'Think Like a Monk', pages: 400 }]
        });

        pat.save().then(function () {
            Author.findOne({ name: 'Jay Shetty' }).then(function (record) {
                assert(record.books.length === 1);
                done();
            });
        });

    });

    it('Adds a book to an author', function (done) {

        var pat = new Author({
            name: 'Jay Shetty',
            books: [{ title: 'Think Like a Monk', pages: 400 }]
        });

        pat.save().then(function () {
            Author.findOne({ name: 'Jay Shetty' }).then(function (record) {
                // add a book to the books collection
                record.books.push({ title: "Life Changing Quotes", pages: 500 });
                record.save().then(function () {
                    Author.findOne({ name: 'Jay Shetty' }).then(function (record) {
                        assert(record.books.length === 2);
                        done();
                    });
                });
            });
        });

    });

});