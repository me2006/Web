import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  label: string;
  value?: string[];
  onChange: (selected: string[]) => void;
}

// Slightly modified version of:
// https://medium.com/@varimallashankar/multi-select-dropdown-in-react-build-a-reusable-and-fully-functional-component-623e7a119869
export default function MultiSelectDropdown({ options, label, value = [], onChange }: MultiSelectDropdownProps ) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const [searchText, setSearchText] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Handle selection
  const handleCheckboxChange = (optionValue: string) => {
    const updatedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((val) => val !== optionValue)
      : [...selectedOptions, optionValue];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  // Handle "Select All"
  const handleSelectAll = () => {
    const allValues = options.map((option) => option.value);
    const allSelected = selectedOptions.length === options.length;
    setSelectedOptions(allSelected ? [] : allValues);
    onChange(allSelected ? [] : allValues);
  };

  // Filter options
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className={styles.msdContainer}>
      <label className="input--label">{label}</label>
      <div className={styles.msdHeader} onClick={() => setIsOpen((prev) => !prev)}>
        <span className={selectedOptions.length > 0 ? styles.msdSelected : styles.msdPlaceholder}>
          {selectedOptions.length ? `${selectedOptions.join(", ")}` : "Select Chips"}
        </span>
        <FontAwesomeIcon icon={faArrowDown} className={styles.msdArrow} />
      </div>

      {isOpen && (
        <div className={styles.msdOptions}>

          <div className={styles.msdSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.msdSearchInput}
            />
          </div>

          <div className={styles.msdSelectAll} onClick={handleSelectAll} style={searchText ? { display: "none" } : {}}>
            <input
              type="checkbox"
              className={styles.msdCheckbox}
              checked={selectedOptions.length === options.length}
              onChange={handleSelectAll}
            />
            <label className={styles.msdSelectAllLabel}>Select All</label>
          </div>

          {/* Options */}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`${styles.msdOption} ${selectedOptions.includes(option.value) ? styles.selected : ""}`}
              onClick={() => handleCheckboxChange(option.value)}
            >
              <input
                type="checkbox"
                className={styles.msdCheckbox}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <label className={styles.msdOptionLabel}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}