import React from 'react';

interface ILinkProps {
  className: string;
  href: string;
  children: string;
}

const Link = ({ className, href, children }: ILinkProps): JSX.Element => {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // fixes ctrl click to open link in new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault(); // prevents full page reload

    // changes the url
    window.history.pushState({}, '', href);

    // navigation event to change contents on page
    // route component will listen for this event
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
