import React from 'react';
import Loading from '../SVG/Loading';
import ServerError from '../SVG/ServerError';
import NoResults from '../SVG/NoResults';

import s from './LoadingStore.module.css';

export default function LoadingStore({ loading, error, noResults }) {
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
    {
      noResults && !error && !loading &&
        <div className = {s.errorContainer}>
          <NoResults />
        </div>
    }
    </div>
  );
}