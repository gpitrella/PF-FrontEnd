import React from 'react';

import s from './PageLoader.module.css';

export default function PageLoader({ setShow }) {
  React.useEffect(() => {
    let idTimeOut = setTimeout(() => setShow(false), 1500);
    return (() => {
      clearTimeout(idTimeOut);
    })
  }, []);

  return (
    <div className = {s.globalContainer}>
      <div className = {s.container}>
        CARGANDO
      </div>
    </div>
  );
}