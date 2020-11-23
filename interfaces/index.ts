// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type Id = string;

export interface LocationInfo {
  id: Id;
  lat: number;
  lng: number;
  postalCode: string;
  city: string;
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface Price {
  value: number;
  currency: Currency;
}

export interface Product {
  id: Id;
  name: string;
  price: Price;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: Id;
  contents: CartItem[];
  locationInfo: LocationInfo;
}
