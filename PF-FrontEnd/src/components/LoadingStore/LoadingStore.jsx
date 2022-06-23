import React from 'react';
import Loading from '../SVG/Loading';
import ServerError from '../SVG/ServerError';

import s from './LoadingStore.module.css';

export default function LoadingStore({ loading, error }) {
  return (
    <div className = {s.container}>
    {
      loading && 
        <div className = {s.loadingContainer}>
          <Loading />
        </div>
    }
    {
      error && 
        <div className = {s.errorContainer}>
          <ServerError />
        </div>
    }
    </div>
  );
}