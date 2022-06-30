import React from "react";

import s from './ShowResultCount.module.css';

export default function ShowResultCount({ loading, results, page, pages, simple = false }) {

  if (loading) return <span></span>;

  if (results === 0 && !loading) return <span className = {s.results}>Showing 0-0 of 0 Products</span>;

  return (
    <span className = {s.results}>
      { !simple ? 'Showing ' : ''} { (page - 1) * (Math.ceil(results / pages)) + 1 }-{
      page === pages ? results : page * 10 } of {
      results} { !simple ? ' Products' : '' }
    </span>
  )
}