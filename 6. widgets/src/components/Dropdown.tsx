/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-associated-control */

import React, { useEffect, useState, useRef } from 'react';

type Option = {
  label: string;
  value: string;
};

interface IDropdownProps {
  selected: Option;
  onSelectedChange: React.Dispatch<React.SetStateAction<Option>>;
  options: Option[];
  label: string;
}

const Dropdown = ({
  selected,
  onSelectedChange,
  options,
  label,
}: IDropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // all us to click anywhere/outside of the dropdown to close it
  // or when we select an option
  useEffect(() => {
    const onBodyClick = (event: Event) => {
      // https://stackoverflow.com/a/43851475/15020999
      // have to say event.target as Node for typescript to leave me alone
      // if there is a value in the ref and the ref contains what we clicked on
      // which means it is looking to see if what we clicked on is inside of the other element
      // so if the element clicked is inside of what we put the useRef on
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }

      // if the element is not inside of the ref then close dropdown
      setOpen(false);
    };

    // add the above method as a click event listener on the body
    document.body.addEventListener('click', onBodyClick);

    // remove the event listener; this doesn't get called initially
    // it ready to trigger as cleanup if the component ever re-renders
    // this useEffect has an empty array [] as a second parameter,
    // which means it only runs once, or if the component gets removed for cleanup
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []); // [] only run once

  const renderedOptions = options.map((option) => {
    // don't render selected option
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <i className="dropdown icon" />
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
      {/* <div style={{ color: selected.value }}>
        {`I am text that changes to the selected color: ${selected.value.toUpperCase()}`}
      </div> */}
    </div>
  );
};

export default Dropdown;
