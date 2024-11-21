'use client';

import * as React from 'react';
import Select from 'react-select';

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const selectedOptions = options.filter((option) => selected.includes(option.value));

  return (
    <Select
      isMulti
      value={selectedOptions}
      options={options}
      className={`${className} z-50`}
      classNamePrefix="react-select"
      onChange={(newValue) => {
        onChange((newValue as Option[]).map((option) => option.value));
      }}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'transparent',
          border: '1px solid var(--border)',
          '&:hover': {
            borderColor: 'var(--border)',
          },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 50,
          backgroundColor: 'var(--popover)',
          border: '1px solid var(--border)',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? 'var(--accent)' : 'transparent',
          color: state.isFocused ? 'var(--accent-foreground)' : 'inherit',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'var(--accent)',
            color: 'var(--accent-foreground)',
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: 'var(--secondary)',
          borderRadius: '0.375rem',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: 'var(--secondary-foreground)',
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: 'var(--secondary-foreground)',
          '&:hover': {
            backgroundColor: 'var(--destructive)',
            color: 'var(--destructive-foreground)',
          },
        }),
      }}
    />
  );
}
