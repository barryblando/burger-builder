# BurgerBuilder

Create React apps with no build configuration.

* [Creating an App](#creating-an-app) – How to create a new app.
* [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/facebook/create-react-app/issues/new).

## Quick Overview

```sh
npx create-react-app my-app
cd my-app
npm start
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

<p align='center'>
<img src='https://cdn.rawgit.com/facebook/create-react-app/27b42ac/screencast.svg' width='600' alt='npm start'>
</p>

### Get Started Immediately

You **don’t** need to install or configure tools like Webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Creating an App

**You’ll need to have Node >= 6 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-react-app my-app
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*

### npm

```sh
npm init react-app my-app
```

*`npm init <initializer>` is available in npm 6+*

### Yarn

```sh
yarn create react-app my-app
```

*`yarn create` is available in Yarn 0.25+*

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```directory
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── registerServiceWorker.js
```

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.rawgit.com/marionebl/create-react-app/9f62826/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

Your app is ready to be deployed.

## React References

* [Full-Stack React Articles](https://www.fullstackreact.com/articles/)
* [Pure React](https://daveceddia.com/pure-react/)
* [Full-Stack React - The Complete Guide to ReactJS and Friends](https://www.fullstackreact.com/)
* [Alligator.io - React](https://alligator.io/react/)
* [Testing React-Redux App using Jest and Enzyme](https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9)
* [React Composition Patterns](https://hackernoon.com/react-composition-patterns-from-the-ground-up-8401aaad93d7)
* [React, Inline Functions, and Performance](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578)
* [React Router DOM v4 Tutorial](https://www.techiediaries.com/react-router-dom-v4/)
* [Stateful vs Stateless Functional Components in React](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541)
* [When to use Component or PureComponent](https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81)
* [React — Composing Higher-Order Components (HOC)](https://medium.com/dailyjs/react-composing-higher-order-components-hocs-3a5288e78f55)
* [React Internals - How React Works (Used React 15, a bit outdated but good grasp is what you need)](http://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/)
* [Using Destructure and Spread in React Components](https://www.carlrippon.com/writing-concise-react-components-with-destructure-assignment-and-spread/)
* [Our Best Practices for Writing React Components](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)
* [React Components – Props and States in ReactJS with Examples](https://www.edureka.co/blog/react-components/)
* [React Lifecycle Methods- how and when to use them](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1)
* [ReactJs component lifecycle methods  -  A deep dive](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)
* [How to Benchmark React Components: The Quick and Dirty Guide](https://engineering.musefind.com/how-to-benchmark-react-components-the-quick-and-dirty-guide-f595baf1014c)
* [Build a NavBar & Side Drawer](https://www.academind.com/learn/react/snippets/navbar-side-drawer/)
* [React.js Forms: Controlled Components](https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/)
* [Building forms using React — everything you need to know](https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y)
* [Extracting Logic from React Components](https://javascriptplayground.com/react-extracting-logic/)

## Building High Performance React Applications

```markdown
- Render when really needed
- Measure performance e.g using ?react_perf (i.e development mode: localhost:3000/?react_perf)
- Use key correctly when displaying lists of data (Used to uniquely identify an element), Never use Math.random() or index as key
- Manage shouldComponentUpdate
- Extend PureComponent(Does a shallow comparison of all props/state) instead of Component
- Use stateless component
- Use Immutable Data (Fancy word for making new copy of an object), Makes tracking changes cheap
- Use Isomorphic React
- Build for Production
- Gzip all the plaintext (compress everything you possibly can)
- Use PNG & Lossless for Images
- Analyze Webpack Bundle
- Make App work first, then make it fast
```

## Composition vs. Inheritance

```markdown
- In React using Composition and Props gives you all the flexibility that you would need. React doesn't say Composition is better than Inheritance. Composition just fits better within the React's component structure.

- If you are new to React and are considering reusing code, always go for React Composition over Inheritance. With the addition of the latest Hooks in React, re-using code is only going to be much easier.

- React uses a variety of patterns for code reuse:
  - **Inheritance Pattern**: Used sparingly to share common code across React class components.
  - **Composition Pattern**: The core pattern for separating concerns while creating complex UIs with React.
  - **Decorator Pattern**: Used to provide a nice interface for separating out logic shared by multiple components and centralizing it.
  - **Mixin Pattern**: Hooks use a variation on the Mixin pattern to allow sharing related behavior and data between unrelated function components easily.
```

## Redux References

* [Idiomatic Redux: The History and Implementation of React-Redux](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)
* [What Does Redux Do? (and when should you use it?)](https://daveceddia.com/what-does-redux-do/)
* [How Redux Works: A Counter-Example](https://daveceddia.com/how-does-redux-work/)
* [What is Redux: A Designer's Guide](https://www.smashingmagazine.com/2018/07/redux-designers-guide/)
* [My take on Redux Architecture](http://krasimirtsonev.com/blog/article/my-take-on-redux-architecture)
* [Async Operations in React Redux Applications](https://www.sitepoint.com/async-operations-react-redux-applications/)
* [Understanding compose functions in redux](https://stackoverflow.com/questions/41357897/understanding-compose-functions-in-redux)
* [Understanding how redux-thunk works](https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50)
* [Building CRUD App with React + Redux](http://www.thegreatcodeadventure.com/building-a-simple-crud-app-with-react-redux-part-1/#table-of-contents)
* [React + Redux Architecture : Separation of Concerns](https://medium.com/prod-io/react-redux-architecture-part-1-separation-of-concerns-812da3b08b46)
* [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)
* [Using Redux DevTools in Production](https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f)
* [React + Redux Architecture](https://github.com/hirviid/react-redux-architecture)
* [React + Redux : Architecture Overview](https://articles.coltpini.com/react-redux-architecture-overview-7b3e52004b6e)
* [Getting Started with React, Redux and Immutable: a Test-Driven Tutorial (Part 1)](http://blog.theodo.fr/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/)
* [Redux Step by Step: A Simple and Robust Workflow for Real Life Apps](https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092)

## Redux Rules

```markdown
If you use Redux correctly, you’re going to get major benefits:

- Eliminate timing dependency bugs (No race of Async Request & Render sequence)
- Enable deterministic view renders (Isolated from network I/O and state updates)
- Enable deterministic state reproduction (Transactional)
- Enable easy undo/redo features
- Simplify debugging
- Become a time traveler

But for any of that to work, you have to remember some rules:

- Reducers must be pure functions
- Reducers must be the single source of truth for their state
- Reducer state should always be Serializable
- Reducer state should not contain functions

Also keep in mind:

- Some Apps don’t need Redux
- Use constants for action types
- Use action creators to decouple action logic from dispatch callers
- Use ES6 parameter defaults for self-describing signatures
- Use selectors for calculated state and decoupling
- Always use TDD / BDD!
```

## Structuring Project

* [How to Structure Your React Project](https://daveceddia.com/react-project-structure/)
* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [Structuring projects and naming components in React](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
* [Tips on Creating Reusable Components](https://dev.to/ganderzz/tips-on-creating-reusable-components-376j)
* [Atomic Design With React and Bit: Simplify a Complex UI](https://blog.bitsrc.io/simplify-complex-ui-by-implementing-the-atomic-design-in-react-with-bit-f4ad116ec8db)

## User Guide

The [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) includes information on different topics, such as:

- [Updating to New Releases](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases)
- [Folder Structure](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure)
- [Available Scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts)
- [Supported Browsers](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-browsers)
- [Supported Language Features and Polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills)
- [Syntax Highlighting in the Editor](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#syntax-highlighting-in-the-editor)
- [Displaying Lint Output in the Editor](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor)
- [Formatting Code Automatically](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically)
- [Debugging in the Editor](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#debugging-in-the-editor)
- [Changing the Page `<title>`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#changing-the-page-title)
- [Installing a Dependency](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#installing-a-dependency)
- [Importing a Component](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#importing-a-component)
- [Code Splitting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting)
- [Adding a Stylesheet](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet)
- [Post-Processing CSS](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#post-processing-css)
- [Adding a CSS Preprocessor (Sass, Less etc.)](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)
- [Adding Images, Fonts, and Files](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files)
- [Using the `public` Folder](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder)
- [Using Global Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-global-variables)
- [Adding Bootstrap](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-bootstrap)
- [Adding Flow](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-flow)
- [Adding a Router](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-router)
- [Adding Custom Environment Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)
- [Can I Use Decorators?](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators)
- [Fetching Data with AJAX Requests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#fetching-data-with-ajax-requests)
- [Integrating with an API Backend](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#integrating-with-an-api-backend)
- [Proxying API Requests in Development](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)
- [Using HTTPS in Development](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-https-in-development)
- [Generating Dynamic `<meta>` Tags on the Server](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#generating-dynamic-meta-tags-on-the-server)
- [Pre-Rendering into Static HTML Files](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#pre-rendering-into-static-html-files)
- [Running Tests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
- [Debugging Tests](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#debugging-tests)
- [Developing Components in Isolation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#developing-components-in-isolation)
- [Publishing Components to npm](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#publishing-components-to-npm)
- [Making a Progressive Web App](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app)
- [Analyzing the Bundle Size](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#analyzing-the-bundle-size)
- [Deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)
- [Advanced Configuration](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration)
- [Troubleshooting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#troubleshooting)
