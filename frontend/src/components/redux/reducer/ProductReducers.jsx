const initialState = {
  products: [],
  loading: false,
  error: null,
};

const getProductReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case "GET_PRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default getProductReducers;
