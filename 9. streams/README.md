# Streaming service clone app, moving onto redux

- react & redux chrome dev tools
- re-ducks folder structure is helping me understand redux better
  - having to learn things on my own instead of just copying stephen grider
  - splitting up redux state into different sections session(authentication) / streams
- understanding typescript a lot more
  - enums, getting types a lot easier, functional components make inferred types much better
- json server / handle stream list; user id's associated with streams
- not sure if my react side folder structure is quite there
  - seen people have layouts as well as pages; not too sure what the difference would be
    - app.tsx could go into layouts?
  - not too sure where to put types that come from pages/components
    - moved one type to redux side, do to dependency cycle errors; ended up using it the state type for streams
- react-hooks-form handling
