import { useState, React } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const countryCode = ({ value, onChange, label, options }) => {
    const [countries, setCountries] = useState([
        "Australia",        // AUD
        "Bulgaria",         // BGN
        "Brazil",           // BRL
        "Canada",           // CAD
        "Switzerland",      // CHF
        "China",            // CNY
        "Czech Republic",   // CZK
        "Denmark",          // DKK
        "Eurozone countries", // EUR
        "United Kingdom",   // GBP
        "Hong Kong",        // HKD
        "Hungary",          // HUF
        "Indonesia",        // IDR
        "Israel",           // ILS
        "India",            // INR
        "Iceland",          // ISK
        "Japan",            // JPY
        "South Korea",      // KRW
        "Mexico",           // MXN
        "Malaysia",         // MYR
        "Norway",           // NOK
        "New Zealand",      // NZD
        "Philippines",      // PHP
        "Poland",           // PLN
        "Romania",          // RON
        "Sweden",           // SEK
        "Singapore",        // SGD
        "Thailand",         // THB
        "Turkey",           // TRY
        "United States",    // USD
        "South Africa"      // ZAR
    ]);
    return (
        <FormControl style={{ width: "150px" }}>
            <InputLabel htmlFor="country-select">{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                inputProps={{
                    name: 'country',
                    id: 'country-select',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{option.label}{" ("}{countries[index]}{" )"}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default countryCode;
