export function ProductSort() {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className="catalog-sort__type-button catalog-sort__type-button--active"
          aria-label="по цене"
        >по дате
        </button>
        <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
      </div>
      <div className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up"
          aria-label="По возрастанию"
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active"
          aria-label="По убыванию"
        >
        </button>
      </div>
    </div>
  );
}
