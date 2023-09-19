'use client';

import { manufacturers } from '@/constants';
import Image from 'next/image'
import React, { useState } from 'react'

import SearchManufecterer from "./SearchManufecterer";

// const SearchButton = () => {}

const Searchbar = () => {
  const [manufecterer, setManufecterer] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => { }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufecterer
          manufecterer={manufecterer}
          setManufecterer={setManufecterer}
        />
        {/* <SearchButton otheClasses='sm:hidden' /> */}
      </div>
    </form>
  )
}

export default Searchbar