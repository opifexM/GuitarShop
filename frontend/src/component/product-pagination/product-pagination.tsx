import { useDispatch } from 'react-redux';
import { DEFAULT_FILTER_PAGE } from '../../const.ts';
import { useAppSelector } from '../../hook';
import {
  getFilterPage,
  getPaginationCurrentPage,
  getPaginationTotalPages
} from '../../store/api-communication/api-communication.selectors.ts';
import { setFilterPage } from '../../store/api-communication/api-communication.slice.ts';

export function ProductPagination() {
  const dispatch = useDispatch();
  const filterPage = useAppSelector(getFilterPage) ?? DEFAULT_FILTER_PAGE;
  const paginationCurrentPage = useAppSelector(getPaginationCurrentPage);
  const paginationTotalPages = useAppSelector(getPaginationTotalPages);

  const handleFilterPageClick = (selectedFilterPage: number) => () => {
    dispatch(setFilterPage(selectedFilterPage));
  };

  const handlePrevPageClick = () => {
    if (paginationCurrentPage > 1) {
      dispatch(setFilterPage(paginationCurrentPage - 1));
    }
  };

  const handleNextPageClick = () => {
    if (paginationCurrentPage < paginationTotalPages) {
      dispatch(setFilterPage(paginationCurrentPage + 1));
    }
  };

  const getVisiblePages = () => {
    const startPage = Math.max(1, filterPage - 1);
    const endPage = Math.min(paginationTotalPages, filterPage + 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <ul className="pagination__list">
      {paginationCurrentPage > 1 && (
        <li className="pagination__page pagination__page--prev">
          <p
            className="link pagination__page-link"
            onClick={handlePrevPageClick}
          >
            Назад
          </p>
        </li>
      )}
      {getVisiblePages().map((page) => (
        <li key={page} className={`pagination__page ${paginationCurrentPage === page ? 'pagination__page--active' : ''}`}>
          <p
            className="link pagination__page-link"
            onClick={handleFilterPageClick(page)}
          >
            {page}
          </p>
        </li>
      ))}
      {paginationCurrentPage < paginationTotalPages && (
        <li className="pagination__page pagination__page--next">
          <p
            className="link pagination__page-link"
            onClick={handleNextPageClick}
          >
            Далее
          </p>
        </li>
      )}
    </ul>
  );
}
