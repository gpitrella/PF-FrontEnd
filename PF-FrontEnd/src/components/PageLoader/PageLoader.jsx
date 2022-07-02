import React from 'react';
import Logo from '../SVG/Logo';

import s from './PageLoader.module.css';

export default function PageLoader({ setShow }) {

  const [ widthFull ,setWidthFull ] = React.useState(false);

  React.useEffect(() => {
    let idTimeOut1 = setTimeout(() => setWidthFull(true), 100);
    let idTimeOut2 = setTimeout(() => setShow(false), 1500);
    return (() => {
      clearTimeout(idTimeOut1);
      clearTimeout(idTimeOut2);
    })
  }, []);

  return (
    <div className = {s.globalContainer}>
      <div className = {s.container}>
        <div className = {s.imageContainer}>
          <div className = {s.svgContainer}>
            <Logo />
          </div>
        </div>
        <div className = {s.containerLoading}>
          <div className = {`${s.loading} ${ widthFull ? s.fullLoading : '' }`}></div>
        </div>
      </div>
    </div>
  );
}