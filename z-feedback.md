1. Use Style Guide -> https://github.com/airbnb/javascript
2. Add proper DB validations
3. Google -> YAGNI  https://martinfowler.com/bliki/Yagni.html
4. Google -> KISS https://en.wikipedia.org/wiki/KISS_principle
5. Order of lines in app.js is important, make sure to connect to db first wherever its needed.
  - All the middlewares that dont need DB connection (Static Pages, Parsing cookies, parsing json body)
  - Connect to DB
  - Anything that needs DB connection eg. Passport, Authentication, Routing 
6. Convert all actions in components into Action Creator
7. Remove all inline css in components, move to App.scss
8. After signup, password shouldn't be sent back
9. Name routes properly, in this format -> "/RESOURCE_NAME_IN_PLURAL/ACTION" e.g. "/teams/new", "/teams/update", "/players/new", "/players/:id/edit", "/players/:id"



1. React-Redux Flow
  1. React Component -> Action Creator (Ajax req) -> Dispatch an action {plain object} -> reducer -> React Component re-renders

- Till Tuesday
1. Refactor UI
2. Get the frontend flow 

## Resources-
===
1. https://redux.js.org/basics/data-flow
2. https://hackernoon.com/https-medium-com-heypb-react-redux-workflow-in-4-steps-beginner-friendly-guide-4aea9d56f5bd
3. https://medium.com/tkssharma/understanding-redux-react-in-easiest-way-part-1-81f3209fc0e5

