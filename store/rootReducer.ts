import { reducer as cartReducer } from './cart';

const rootReducer = cartReducer;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
