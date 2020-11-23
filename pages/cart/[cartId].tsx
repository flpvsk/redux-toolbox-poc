import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import * as cart from 'store/cart';
import { Product } from 'interfaces';

const Cart = () => {
  const router = useRouter();
  const { cartId, step } = router.query;
  const {
    isFetchingProducts,
    productsLastFetchedTime,
    products,
    activeCart,
  } = useSelector((state: RootState) => ({
    isFetchingProducts: state.isFetchingProducts,
    productsLastFetchedTime: state.productsLastFetchedTime,
    products: state.products,
    activeCart: state.cart,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !isFetchingProducts &&
      productsLastFetchedTime < Date.now() - 60_000
    ) {
      console.log('dispatch');
      dispatch(cart.fetchProducts());
    }
  }, [isFetchingProducts, productsLastFetchedTime, dispatch]);

  let productsSection = null;
  if (isFetchingProducts) {
    productsSection = <div>Loading...</div>;
  }
  if (!isFetchingProducts) {
    productsSection = (
      <ul>
        {products.map((p: Product) => (
          <li key={p.id}>
            {p.name}, {p.price.value}
            {p.price.currency.symbol}
          </li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    if (!activeCart) {
      router.replace('/');
    }
  }, [activeCart]);

  let locationStr = '';
  if (activeCart) {
    const location = activeCart.locationInfo;
    locationStr = location.city + ', ' + location.postalCode;
  }

  return (
    <main>
      <h3>
        Cart <i>{cartId}</i>, step: {step || 1}
      </h3>
      <h4>Your location: {locationStr}</h4>
      <h4>Please choose the time slot</h4>
      {productsSection}
    </main>
  );
};

export default Cart;
