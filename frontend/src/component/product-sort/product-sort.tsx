import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { SortType } from 'shared/type/sort-type.enum.ts';
import { useAppSelector } from '../../hook';
import { getSortDirection, getSortType } from '../../store/api-communication/api-communication.selectors.ts';
import { setSortDirection, setSortType } from '../../store/api-communication/api-communication.slice.ts';

export function ProductSort() {
  const dispatch = useDispatch();
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  const handleSortTypeClick = (selectedSortType: SortType) => () => {
    dispatch(setSortType(selectedSortType));
  };

  const handleSortDirectionClick = (selectedSortDirection: SortDirection) => () => {
    dispatch(setSortDirection(selectedSortDirection));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={classNames('catalog-sort__type-button', { 'catalog-sort__type-button--active': sortType === SortType.BY_DATE })}
          aria-label="по дате"
          onClick={handleSortTypeClick(SortType.BY_DATE)}
        >по дате
        </button>
        <button
          className={classNames('catalog-sort__type-button', { 'catalog-sort__type-button--active': sortType === SortType.BY_PRICE })}
          aria-label="по цене"
          onClick={handleSortTypeClick(SortType.BY_PRICE)}
        >по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={classNames('catalog-sort__order-button', 'catalog-sort__order-button--up', { 'catalog-sort__order-button--active': sortDirection === SortDirection.ASC })}
          aria-label="По возрастанию"
          onClick={handleSortDirectionClick(SortDirection.ASC)}
        >
        </button>
        <button
          className={classNames('catalog-sort__order-button', 'catalog-sort__order-button--down', { 'catalog-sort__order-button--active': sortDirection === SortDirection.DESC })}
          aria-label="По убыванию"
          onClick={handleSortDirectionClick(SortDirection.DESC)}
        >
        </button>
      </div>
    </div>
  );
}
