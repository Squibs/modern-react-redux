import React from 'react';

import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

// https://stackoverflow.com/a/53964721
// probably wouldn't want to actually do it this way, but it works
// would probably want to map out the api results inside of interfaces
// interface IAppState {
//   images:{id:string, alt_description:string, urls:{regular:string;}}[];
// }

class App extends React.Component {
  state = { images: [] };

  // https://www.udemy.com/course/react-redux/learn/lecture/12531298#overview
  onSearchSubmit = async (term: string): Promise<void> => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term },
    });

    // console.log(response.data.results);
    this.setState({ images: response.data.results });
    // console.log(this.state.images);
  };

  render(): JSX.Element {
    const { images } = this.state;

    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={images} />
      </div>
    );
  }
}

export default App;
