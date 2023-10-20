'use client';
import Image from 'next/image'
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react'

{/* УРОК 80-5-6*/ }
import { manufacturers } from "@/constants";

import { SearchManufectererProps } from "@/types";

// Компонент SearchManufecterer приймає два пропси: manufecterer і setManufecterer
const SearchManufecterer = ({ manufecterer, setManufecterer }: SearchManufectererProps) => {
    // Створюємо локальний стан для зберігання пошукового запиту
    const [query, setQuery] = useState('');

    // Виконуємо фільтрацію списку виробників залежно від пошукового запиту
    const filteredManufacturers =
        // Якщо пошуковий запит пустий, повертаємо увесь список виробників
        query === ""
            ? manufacturers
            // Інакше фільтруємо список виробників
            : manufacturers.filter((item) =>
                // Перетворюємо назву виробника та пошуковий запит в нижній регістр
                // і видаляємо всі пробільні символи, після чого виконуємо пошук
                item
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );

    return (
        <div className='search-manufacturer'>
            <Combobox value={manufecterer} onChange={setManufecterer}>
                <div className='relative w-full'>
                    {/* Кнопка для комбо-боксу. Клацніть на значок, щоб побачити повний випадаючий список */}
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image
                            src='/car-logo.svg'
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='car logo'
                        />
                    </Combobox.Button>

                    {/* Поле введення для пошуку */}
                    <Combobox.Input
                        className='search-manufacturer__input'
                        displayValue={(item: string) => item}
                        onChange={(event) => setQuery(event.target.value)} // Оновлюємо пошуковий запит, коли змінюється введене значення
                        placeholder='Volkswagen...'
                    />

                    {/* Перехід для відображення варіантів */}
                    <Transition
                        as={Fragment} // групуємо кілька елементів без введення додаткового вузла DOM, тобто <></>
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery("")} // Скидаємо пошуковий запит після завершення переходу
                    >
                        <Combobox.Options
                            className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                            static
                        >
                            {/* Якщо відфільтрованих виробників немає та запит не пустий - новий елемент */}
                            {filteredManufacturers.length === 0 && query !== ""
                                ? (
                                    <Combobox.Option
                                        value={query}
                                        className='search-manufacturer__option'
                                    >
                                        Create "{query}" 
                                    </Combobox.Option>
                                )
                                : (
                                    //  В іншому випадку відображаємо відфільтрований список виробників 
                                    filteredManufacturers.map((item) => (
                                        <Combobox.Option
                                            key={item}
                                            className={({ active }) =>
                                                `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"
                                                }`
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                        {item}
                                                    </span>

                                                    {/* Показуємо активний синій фон, якщо варіант вибраний */}
                                                    {selected ? (
                                                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                                                        ></span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                        </Combobox.Options>

                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufecterer