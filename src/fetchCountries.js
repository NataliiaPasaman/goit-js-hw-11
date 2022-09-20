
export function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });

  const url = `https://restcountries.com/v3.1/name/${name}?${searchParams}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}
