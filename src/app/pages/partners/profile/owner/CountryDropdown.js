import React, { useEffect, useState } from 'react';
import { getCountries } from '../../_requests';

function CountryDropdown({ onSelect }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <select className="form-control" onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.iso}>
          {country.name} {country.flag && `(${country.flag})`}
        </option>
      ))}
    </select>
  );
}

export default CountryDropdown;
