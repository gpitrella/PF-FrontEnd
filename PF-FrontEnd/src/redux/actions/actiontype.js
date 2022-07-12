// GENERAL ACTIONS
export const CHANGE_THEME = 'CHANGE_THEME';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const INCREASE_QUANTITY_PRODUCT = 'INCREASE_QUANTITY_PRODUCT';
export const REDUCE_QUANTITY_PRODUCT = 'REDUCE_QUANTITY_PRODUCT';
export const POST_COMMENT_PRODUCT = 'POST_COMMENT_PRODUCT';
export const SHOW_MINI_MODAL = 'SHOW_MINI_MODAL';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const SHOW_CART = 'SHOW_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const FINISH_ORDER = 'FINISH_ORDER';
export const POST_REVIEW_PRODUCT = 'POST_REVIEW_PRODUCT';
export const LOAD_STORAGE = 'LOAD_STORAGE';
export const OPEN_PAGE_LOADER = 'OPEN_PAGE_LOADER';
export const CLOSE_PAGE_LOADER = 'CLOSE_PAGE_LOADER';
export const LOGOUT = 'LOGOUT';
export const ADD_PRODUCT_TO_FAVOURITES = "ADD_PRODUCT_TO_FAVOURITES";
export const GET_FAVOURITES_PRODUCTS = "GET_FAVOURITES_PRODUCTS";
export const REMOVE_FAVOURITE_PRODUCT = "REMOVE_FAVOURITE_PRODUCT";
export const SHOW_FAVOURITES = "SHOW_FAVOURITES";
export const CLOSE_FAVOURITES = "CLOSE_FAVOURITES"
export const SUCCESS_BUY = "SUCCESS_BUY";
export const CLOSE_LANDING = "CLOSE_LANDING";
export const LOG_IN_ERROR = "LOG_IN_ERROR";
export const GET_ORDER_BY_USER = "GET_ORDER_BY_USER";
export const EDIT_STATUS_ORDER = "EDIT_STATUS_ORDER";
export const FAVOURITES_CHARGED = "FAVOURITES_CHARGED";
export const REMOVE_FAVOURITES_CHARGED = "REMOVE_FAVOURITES_CHARGED";

// HOMEPAGE ACTIONS
export const TEST_HOMEPAGE = 'TEST_HOMEPAGE';
export const ALL_CATEGORIES = 'ALL_CATEGORIES';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
export const GET_SEARCH_PRODUCTS = 'GET_SEARCH_PRODUCTS';
export const CLEAR_SEARCH_PRODUCTS = 'CLEAR_SEARCH_PRODUCTS';

export const SHOW_LOADING_SECTION_ONE = 'SHOW_LOADING_SECTION_ONE';
export const SHOW_LOADING_SECTION_TWO = 'SHOW_LOADING_SECTION_TWO';
export const SHOW_LOADING_SECTION_THREE = 'SHOW_LOADING_SECTION_THREE';
export const GET_PRODUCT_TO_SECTION_ONE = 'GET_PRODUCT_TO_SECTION_ONE';
export const GET_PRODUCT_TO_SECTION_TWO = 'GET_PRODUCT_TO_SECTION_TWO';
export const GET_PRODUCT_TO_SECTION_THREE = 'GET_PRODUCT_TO_SECTION_THREE';
export const SHOW_ERROR_SECTION_ONE = 'SHOW_ERROR_SECTION_ONE';
export const SHOW_ERROR_SECTION_TWO = 'SHOW_ERROR_SECTION_TWO';
export const SHOW_ERROR_SECTION_THREE = 'SHOW_ERROR_SECTION_THREE';
export const RESET_SECTIONS = 'RESET_SECTIONS';


// STOREPAGE ACTIONS
export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_ERROR = 'SHOW_ERROR';
export const SHOW_STORE = 'SHOW_STORE';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const RESET_FILTER = 'RESET_FILTER';
export const CLOSE_STORE = 'CLOSE_STORE';
export const GET_BRANDS_TO_STORE = 'GET_BRANDS_TO_STORE';
export const GET_CATEGORIES_TO_STORE = 'GET_CATEGORIES_TO_STORE';
export const GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE = 'GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE';
export const POST_PRODUCT = 'POST_PRODUCT';

//DASHBOARD ACTIONS
export const CATEGORIES_TO_DASHBOARD = 'CATEGORIES_TO_DASHBOARD';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CREATE_BRAND = 'CREATE_BRAND';
export const UPDATE_BRAND = 'UPDATE_BRAND';
export const DELETE_BRAND = 'DELETE_BRAND';
export const PRODUCTS_TO_FORMS = 'PRODUCTS_TO_FORMS';
export const COUNT_ORDERS = 'COUNT_ORDERS';
export const SUM_ORDERS = 'SUM_ORDERS';
export const SUM_ORDERS_TODAY = 'SUM_ORDERS_TODAY';
export const SUM_LAST_WEEK = 'SUM_LAST_WEEK';
export const SUM_LAST_MONTH = 'SUM_LAST_MONTH';
export const SUM_BEFORELAST_MONTH = 'SUM_BEFORELAST_MONTH';
export const SUM_LASTTHREE_MONTH = 'SUM_LASTTHREE_MONTH';
export const GET_ORDERS_TODAY = 'GET_ORDERS_TODAY';

// PROFILE AND STORAGE USER
export const GET_USERS = 'GET_USERS';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_STATUS = 'USER_STATUS';
export const GET_USER_DETAIL = 'GET_USER_DETAIL';
export const DELETE_USER_DETAIL = 'DELETE_USER_DETAIL';
export const PUT_USER_STATUS = 'PUT_USER_STATUS';
export const USER_STATUS_RESET = 'USER_STATUS_RESET';
export const USER_REVIEWS = 'USER_REVIEWS';
export const GET_COMMENTS_BY_USER = 'GET_COMMENTS_BY_USER';
export const DELETE_USER_ADDRESS = 'DELETE_USER_ADDRESS';
export const EDIT_DATA_USER = 'EDIT_DATA_USER';
export const PUT_PASSWORD = 'PUT_PASSWORD';
export const CLEAR_UPDATE_USER = 'CLEAR_UPDATE_USER';
export const UPDATE_COMMENT_VIEWED = 'UPDATE_COMMENT_VIEWED';
export const CLEAR_COMMENT_VIEWED = 'CLEAR_COMMENT_VIEWED';

// EDIT PRODUCT
export const WAITING_RESPONSE_PUT = 'WAITING_RESPONSE_PUT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const ERROR_PUT_PRODUCT = 'ERROR_PUT_PRODUCT';
// DELETE PRODUCT
export const WAITING_RESPONSE_DELETE = 'WAITING_RESPONSE_DELETE';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ERROR_DELETE_PRODUCT = 'ERROR_DELETE_PRODUCT';
// CREATE PRODUCT
export const WAITING_RESPONSE_POST = 'WAITING_RESPONSE_POST';
export const ERROR_POST_PRODUCT = 'ERROR_POST_PRODUCT';

// MODALADDADDRESS ACTIONS
export const SHOW_MODAL_ADD_ADDRESS = 'SHOW_MODAL_ADD_ADDRESS';
export const CLOSE_MODAL_ADD_ADDRESS = 'CLOSE_MODAL_ADD_ADDRESS';
export const SHOW_LOADING_PARAM = 'SHOW_LOADING_PARAM';
export const GET_PROVINCIAS = 'GET_PROVINCIAS';
export const GET_MUNICIPIOS = 'GET_MUNICIPIOS';
export const GET_LOCALIDADES = 'GET_LOCALIDADES';
export const VALIDATING_ADDRESS = 'VALIDATING_ADDRESS';
export const NORMALIZE_ADDRESS = 'NORMALIZE_ADDRESS';
export const RESET_MODAL_ADD_ADRESS = 'RESET_MODAL_ADD_ADRESS';
export const USER_ADD_ADDRESS = 'USER_ADD_ADDRESS';

// MORE CHECKOUT ACTIONS
export const GET_BRANCHS_OFFICES_WITH_DISTANCE = 'GET_BRANCHS_OFFICES_WITH_DISTANCE';
export const RESET_CHECKOUT_ADDRESS = 'RESET_CHECKOUT_ADDRESS';

// LOGIN WITH GOOGLE
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export const NOT_LOGIN_WITH_GOOGLE = 'NOT_LOGIN_WITH_GOOGLE';

// PURCHASES ACTIONS
export const RESET_PURCHASES = 'RESET_PURCHASES';
export const SET_ORIGINAL_PURCHASES = 'SET_ORIGINAL_PURCHASES';
export const UPDATE_FILTER_PURCHASES = 'UPDATE_FILTER_PURCHASES';
export const SET_SHOW_LOADING_PURCHASES = 'SET_SHOW_LOADING_PURCHASES';
export const GET_PURCHASES_WITH_FILTER_AND_PAGINATE = 'GET_PURCHASES_WITH_FILTER_AND_PAGINATE';
export const WAITING_RESPONSE_PUT_PURCHASE = 'WAITING_RESPONSE_PUT_PURCHASE';
export const PUT_PURCHASE = 'PUT_PURCHASE';
export const ERROR_PUT_PURCHASE = 'ERROR_PUT_PURCHASE';
export const GET_ONE_PURCHASE_DETAILS = 'GET_ONE_PURCHASE_DETAILS';
export const ERROR_ONE_PURCHASE_DETAILS = 'ERROR_ONE_PURCHASE_DETAILS';
export const RESET_ONE_PURCHASE_DETAILS = 'RESET_ONE_PURCHASE_DETAILS';

// MODAL ADD IMAGE
export const SHOW_MODAL_ADD_IMAGE = 'SHOW_MODAL_ADD_IMAGE';
export const CLOSE_MODAL_ADD_IMAGE = 'CLOSE_MODAL_ADD_IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

// GET BRANCHS
export const GET_BRANCH_OFFICES = 'GET_BRANCH_OFFICES';

// BASE URL
// export const BASE_URL = 'https://techmarketapp.herokuapp.com';
export const BASE_URL = 'http://localhost:3001';
export const CLOUDINARY = 'https://api.cloudinary.com/v1_1/techmarket/image/upload';