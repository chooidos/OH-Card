import React from "react";
import ReactDropdown, { ReactDropdownProps } from "react-dropdown";
import 'react-dropdown/style.css'

export const Dropdown = ({options, onChange, value, placeholder}: ReactDropdownProps) => {
    return (
        <ReactDropdown options={options} onChange={onChange} value={value} placeholder={placeholder} />
    );
};
