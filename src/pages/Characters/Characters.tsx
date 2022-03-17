import React, { useEffect, memo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { $characters, getCharactersFx } from '../../store/characters';
import Card from '../../components/Card/Card';
import s from './Characters.module.scss';
import Filter from '../../components/Filter/Filter';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Characters = () => {
  const events = useEvent({ getCharactersFx });
  const characters = useStore($characters);
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = (value: string | null, fieldName: string, resetPage = true) => {
    const params: { [x: string]: string } = {};
    if (value) {
      for (const pair of searchParams.entries()) {
        params[pair[0]] = pair[1];
      }
      if (resetPage) {
        params.page = '1';
      }
      setSearchParams({ ...params, [fieldName]: value });
    } else {
      for (const pair of searchParams.entries()) {
        if (pair[0] !== fieldName) {
          params[pair[0]] = pair[1];
        }
      }
      if (resetPage) {
        params.page = '1';
      }
      setSearchParams(params);
    }
  }

  useEffect(() => {
    events.getCharactersFx({ searchParams: searchParams.toString() })
  }, [searchParams]);

  return (
    <div className={s.root}>
      <Filter setSearchParams={setValue} searchParams={searchParams} />
      <div className={s.Cards}>
        {
          characters?.results.map((character) => (
            <Card character={character} key={character.id} />
          ))
        }
      </div>
      <ReactPaginate
        initialPage={+(searchParams.get('page') || 1) - 1}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => setValue(`${e.selected + 1}`, 'page', false)}
        pageRangeDisplayed={3}
        pageCount={characters?.info.pages || 0}
        previousLabel="< previous"
        renderOnZeroPageCount={() => null}
        className={s.pagination}
        pageClassName={s.page}
        activeClassName={s.activePagination}
        previousClassName={s.controlsPagination}
        nextClassName={s.controlsPaginationN}
        breakClassName={s.controlsPagination}
      />
    </div>
  )
}

export default memo(Characters);