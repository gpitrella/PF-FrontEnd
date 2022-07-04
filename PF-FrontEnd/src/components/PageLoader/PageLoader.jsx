import React from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../SVG/Logo';
import s from './PageLoader.module.css';
import { closePageLoader } from "../../redux/actions";

export default function PageLoader() {

  const dispatch = useDispatch();
  const [ widthFull ,setWidthFull ] = React.useState(false);

  React.useEffect(() => {
    let idTimeOut1 = setTimeout(() => setWidthFull(true), 100);
    let idTimeOut2 = setTimeout(() => dispatch(closePageLoader()), 1500);
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