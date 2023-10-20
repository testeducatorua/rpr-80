'use client';

import Image from 'next/image';
import React, { useState } from 'react';
// Імпорт хука useRouter з Next.js для роботи з маршрутизацією
import { useRouter } from "next/navigation";

import SearchManufecterer from "./SearchManufecterer";

// Створюємо компонент SearchButton, який приймає зовнішні стилі через пропси
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

const Searchbar = () => {
  const [manufecterer, setManufecterer] = useState('');
  // Стан для моделі та хук для роутингу
  const [model, setModel] = useState("");
  const router = useRouter();
 

  // Обробник події для форми пошуку
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (manufecterer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }
  
    updateSearchParams(model.toLowerCase(), manufecterer.toLowerCase());
  };

  // Функція для оновлення параметрів URL
  const updateSearchParams = (model: string, manufecterer: string) => {
    // Створюємо новий об'єкт URLSearchParams, використовуючи поточні параметри пошуку URL
    const searchParams = new URLSearchParams(window.location.search);
  
    // Оновлюємо або видаляємо параметр 'model' в залежності від його значення
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
  
    // Оновлюємо або видаляємо параметр 'manufecterer' в залежності від його значення
    if (manufecterer) {
      searchParams.set("manufecterer", manufecterer);
    } else {
       searchParams.delete("manufecterer");
    }
  
    // Генеруємо новий шлях з оновленими параметрами пошуку
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    router.push(newPathname);
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufecterer
          manufecterer={manufecterer}
          setManufecterer={setManufecterer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      {/* Блок для пошуку по моделі */}
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      {/* Кнопка пошуку для великих екранів */}
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default Searchbar;
