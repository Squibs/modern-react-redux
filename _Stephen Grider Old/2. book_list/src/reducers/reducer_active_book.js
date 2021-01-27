// state argument is not application state, only the
// state this reducer is responsible for
export default function (state = null, action) {
  switch (action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
  }
  return state;
}

// need to handle the state in which there is no book selected
// (when the application is first opened); default set state to null (so it is not undefined)
