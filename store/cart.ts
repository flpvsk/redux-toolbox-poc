import { nanoid } from 'nanoid';
import { Product, LocationInfo, Cart } from 'interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Server } from 'server';

interface CartState {
  cart?: Cart;
  products: Product[];
  productsLastFetchedTime: number;
  isFetchingProducts: boolean;
  locationInfo?: LocationInfo;
  locationSuggestions: LocationInfo[];
  isFetchingLocationSuggestions: boolean;
}

const initialState: CartState = {
  products: [],
  productsLastFetchedTime: 0,
  isFetchingProducts: false,
  locationSuggestions: [],
  isFetchingLocationSuggestions: true,
};

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => Server.fetchProducts(),
);

export const fetchLocationSuggestions = createAsyncThunk(
  'cart/fetchLocationSuggestions',
  async (q: string) => Server.fetchLocationSuggestions(q),
);

export const create = createAsyncThunk(
  'cart/create',
  async (locationInfo: LocationInfo) => {
    const id = nanoid();
    return {
      id,
      locationInfo,
      contents: [],
    };
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isFetchingProducts = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.isFetchingProducts = false;
      state.productsLastFetchedTime = Date.now();
      state.products = payload;
    }),
      builder.addCase(fetchProducts.rejected, (state) => {
        state.isFetchingProducts = false;
      });

    builder.addCase(
      fetchLocationSuggestions.fulfilled,
      (state, { payload }) => {
        state.locationSuggestions = payload;
      },
    );

    builder.addCase(fetchLocationSuggestions.pending, (state) => {
      state.isFetchingLocationSuggestions = false;
    });

    builder.addCase(fetchLocationSuggestions.rejected, (state) => {
      state.isFetchingLocationSuggestions = false;
    });
  },
});

export const { reducer } = cartSlice;
