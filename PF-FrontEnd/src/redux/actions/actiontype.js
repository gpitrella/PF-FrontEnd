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
export const SUCCESS_BUY = "SUCCESS_BUY";
export const CLOSE_LANDING = "CLOSE_LANDING";
export const POST_NEW_ORDER = "POST_NEW_ORDER";
export const LOG_IN_ERROR = "LOG_IN_ERROR";

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

// MORE CHECKOUT ACTIONS
export const GET_BRANCHS_OFFICES_WITH_DISTANCE = 'GET_BRANCHS_OFFICES_WITH_DISTANCE';

// LOGIN WITH GOOGLE
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export const NOT_LOGIN_WITH_GOOGLE = 'NOT_LOGIN_WITH_GOOGLE';

// PURCHASES ACTIONS
export const RESET_PURCHASES = 'RESET_PURCHASES';
export const SET_ORIGINAL_PURCHASES = 'SET_ORIGINAL_PURCHASES';
export const UPDATE_FILTER_PURCHASES = 'UPDATE_FILTER_PURCHASES';
export const SET_SHOW_LOADING_PURCHASES = 'SET_SHOW_LOADING_PURCHASES';
export const GET_PURCHASES_WITH_FILTER_AND_PAGINATE = 'GET_PURCHASES_WITH_FILTER_AND_PAGINATE';

// BASE URL
// export const BASE_URL = 'https://techmarketapp.herokuapp.com';
export const BASE_URL = 'http://localhost:3001';