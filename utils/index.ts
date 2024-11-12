import { CarProps, FilterProps } from "../types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'X-RapidAPI-Key': '675fc4d0c8msh1c0d66818c91a4cp141538jsn46c5c2c1cf55',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, { headers: headers, });

  const result = await response.json()

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

export const updateSearchParams = (type: string, value: string) => {
  // Отримуємо поточні параметри пошуку URL
  const searchParams = new URLSearchParams(window.location.search);

  // Встановлюємо зазначений параметр пошуку на задане значення
  searchParams.set(type, value);

  // Формуємо новий шлях з оновленими параметрами пошуку
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
