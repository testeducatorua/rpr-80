'use client';
import Image from 'next/image'
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react'
import { SearchManufectererProps } from "@/types";

const SearchManufecterer = ({ manufecterer, setManufecterer }: SearchManufectererProps) => {
    const [query, setQuery] = useState('');
    return (
        <div className='search-manufacturer'>
            <Combobox>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image 
                        src={'/car-logo.svg'}
                        width={20}
                        height={20}
                        className='ml-4'
                        alt='car logo'
                        />
                    </Combobox.Button>
                    <Combobox.Input 
                    className="search-manufacturer__input"
                    displayValue={(manufecterer: string)=>manufecterer} 
                    placeholder='Volksvagen...'
                    onChange={(event)=>setQuery(event.target.value)}
                    />
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufecterer