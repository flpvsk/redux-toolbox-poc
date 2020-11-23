import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import * as cart from 'store/cart';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { LocationInfo } from 'interfaces';

const Home = () => {
  const router = useRouter();
  const [q, setQ] = useState('');
  const dispatch = useAppDispatch();

  function onSearchChange(e: any) {
    setQ(e.target.value);
  }

  function searchForSuggestions(e: React.FormEvent) {
    e.preventDefault();
    dispatch(cart.fetchLocationSuggestions(q));
  }

  function chooseLocation(location: LocationInfo) {
    return async (e: SyntheticEvent) => {
      e.preventDefault();
      const c = await dispatch(cart.create(location));
      if (c.payload && (c.payload as any).id) {
        router.push({
          pathname: '/cart/[cartId]',
          query: { cartId: (c.payload as any).id },
        });
      }
    };
  }

  const locationSuggestions = useSelector(
    (state: RootState) => state.locationSuggestions,
  );
  const locationList = locationSuggestions.map((location) => (
    <li key={location.id}>
      <a href={'#'} onClick={chooseLocation(location)}>
        {location.city}, {location.postalCode}
      </a>
    </li>
  ));

  return (
    <main>
      <h3>Search for an address</h3>
      <form onSubmit={searchForSuggestions}>
        <input type="text" value={q} onChange={onSearchChange} />
        <input type="submit" value="search" />
      </form>
      <ul>{locationList}</ul>
    </main>
  );
};

export default Home;
