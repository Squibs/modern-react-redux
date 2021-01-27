/* eslint-disable camelcase */
/* eslint react/prop-types: 0 */

import React from 'react';

interface IImageCardProps {
  image: {
    id: string;
    alt_description: string;
    urls: {
      regular: string;
    };
  };
}

interface IImageCardState {
  spans: number;
}

class ImageCard extends React.Component<IImageCardProps, IImageCardState> {
  private imageRef: React.RefObject<HTMLImageElement>;

  constructor(props: IImageCardProps) {
    super(props);

    this.state = { spans: 0 };

    // needs private imageRef:React.RefObject<HTMLImageElement>;
    // above to work with typescript
    // use refs to access dom element instead of document.querySelector()
    this.imageRef = React.createRef();
  }

  componentDidMount(): void {
    // have to wait for the image to load
    this.imageRef.current?.addEventListener('load', this.setSpans);
  }

  setSpans = (): void => {
    const height = this.imageRef.current?.clientHeight;

    // https://www.javascripttutorial.net/es-next/javascript-nullish-coalescing-operator/
    // using new nullish operator since height can technically be null
    // such as maybe we never get an image from the api or something.
    // this is set from the componentDidMount() in the 'this.imageRef.current?
    // or the above const height
    // question mark means that it could possibly be null
    // the nullish operator only returns the second operand when the first one evaluates
    // to either null or undefined so here I am just making it set height to 0
    // if the image is nonexistent/null
    const spans = Math.ceil((height ?? 0) / 10);

    this.setState({ spans });
  };

  render(): JSX.Element {
    const { image } = this.props;
    const { spans } = this.state;

    return (
      <div style={{ gridRowEnd: `span ${spans}` }}>
        <img
          alt={image.alt_description}
          src={image.urls.regular}
          ref={this.imageRef}
        />
      </div>
    );
  }
}

export default ImageCard;
