import React from 'react';
import { getProductDetailsAddtoCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Cart(id) {
  const dispatch = useDispatch();
  const addtoCart = () => {
    dispatch(getProductDetailsAddtoCart(id.id))
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" style={{enableBackground: "new 0 0 60 60"}} onClick={addtoCart}>
      <path d="m11.68 13-.833-5h-2.99C7.411 6.28 5.859 5 4 5 1.794 5 0 6.794 0 9s1.794 4 4 4c1.859 0 3.411-1.28 3.858-3h1.294l.5 3h-.038l5.171 26.016c-2.465.188-4.518 2.086-4.76 4.474-.142 1.405.32 2.812 1.268 3.858C12.242 48.397 13.594 49 15 49h2c0 3.309 2.691 6 6 6s6-2.691 6-6h11c0 3.309 2.691 6 6 6s6-2.691 6-6h4c.553 0 1-.447 1-1s-.447-1-1-1h-4.35c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4h-11.7c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4H15c-.842 0-1.652-.362-2.224-.993-.577-.639-.848-1.461-.761-2.316.152-1.509 1.546-2.69 3.173-2.69h39.824C57.763 41 60 38.763 60 36.013V13H11.68zM4 11c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/>
    </svg>
  );
}