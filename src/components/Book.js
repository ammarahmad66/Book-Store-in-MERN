import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Book(props) {
  const { book } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === book._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/books/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Sorry Book is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/book/${book.slugs}`}>
        <img src={book.image} className="card-img-top" alt={book.title}></img>
      </Link>
      <Card.Body>
        <Link to={`/book/${book.slugs}`}>
          <Card.Title>{book.title}</Card.Title>
        </Link>
        <Rating rating={book.rating} numReviews={book.numberOfReviews} />

        <Card.Text>${book.price}</Card.Text>
        {book.stock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(book)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Book;
