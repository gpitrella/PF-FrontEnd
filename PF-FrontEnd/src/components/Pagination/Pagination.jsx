import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateFilter, getProductsWithFiltersAndPaginate, setShowLoading,
  updateFilterPurchases, getPurchasesWithFiltersAndPaginate, setShowLoadingPurchases
} from '../../redux/actions';

import s from './Pagination.module.css';

import { buildFilter } from '../../util';

export default function Pagination({ simple = false, purchases = false }) {

  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.storepage);
  const filterPurchases = useSelector(state => state.purchases.filter);
  const [ displayPages, setDisplayPages ] = React.useState(null);

  React.useEffect(() => {
    if (!purchases) {
      if (!simple) setDisplayPages([ ...getPages(filter.page, filter.pages) ]);
      else setDisplayPages([ ...getPages(filter.page, filter.pages, true) ]);
    }
    else {
      if (!simple) setDisplayPages([ ...getPages(filterPurchases.page, filterPurchases.pages) ]);
      else setDisplayPages([ ...getPages(filterPurchases.page, filterPurchases.pages, true) ]);
    }
  }, [filter, filterPurchases]);

  let handleUpdateFilter = function(pageToChange) {

    let newFilter;

    if (!purchases) {
      newFilter = {
        ...filter,
        page: pageToChange
      };
      dispatch(updateFilter(newFilter));
      dispatch(setShowLoading());
      dispatch(getProductsWithFiltersAndPaginate(buildFilter(newFilter)));
    }
    else {
      newFilter = {
        ...filterPurchases,
        page: pageToChange
      };
      dispatch(updateFilterPurchases(newFilter));
      dispatch(setShowLoadingPurchases());
      dispatch(getPurchasesWithFiltersAndPaginate(newFilter));
    }
  }

  return (
    <div className = {s.container}>
    {
      displayPages && displayPages.length > 0 && displayPages.map((displayPage, index) =>

        <button 
          className = {`${s.btnPageIndex} ${ !displayPage.disabled ? s.enabled : ''} ${displayPage.current ? s.selected : ''}`}
          disabled = {displayPage.disabled}
          onClick = {() => handleUpdateFilter(displayPage.index)}
          key = {`pagination-${index}`}
        >
        { displayPage.symbol ? displayPage.symbol : displayPage.index }
        </button>

      )
    }
    </div>
  )
}

function getPages(currentPage, pages, simple = false) {
  let display = [];

  if (simple) {
    display.push({ index: currentPage - 1, symbol: '<', disabled: currentPage === 1 });
    display.push({ index: currentPage + 1, symbol: '>', disabled: currentPage === pages });
    return display;
  }

  display.push({ index: currentPage - 1, symbol: '<', disabled: currentPage === 1 });
  if (pages >= 4 && currentPage >= 4) display.push({ index: 1 });
  if (pages >= 5 && currentPage >= 5) display.push({ symbol: '...', disabled: true});
  if (currentPage - 2 > 0) display.push({ index: currentPage - 2 });
  if (currentPage - 1 > 0) display.push({ index: currentPage - 1 });
  display.push({ index: currentPage, disabled: true, current: true });
  if (currentPage + 1 <= pages) display.push({ index: currentPage + 1 });
  if (currentPage + 2 <= pages) display.push({ index: currentPage + 2 });
  if (pages >= 5 && currentPage < pages - 3) display.push({ symbol: '...', disabled: true });
  if (pages >= 4 && currentPage < pages - 2) display.push({ index: pages });
  display.push({ index: currentPage + 1, symbol: '>', disabled: currentPage === pages });

  return display;
}