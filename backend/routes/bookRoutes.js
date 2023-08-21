import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import { isAdmin, isAuth } from '../utils.js';

const bookRouter = express.Router();
bookRouter.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

bookRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newBook = new Book({
      title: 'sample book title ' + Date.now(),
      author: 'sample author',
      slugs: 'sample-name-' + Date.now(),
      category: 'sample category',
      image: '/images/b5.jpg',
      price: 0,
      stock: 0,
      rating: 0,
      numberOfReviews: 0,
      description: 'sample description',
    });
    const book = await newBook.save();
    res.send({ message: 'Book Added', book });
  })
);

bookRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (book) {
      book.title = req.body.name;
      book.author = req.body.author;
      book.slugs = req.body.slugs;
      book.category = req.body.category;
      book.image = req.body.image;
      book.price = req.body.price;
      book.stock = req.body.stock;
      book.description = req.body.description;
      await book.save();
      res.send({ message: 'Book Updated' });
    } else {
      res.status(404).send({ message: 'Book Not Found' });
    }
  })
);

bookRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await book.remove();
      res.send({ message: 'Book Deleted' });
    } else {
      res.status(404).send({ message: 'Book Not Found' });
    }
  })
);

const PAGE_SIZE = 3;

bookRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const books = await Book.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countBooks = await Book.countDocuments();
    res.send({
      books,
      countBooks,
      page,
      pages: Math.ceil(countBooks / pageSize),
    });
  })
);

bookRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Book.find().distinct('category');
    res.send(categories);
  })
);

bookRouter.get('/slugs/:slugs', async (req, res) => {
  const book = await Book.findOne({ slugs: req.params.slugs });
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not Found' });
  }
});

bookRouter.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Book Not Found' });
  }
});

export default bookRouter;
