import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Ammar',
      email: 'ammar@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  books: [
    {
      title: 'It Ends With Us',
      author: 'Colleen Hoover',
      slugs: 'it-ends-with-us',
      category: 'novel',
      image: '/images/b1.jpg',
      price: 10,
      stock: 12,
      rating: 4,
      numberOfReviews: 23,
      description:
        "It Ends with Us is a romance novel by Colleen Hoover, published by Atria Books on August 2, 2016. It is based on the relationship between Hoover's mother and father.",
    },
    {
      title: 'The Wedding',
      author: 'Nicholas Sparks',
      slugs: 'the-wedding',
      category: 'novel',
      image: '/images/b2.jpg',
      price: 13,
      stock: 10,
      rating: 4.5,
      numberOfReviews: 13,
      description:
        "The Wedding is a 2003 romantic novel by Nicholas Sparks. It is about a couple who celebrate 30 years' marriage, and has been described as a sequel to Sparks's previous novel The Notebook. ",
    },
    {
      title: 'Turtles All the Way Down',
      author: 'John Green',
      slugs: 'turtles-all-the-way-down',
      category: 'romantic novel',
      image: '/images/b3.jpg',
      price: 9,
      stock: 22,
      rating: 4.0,
      numberOfReviews: 14,
      description:
        'Turtles All the Way Down is a young adult novel written by American author John Green. The novel was published on October 10, 2017 by Dutton Books.',
    },
    {
      title: 'Losing Hope',
      author: 'Colleen Hoover',
      slugs: 'loosing-hope',
      category: 'novel',
      image: '/images/b4.jpg',
      price: 10,
      stock: 0,
      rating: 4.5,
      numberOfReviews: 23,
      description:
        'spellbound with her novel Hopeless, the story of what happened when a troubled girl named Sky encountered a long-lost childhood friend.',
    },
  ],
};

export default data;
