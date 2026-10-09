const ThemeChanger = "ThemeChanger";
const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const Buynow_checkout = "Buynow_checkout";
const ADD_TO_CHECKOUT = "ADD_TO_CHECKOUT";
const ADD_TO_CART = "ADD_TO_CART"; // Define ADD_TO_CART as a constant
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
const initialState = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "dark",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "dark",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  iconOverlay: "",
  colorPrimaryRgb: "",
  bodyBg1: "",
  bodyBg: "",
  darkBg: "",
  Light: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
  selectedItem: null,
  wishlist: [],
  cart: [],
  count: 0,
  checkoutItems: [],
  products: [
    {
      id: "13",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "14",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "15",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "16",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "17",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "18",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "19",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "20",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "21",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "22",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
    {
      id: "23",
      pic1: "../../../../assets/images/ecommerce/pulseira.jpg",
      pic2: "../../../../assets/images/ecommerce/pulseira.jpg",
      item: "Glass Flower pot",
      name: "Glass Flower pot",
      quantity: 2,
      src: "../../../../assets/images/ecommerce/pulseira.jpg",
      price: "55",
      stock: "In stock",
      images: [
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
        { img: "../../../../assets/images/ecommerce/pulseira.jpg" },
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      stockbg: "success",
      prices: "$55",
      disc: "$59",
      size: "XXL",
      color: " purple color",
    },
  ],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ThemeChanger:
      return {
        ...state,
        ...payload,
      };

    case SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: payload,
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, payload],
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== payload),
      };

    case Buynow_checkout:
      return {
        ...state,
        cart: [payload],
        actionType: action.actionType,
      };

    case ADD_TO_CHECKOUT:
      return {
        ...state,
        checkoutItems: action.payload,
        actionType: action.actionType,
      };

    case ADD_TO_CART: // Handle ADD_TO_CART action
      return {
        ...state,
        cart: [...state.cart, payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(0, action.payload.quantity),
              }
            : item
        ),
      };

    default:
      return state;
  }
}
