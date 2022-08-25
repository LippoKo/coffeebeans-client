# CoffeeBeans Track

<br>

## Description

This is an app to find the best places in the world to drink coffee and buy coffee beans from different origins and countries around the world.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage to log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add my code files.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **create** - As a user I want to be able to create, edit and delete my lists.
- **result** - As a user I want to see the list of coffee beans and coffee shops to find a good place to drink coffee.

## Backlog

- add new places to buy coffee
- users can find other users list of coffee places
- add geolocation to events when creating

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                          | Component             | Permissions                | Behavior                                           |
| ----------------------------- | --------------------- | -------------------------- | -------------------------------------------------- |
| `/login`                      | LoginPage             | anon only `<AnonRoute>`    | Login form, navigates to home page after login.    |
| `/signup`                     | SignupPage            | anon only `<AnonRoute>`    | Signup form, navigates to login page after signup. |
| `/`                           | HomePage              | public `<Route>`           | Home page.                                         |
| `/user-profile`               | ProfilePage           | user only `<PrivateRoute>` | User profile for the current user.                 |
| `/user-profile/edit`          | EditProfilePage       | user only `<PrivateRoute>` | Edit user profile form.                            |
| `/coffeebeans/add`            | CreateCoffeeBeansPage | user only `<PrivateRoute>` | Create new coffeebeans place.                      |
| `/coffeeshop/add`             | CreateCoffeeShopPage  | user only `<PrivateRoute>` | Create new coffeeshop place.                       |
| `/coffeebeans/edit`           | EditCoffeeBeansPage   | user only `<PrivateRoute>` | Edit coffeebens file.                              |
| `/coffeeshop/edit`            | EditCoffeeShopPage    | user only `<PrivateRoute>` | Edit coffeeshop file.                              |
| `/coffeelist`                 | CoffeeListPage        | user only `<PrivateRoute>` | Coffee list.                                       |
| `/coffeebeans/:coffeebeansId` | CoffeeBeansDetailPage | user only `<PrivateRoute>` | CoffeeBeans details.                               |
| `/coffeeshop/:coffeeshopId`   | CoffeeBeansDetailPage | user only `<PrivateRoute>` | CoffeeShop details.                                |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage
- EditCoffeeBeansPage

- EditCoffeeShopPage

- CreateCoffeeBeansPage

- CreateCoffeeShopPage

- CoffeeListPage

- CoffeeBeansDetailPage

- CoffeeShopDetailPage

Components:

- Navbar
- CoffeeBeans
- CoffeeShop

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  firstName: {
    type: String,
    required: true,
    unique: true,
  }
  lastName: {
    type: String,
    required: true,
    unique: true,
  }
  username: {
    type: String,
    required: true,
    unique: true,
  }
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please use a valid email address']
  }
  password: {
    type: String,
    required: true,
  }
  {
    createdCoffes: [{ type: Schema.Types.ObjectId, ref: 'CoffeeBeans' }],
  }
  {
    createdShops: [{ type: Schema.Types.ObjectId, ref: 'CoffeeShop' }],
  }
}
```

**CoffeeBeans model**

```javascript
 {
    store: {
    type: [String]
    }
   origem: {
    type: [String]
   }
   description: {
    type: String,
    required: true,
   }
   image: {
    type: String,
   }
   location: {
    type: String,
    required: true,
   }
 }
```

**CoffeeShop model**

```javascript
{
  store: {
    type: String,
   }
   description: {
    type: String,
    required: true,
   }
   image: {
    type: String,
   }
   location: {
    type: String,
    required: true,
   }
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                   | Request Body                                     | Success status | Error Status | Description                                                                                                                     |
| ----------- | --------------------- | ------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `      | Saved session                                    | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`        | {firstname, lastname, username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`         | {email, password}                                | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/createcoffeebens`   | {store, origem, description, image, location}    | 201            | 404          | Checks if the mandatory fields not empty (422), then create coffeebeans file and store.                                         |
| POST        | `/coffeebeans/edit`   | {store, origem, description, image, location}    | 200            | 401          | Checks if the mandatory fields not empty (422), then edit coffeebeans file and store.                                           |
| POST        | `/createcoffeeshop`   | {store, description, image, location}            | 201            | 404          | Checks if the mandatory fields not empty (422), then create coffeeshop file and store.                                          |
| POST        | `/coffeeshop/edit`    | {store, description, image, location}            | 200            | 401          | Checks if the mandatory fields not empty (422), then edit coffeeshop file and store.                                            |
| GET         | `/coffeelist `        | Get all coffee files                             | 200            | 404          | Render all coffee files created for all users.                                                                                  |
| GET         | `/mycoffeelist `      | Get all coffee files                             | 200            | 404          | Render all coffee files created for the currently users.                                                                        |
| GET         | `/coffeebeansdetals ` | Get one coffebeans file                          | 200            | 404          | Render one coffeebeans file.                                                                                                    |
| GET         | `/coffeeshopdetails ` | Get one coffeeshop file                          | 200            | 404          | Render coffeeshop one file.                                                                                                     |
| POST        | `/deletecoffeebeans`  |                                                  | 204            | 400          | delete the coffeebeans file.                                                                                                    |
| POST        | `/deletecoffeeshop`   |                                                  | 204            | 400          | delete the coffeeshop file.                                                                                                     |
| GET         | `/api/random`         | Render random image.                             |                | 400          | Show random image coffee.                                                                                                       |

<br>

## API's

https://coffee.alexflipnote.dev/random

<br>

## Packages

ExpressJS

NodeJS

MongoDB

Mongoose

TailwindCSS

DaisyUI
<br>

# Links

### Figma

[Figma Link](https://www.figma.com/file/mpX6H3f7b4xrqMv9MrSc3p/CoffeeBeans?node-id=0%3A1)

### Git

[Client repository Link](https://github.com/LippoKo/coffeebeans-client)

[Server repository Link](https://github.com/LippoKo/coffeebeans-server)

[Deployed App Link](http://heroku.com)

### Slides

[Link]()

### Contributors

Luiz Lima - [Github](https://github.com/LippoKo) - [Linkedin](https://www.linkedin.com/in/luiz-limm/)
