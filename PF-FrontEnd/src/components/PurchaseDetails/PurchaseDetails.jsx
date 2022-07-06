import React from 'react';

import Logo from '../SVG/Logo';

import s from './PurchaseDetails.module.css';

export default function PurchaseDetails() {
  return (
    <div className = {s.globalContainer}>
      <div className = {s.container}>
        
        <div className = {s.banner}>
          <label className = {s.header}>Purchase Order</label>
          <div className = {s.imageContainer}>
            <div className = {s.loadingContainer}>
              <Logo />
            </div>
          </div>
          <div className = {s.ourName}>
            <span className = {s.bigText}>TECH</span>
            <span className = {s.mediumText}>-Market-</span>
          </div>
        </div>

        <div className = {s.mainZone}>
        </div>

      </div>
    </div>
  );
}