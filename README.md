# BADC UI Template

Serves as a starting point for all BADC projects

## Project setup

```js
// to run locally (defaults to port 8080, can be adjusted by the `PORT` env var)
npm install
npm run serve

// to build
npm run build
```

### Runing tests

```js

// run all tests
npm run test
npm run watch

// run one test
npm run test SomeTest
npm run watch SomeTest

// run all unit tests
npm run test:unit
npm run watch:unit

// run all integration tests
npm run test:integration
npm run watch:integration

```

### Create project environment

- add `.env.local` to base directory (this file will not be commited)

```
# setup
NODE_ENV=development
PORT=5000

# project
VUE_APP_PROJECT_TITLE=
VUE_APP_PROJECT_BASE_API=

# authentication
VUE_APP_OKTA_ISSUER=
VUE_APP_OKTA_CLIENT_ID=
VUE_APP_OKTA_REDIRECT_URI=
VUE_APP_OKTA_BASE_URL=
VUE_APP_OKTA_IDP_ID=
```

### Limiting access per role

Role access is controlled by `sections`. A section is a collection of roles that have access to similar features. Define `sections` and `roles` in `src/roles.js`

#### Routes

Specify access on each route by setting the `section` or `allowedRoles` meta properties. These can be used sperate, together, or not at all. Routes without either of these two properties will be accesable by all roles.

```js
{
  name: 'example',
  meta: {
    section: 'home', // section this route belongs to
    allowedRoles: ['SOME_ROLE'], // which roles are allowed to access this route
  }
```

#### Inline

Check section access with `hasAccess`. If you'd like to check for a single role use `hasRole`.

```js
this.$h.hasAccess('some_section')
this.$h.hasRole('SOME_ROLE')
```

### How to request data

Data is requested through the `Resource` system.

1. Create a new resource in **`src/data/resources`**
2. Add your resource name to **`index.js`**
3. Add api calls to the resource [(examples)](#resource-examples)
4. Use your resource:

##### With the service

```js static
import { request, requestResource } from '@/services/RequestService'

// call with an axios config object
request({ endpoint: 'example' })

// call with a resource name
requestResource('resource-name')

// optionally, you can pass a formating function as well as a validation function
requestResource('resource-name', format, validate)
```

##### With the mixin

```jsx static
import RequestMixin from '@/mixins/RequestMixin'

// methods are same as above
this.$request({ endpoint: 'endpoint' })
this.$requestResource('resource-name')

// request is kept track of with
this.$state
/*
{
  data: {},
  loading: true,
  error: undefined,
}
*/
```

##### With the _`<data-wrapper>`_

```jsx static
<data-wrapper resource="resource-name" v-slot={ _state }>

  <!-- loading slot -->
  <div slot="loading">
    {{_state.loading}}
  </div>

  <!-- error slot -->
  <div slot="error">
    {{_state.error}}
  </div>

  <!-- response slot -->
  <div>
    {{_state.data}}
  </div>

</data-wrapper>
```

<br>
<hr>

### **Resource Examples**

These are defined in **`src/data/resources`**

Returns a valid [axios config](https://github.com/axios/axios) from the `query` function

```js static
example: {
  query: () => ({
    endpoint: 'example',
  }),
},
```

Optionally, params are provided as an argument to the `query` function

```js static
exampleWithParams: {
  query: (params) => ({
    endpoint: 'example',
    params: {
      ...params
    },
  }),
},
```

You can provide `formatter` which intercepts, transforms, and returns the modified response

```js static
exampleWithFormatter: {
  query: () => ({
    endpoint: 'example',
    params: {},
  }),
  formatter: (response) => {
    return response
  },
},

Note: `formatter` can be async.  Workers should be used if the response is large enough to prevent UI blocking
```

Provide a `validator` which intercepts, validates, and passes the response on if no error is returned. Return the error as a string, or return `undefined` if the response is valid

```js static
exampleWithValidator: {
  query: () => ({
    endpoint: 'example',
    params: {},
  }),
  validation: (response) => {
    if (!response.hasOwnProperty('key')) {
      return 'Validation failed'
    }
    return
  },
},
```

Disable authentication

```js static
exampleWithNoAuth: {
  query: () => ({
    endpoint: 'example',
    headers: {
      authentication: false,
    },
  }),
},
```
