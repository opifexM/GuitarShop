import React from 'react';
import { useDispatch } from 'react-redux';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';
import { DEFAULT_FILTER_PAGE } from '../../const.ts';
import { useAppSelector } from '../../hook';
import {
  getFilterGuitarStringTypes,
  getFilterGuitarTypes
} from '../../store/api-communication/api-communication.selectors.ts';
import {
  setFilterGuitarStringTypes,
  setFilterGuitarTypes, setFilterPage
} from '../../store/api-communication/api-communication.slice.ts';

export function ProductFilter() {
  const dispatch = useDispatch();
  const filterGuitarTypes = useAppSelector(getFilterGuitarTypes) ?? [];
  const filterGuitarStringTypes = useAppSelector(getFilterGuitarStringTypes) ?? [];

  const handleGuitarTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name as GuitarType;
    const isChecked = event.target.checked;
    const newFilterGuitarTypes = isChecked
      ? [...filterGuitarTypes, value]
      : filterGuitarTypes.filter((type) => type !== value);
    dispatch(setFilterGuitarTypes(newFilterGuitarTypes));
    dispatch(setFilterPage(DEFAULT_FILTER_PAGE));
  };

  const handleGuitarStringTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.name);
    const isChecked = event.target.checked;
    const newFilterGuitarStringTypes = isChecked
      ? [...filterGuitarStringTypes, value]
      : filterGuitarStringTypes.filter((type) => type !== value);
    dispatch(setFilterGuitarStringTypes(newFilterGuitarStringTypes));
    dispatch(setFilterPage(DEFAULT_FILTER_PAGE));
  };

  const handleClearFilterClick = () => {
    dispatch(setFilterGuitarStringTypes([]));
    dispatch(setFilterGuitarTypes([]));
  };

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name={GuitarType.ACOUSTIC}
            onChange={handleGuitarTypeChange}
            checked={filterGuitarTypes.includes(GuitarType.ACOUSTIC)}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="electric"
            name={GuitarType.ELECTRO}
            onChange={handleGuitarTypeChange}
            checked={filterGuitarTypes.includes(GuitarType.ELECTRO)}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name={GuitarType.UKULELE}
            onChange={handleGuitarTypeChange}
            checked={filterGuitarTypes.includes(GuitarType.UKULELE)}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4"
            onChange={handleGuitarStringTypeChange}
            checked={filterGuitarStringTypes.includes(4)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6"
            onChange={handleGuitarStringTypeChange}
            checked={filterGuitarStringTypes.includes(6)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7"
            onChange={handleGuitarStringTypeChange}
            checked={filterGuitarStringTypes.includes(7)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12"
            onChange={handleGuitarStringTypeChange}
            checked={filterGuitarStringTypes.includes(12)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleClearFilterClick}
      >Очистить
      </button>
    </form>
  );
}
