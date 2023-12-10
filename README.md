# Vehicles-Mono

## React + Typescript + Vite + Firebase REST API

1. Git Clone
  - `git clone https://github.com/GeneralSting/Vehicles-Mono`
2. Install Dependencies:
  - `npm install`
3. Build the Application:
  - `npm run build`
4. Start the Development Server:
  - `npm run dev`

## Test project

Develop a minimalistic application of your choice by following the requirements defined below. Note that we proposed a Vehicle-related application, but you can choose anything you prefer:

- Create a list/grid page where the list/grid should have paging, sorting, and filtering functionality.
- Paging, sorting and filtering should be executed through REST API calls.
- Also, add other CRUD functionalities (not just reading and editing).
- Create edit pages for the list/grid on their routes.
- Create and edit pages should have form validation.
- You should use one of the available REST API services, like Firebase - https://firebase.google.com/, or create your own REST API service.
- The REST API service should store the following elements:
  - VehicleMake (Id, Name, Abrv) e.g. BMW, Ford, Volkswagen,
  - VehicleModel (Id, MakeId, Name, Abrv) e.g. 128, 325, X5 (BWM)
    -In your database, these two entities should be connected through the MakeId field.

### Requirements

#### React

##### Managing state with React:

- With react it’s most common to use its useState hook for managing the state inside of components.
- Since we are using MobX, most of our state should be defined in a MobX store -https://mobx.js.org/react-integration.html#you-might-not-need-locally-observable-state

##### Naming:

- Enforce the following naming conventions - https://github.com/airbnb/javascript/tree/master/react#naming

##### File structure:

- Enforce the following folder structure in combination with the guidelines below - https://reactjs.org/docs/faq-structure.html
- Components
  - Components used in the whole project
- Pages
  - Pages are based on routes and hold components
- Stores
  - MobX stores used throughout the whole project
- Services
  - REST API services used throughout the whole project
- Utils
  - Utility files and methods used throughout the whole project

##### Routing:

- You are required to add routing to your application.

##### MobX

- When using MobX, as mentioned we will define our state in “Stores”. - https://mobx.js.org/defining-data-stores.html#stores
- Avoid using makeAutoObservable, use makeObservable - https://mobx.js.org/observable-state.html#makeobservable
- Make sure to always update the observable state with actions and to keep asynchronous code inside of the same transaction - https://mobx.js.org/actions.html#asynchronous-actions

##### Managing forms:

- Use forms to update and create new data. For form validation and event handling use mobx-react-forms - https://foxhound87.github.io/mobx-react-form/

#### REST API

##### Services:

- You can use any service that you are familiar with.
- You can also write your API service. This code will not be reviewed.

##### Functionality:

- On the client side, we should have a service class that makes all the requests to the REST API.
- We should implement this service class in such a way that each entity in our database has its own service and can reuse functionality from the "Base" service class.

##### Store and service:

- If the store is a "DataStore" we can combine it with the service for said data and use them together.

##### Components:

- Avoid calling any REST API methods inside of components.
- The store for the current "view" should handle all of its REST API calls through a service.

##### CRUD:

- Your application needs to have the following functionality:
  - Create - add new data to the database
  - Read - get existing data from the database
  - Update - update existing data in the database
  - Delete - remove existing data from the database
- All of this functionality needs to be implemented on the client side.

#### Git

##### Commits:

- In your test project, you are required to add commits for each segment or your project that you complete.
- Pick a flow for committing your changes and follow it.
- E.G. when you finish implementing a DataStore and the UI for that store you should commit those changes under their commit.
- Each commit should be meaningful and the committed files should make sense with the commit message.
