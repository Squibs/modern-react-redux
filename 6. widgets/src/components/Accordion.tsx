/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';

export type ItemsContent = {
  title: string;
  content: string;
};

interface IAccordionProps {
  items: ItemsContent[];
}

const Accordion = ({ items }: IAccordionProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // state hook useState(null) is initial value

  const onTitleClick = (index: number) => {
    setActiveIndex(index); // this.setState({ activeIndex: index })
    // as an aside note if you need the functional version of setState it looks like this:
    // setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
    // prevActiveIndex can be named anything, it allows the use of the previous state
    // this is useful when updating the state relies on the previous state, for example
    // when making a counter
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? 'active' : '';

    // React.Fragment - a way to group a list of children without adding extra nodes to the DOM
    // https://reactjs.org/docs/fragments.html
    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon" />
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
