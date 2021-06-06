import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import Heading from '../../components/Heading';
import PokemonCard from '../../components/PokemonCard';

import ps from './Pokedex.module.scss';
import as from '../../App.module.scss';

import useDebounce from '../../hook/useDebaunce';
import useData, { IData } from '../../hook/useData';
import { getPokemonsTypes, getTypesAction } from '../../reducers/pokemons';

export interface IQuery {
  name?: string;
  limit?: number;
}

const Pokedex: React.FC = () => {
  const dispatch = useDispatch();
  const types = useSelector(getPokemonsTypes);
  console.log('### types', types);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState<IQuery>({
    limit: 9,
  });

  const debauncedValue = useDebounce(searchValue, 1000);
  const { data, isLoading, isError } = useData<IData>('getPokemons', query, [debauncedValue]);

  useEffect(() => {
    dispatch(getTypesAction());
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value as string);
    setQuery((s: IQuery) => ({
      ...s,
      name: e.target.value,
    }));
  };

  if (isLoading) {
    return (
      <div className={ps.contentPokedex}>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={ps.contentPokedex}>
        <div>Something wrong!</div>
      </div>
    );
  }

  return (
    <>
      <Layout className={cn(as.container)}>
        <div className={ps.contentPokedex}>
          <Heading tag="h2" propsClassName={ps.mainTitle}>
            {!isLoading && data?.total} Pokemons for you to choose your favorite
          </Heading>
          <div className={ps.contentInputWrap}>
            <input
              type="text"
              placeholder="Encuentra tu pokemon..."
              value={searchValue}
              onChange={handleSearchChange}
              className={ps.contentInput}
            />
          </div>
          <div className={ps.cardList}>
            {!isLoading &&
              data?.pokemons.map((item) => {
                return (
                  <div key={item.id} className={ps.cardWrapper}>
                    <PokemonCard pokemon={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Pokedex;
