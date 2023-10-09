# Vue.js Dashboard Application

Welcome to the Vue.js Dashboard application! This repository contains the source code for a versatile Vue.js application that serves as a dashboard for managing various aspects of your project. Whether you're looking to set up the project locally or explore its architecture, this README provides a detailed guide to get you started.

## Getting Started

To begin using this Vue.js dashboard application, follow these simple steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/SamanAbasi/vue-dashboard
    cd vue-dashboard


2. Install the dependencies:

   ```bash
    npm install


3. Start the development server:

   ```bash
    npm run server


## Folder Structure

The project structure is organized as follows:

vue-dashboard/

├── src/

│ ├── API/ # Contains API functions

│ ├── components/ # Reusable components

│ ├── Hooks/ # Reusable hooks such as useAPI

│ ├── Layouts/ # Layouts for diffrent routes

│ ├── lib/ # Utility functions and constants

│ ├── router/ # router setup and configs

│ ├── store/ # Vuex store setup and modules

│ ├── types/ # TypeScript type declarations

│ ├── views # pages

│ ├── App.vue # Main application component

│ ├── main.ts # Entry point

│ └── ... # Other files and folders

├── public/: # Includes public assets and static files.

├── package.json and package-lock.json: Define project dependencies and versions.

└── README.md # You're currently reading it! This README provides detailed information about the project's structure, features, and usage.



## Technologies Used

This Vue.js dashboard application leverages various technologies and libraries to deliver a powerful and responsive user experience. Here's a list of the key technologies used:

- Vue 2.7.14: A JavaScript library for building user interfaces.
- Vuex 3.6.2: A predictable state container for managing application state.
- Axios: A library for making HTTP requests.
- TypeScript: A typed superset of JavaScript that enhances code quality and maintainability.
- BootstrapVue: A library based on Bootstrap v4, for building responsive, mobile-first sites using Vue.js.
- VeeValidate: VeeValidate is a validation framework built specifically for Vue.js and as such it makes some assumptions and enforces "best-practices" for your forms while being versatile and customizable.
- Vue CLI:Vue CLI is a full system for rapid Vue.js development.

## Features
This Vue.js dashboard application comes packed with features that make it a powerful tool for managing and visualizing data. Here's a glimpse of some of the key features:

- **Toast Component**: An elegant way to display temporary messages or notifications to users. Customizable, user-friendly, and automatically removed after a predefined duration.
- **useAPI Function**: A custom Vue Composition API function designed for simplified API requests and effortless loading state management.
- **Vee-Validate Integration**: Seamlessly integrated Vee-Validate for form validation, including custom validation rules.
- **Vue Router Configuration**: A well-structured Vue Router setup with route guards and a "not-found" route for a secure and user-friendly navigation experience.
- **Axios Configuration**: Axios setup for handling API errors, including 404 redirection and pushing toasts for error feedback.
Each of these features is meticulously implemented to enhance the overall functionality and user experience of the Vue.js dashboard application.

# Toast Component

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Customization](#customization)
- [Automatic Removal of Toasts](#automatic-removal-of-toasts)
- [Stacking Behavior and Pushing Toasts in a Row](#stacking-behavior-and-pushing-toasts-in-a-row)
---

## Introduction

The Toast component provides a user-friendly way to display temporary messages or notifications to users. It enhances user experience by showing short-lived messages in an unobtrusive manner, making it ideal for feedback on user actions, such as form submissions, errors, or information alerts.

![Demo](/demo.gif)

## Features

- **User-Friendly**: Toasts are non-intrusive and provide a clean way to communicate with users.
- **Customizable**: Customize toast appearance and behavior, including duration and styling.
- **Ease of Use**: Integrate seamlessly with Vuex to manage and display toasts from anywhere in your Vue.js application.
- **Automatic Removal**: Toasts are automatically removed after a predefined time to keep the interface clean.

## Usage

1. **Installation**: Ensure that the Toast component is properly imported and configured in your Vue.js project.

2. **Dispatch Toasts**: To display a toast, dispatch the `addToast` action with the desired message, variant (optional), and bold message (optional).

   ```javascript
   // Example of dispatching a success toast
   store.dispatch("addToast", {
     message: "Action was successful",
     variant: "success",
     boldMessage: "Success",
   });
   ```
## Customization
Customize the appearance and behavior of toasts by modifying the included CSS. You can adjust styling, positioning, and animations to match your project's design.
```css
.custom-toast {
  /* Customize toast appearance, positioning, and animations */
}

.with-padding {
  /* Adjust the position of toasts with padding */
}

/* CSS for animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
```
## Automatic Removal of Toasts
The Toast component automatically removes toasts after a predefined duration to keep the interface clutter-free. When a toast is added, a timer is set for its removal. By default, each toast is displayed for 5 seconds (configurable). When the timer expires, the toast gracefully fades out and slides upward to give a polished user experience.

## Stacking Behavior and Pushing Toasts in a Row
To ensure a clean and organized presentation of toasts, CSS is used to control their stacking behavior. Toasts are displayed in a stack at the top-right corner of the screen by default, but you can easily customize their positioning and styling by modifying the CSS.

- **Stacking**: Toasts are stacked vertically, with the most recent toast appearing on top. This stacking order ensures that users see the latest messages first, creating a natural flow of information.

- **Pushing Toasts in a Row**: If multiple toasts are triggered in rapid succession, they are pushed into a row horizontally. Each toast will still appear for the specified duration but will be displayed side by side when there are several toasts within a short time frame. This behavior prevents the screen from becoming cluttered with overlapping toasts.

CSS animations (**@keyframes**) are used to achieve smooth transitions when toasts appear, slide in, and fade out. The **transform-origin** property is set to "top center" to ensure that toasts slide in from the top while maintaining their alignment with the top of the screen.
# useAPI Function

The `useAPI` function is a custom Vue Composition API function designed to simplify making API requests and managing loading states. This README explains the purpose, advantages, approach, and usage of the `useAPI` function.

## Table of Contents

- [Purpose](#purpose)
- [Advantages](#advantages)
- [Approach](#approach)
- [Usage](#usage)

## Purpose

The purpose of the `useAPI` function is to streamline the process of making API requests and managing loading states associated with those requests. It simplifies API requests and helps manage loading states, making it easier to interact with APIs in Vue.js applications.

## Advantages

- **Simplified API Requests**: With `useAPI`, API requests can be made with just a single function call, reducing the boilerplate code required for each request.
- **Loading State Management**: The function automatically manages the loading state, making it particularly useful when displaying loading spinners or disabling UI elements during API requests.
- **Callback Support**: You can specify success and failure callback functions to handle API responses and errors in a modular and maintainable way.

## Approach

Here's how the `useAPI` function works:

1. **Initialization**: You provide the `useAPI` function with an `apiMethod` that represents the API endpoint or function to be called. Optionally, you can provide `successCallback` and `failedCallback` functions to handle responses and errors.

2. **Request**: When you invoke the `request` function returned by `useAPI`, it sets the `pending` state to `true` to indicate that a request is in progress.

3. **API Request**: The `request` function then calls the provided `apiMethod` function, making the actual API request.

4. **Response Handling**: If the API request is successful, `useAPI` invokes the `successCallback` function (if provided) with the API response data.

5. **Error Handling**: If the API request fails, `useAPI` invokes the `failedCallback` function (if provided) with the error object and throws the error to be handled by the caller.

6. **Completion**: Finally, regardless of success or failure, `useAPI` sets the `pending` state back to `false` to indicate that the request has completed.

## Usage

Here's an example of how you can use the `useAPI` function in your Vue.js application:

```javascript
import useAPI from "@/Hooks/useAPI"; // Import the useAPI function

async deleteArticleAction(slug: string) {
      this.loadingDelete = true;
      const { request } = useAPI({
        apiMethod: () => deleteArticle(slug),
        successCallback: () => {
          this.hideModal();
          this.$emit("fetch-articles");
        },
        failedCallback: (error) => {
          this.loadingDelete = false;
          this.hideModal();
          store.dispatch("addToast", {
            message: error,
            variant: "danger",
          });
        },
      });
      await request();
      this.loadingDelete = false;
    },

// In your Vue component, you can use the 'pending' variable to manage loading states
// and invoke the 'request' function to make API requests
```

# Vee-Validate Integration and Custom Rules

In this section, we'll explore how Vee-Validate is integrated into my Vue.js component and how custom validation rules are used. We'll also discuss the reasons for using Vee-Validate and the custom rules I've created.

## Table of Contents

- [Vee-Validate Integration](#vee-validate-integration)
- [Custom Validation Rules](#custom-validation-rules)
- [Reasons for Using Vee-Validate](#reasons-for-using-vee-validate)

## Vee-Validate Integration

In my Vue.js component, i've integrated the Vee-Validate library for form validation. Vee-Validate is a popular library that simplifies form validation in Vue applications by providing a set of built-in validation rules and a way to create custom rules.

### 1. Import

I import Vee-Validate functions and rules at the beginning of my script section:

```javascript
import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from "vee-validate";
import "@/utils/validationRules";
setInteractionMode("eager");
```
### 2. Components
I register the ValidationProvider and ValidationObserver components to use them within my template:
```javascript
components: {
  ValidationProvider,
  ValidationObserver,
},
```
### 3. Validation Rules
I configure validation rules for my form inputs using the **rules** attribute in my template. For example, i've set rules for "User," "Email," and "Password" inputs using **ValidationProvider**.

### 4. Custom Rules
I've also created custom validation rules. For instance, i've defined a custom rule for the "password" field to ensure it contains at least one uppercase letter, one lowercase letter, and meets specific length criteria. This custom rule is added to Vee-Validate using **extend**.

### 5. Validation State
I define a method **getValidationState** to determine the validation state of each input field, which is used to apply CSS classes and styles based on whether the field is valid or not.

### 6. Form Submission
The **ValidationObserver** component is used to handle form submission and validation. The **@submit.stop.prevent** event listener calls the **handleSubmit** method when the form is submitted.

## Custom Validation Rules
I've created custom validation rules using Vee-Validate's extend function. Here are some details about the custom rule i've defined for passwords:

- **Rule Name**: "password"
- **Validation Logic**: This rule validates that the password contains at least one uppercase letter, one lowercase letter, and falls within a specific length range (4 to 10 characters). Additionally, it ensures that there are no spaces in the password.
- **Error Message**: If the validation fails, a custom error message is displayed.
```javascript
extend("password", {
  validate(value) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,10}$/;
    return regex.test(value);
  },
  message:
    "The password must contain at least one uppercase letter, one lowercase letter, and be 4 to 10 characters long. Please note that spaces are not allowed.",
});
```
I can reuse this custom rule in my form fields by specifying **"password"** in the **rules** attribute.

## Custom Interaction Mode
I've also implemented a custom interaction mode for Vee-Validate using the **setInteractionMode** function. The custom interaction mode triggers validation on every key enter event, I created this custom Interaction Mode because i couldent reach my goal in other modes provided by vee-validate like **eager**, **lazy** and etc. Here's the code i've used:

```javascript
setInteractionMode('custom', ({errors}) => {
  if (errors) {
    return {
      on: ['input', 'change', 'blur']
    };
  }

  return {
    on: ['input', 'change', 'blur']
  };
});
```
This custom interaction mode ensures that validation is triggered on **"input,"** **"change,"** and **"blur"** events, providing a customized validation behavior tailored to your application's needs.

## Reasons for Using Vee-Validate
Vee-Validate is a valuable addition to your Vue.js component for the following reasons:

- **Simplified Validation**: Vee-Validate simplifies form validation by providing a declarative way to specify validation rules directly in the template.

- **Built-in Rules**: It offers a wide range of built-in validation rules for common use cases, reducing the need to write custom validation logic.

- **Custom Rules**: Vee-Validate allows you to create custom validation rules to handle specific requirements, as demonstrated with your custom "password" rule.

- **Validation State Management**: The library provides a clear way to manage the validation state of each form field, making it easier to style and display error messages.

By integrating Vee-Validate and creating custom rules, you enhance the user experience by ensuring that data entered in your forms meets specific criteria and is validated in real-time.

# Vue Router Configuration

In my Vue.js application, I use Vue Router to manage the application's routing. Vue Router allows me to define routes and handle navigation within my single-page application (SPA).

## Route Configuration

My route configuration is defined in the `routes` array. Each route object in the array describes a route in my application. Here are some key details about my route configuration:

- **Nested Routes**: I've defined a nested route structure. The top-level route is my application's layout, `AppLayout`, which serves as a container for child routes. Nested routes are specified using the `children` property.

- **Lazy Loading and Code Splitting**: I've implemented lazy loading and code splitting for my route components. This means that route components are loaded on-demand when they are needed, reducing the initial bundle size and improving application performance. This is achieved using the `import()` function with dynamic imports.

- **Named Routes**: Each route has a `name` property, which gives it a unique identifier. Named routes are useful for programmatic navigation and route matching.

## Route Guards

I've implemented route guards using the `router.beforeEach` method. Route guards allow me to control navigation and apply logic before allowing a route change. Here's a breakdown of my route guards:

- **Authentication Check**: I check whether a user is authenticated by accessing the Vuex store (`store.getters.isLoggedIn`). If a user is authenticated, they are redirected away from the login and registration pages to the home page. This ensures that authenticated users cannot access these pages.

- **Non-Authenticated Users**: For routes other than "login" and "register," if a user is not authenticated, they are redirected to the login page. This guards against unauthorized access to protected routes.

- **Allowing Navigation**: In cases where the user is authenticated and the route is not "login" or "register," navigation is allowed, and the user is directed to their desired route.

## Not-Found Route
I've included a "not-found" route to handle cases where a user navigates to a route that does not exist. This route is important for providing a user-friendly experience and ensuring that users are not left with a broken or confusing interface.

```javascript
// Fallback "not found" route for all other unmatched paths
{
  path: "*",
  name: "not-found",
  component: () =>
    import(
      /* webpackChunkName: "notFound" */ "@/views/404/NotFoundView.vue"
    ),
}

```
In this code snippet, the "not-found" route is defined with a wildcard path "*" to catch all unmatched routes. When a user accesses an undefined route, they are redirected to the "not-found" route, where they can be informed that the requested page does not exist.

## SignLayout and AppLayout
The **"SignLayout"** and **"AppLayout"** are used to provide a consistent layout for authentication-related pages, "SignLayout" for the login and registration pages and "AppLayout" for other pages such as "articles". It ensures that these pages have a common structure and appearance, enhancing the overall user experience.

```javascript
{
  path: paths.HOME,
  component: AppLayout,
  children: [
    {
      path: "", // Empty path for the default child route
      name: "home",
      //..
    },
    {
      path: paths.CREATE_ARTICLE,
      name: "new-article",
      //..
    },
    {
      path: paths.ARTICLE,
      name: "article",
     //..
    },
  ],
},
{
  path: paths.LOGIN,
  component: SignLayout,
  children: [
    {
      path: "",
      name: "login",
      //..
    },
  ],
},
{
  path: paths.REGISTER,
  component: SignLayout,
  children: [
    {
      path: "",
      name: "register",
      //..
    },
  ],
},

```
## Code Splitting and Lazy Loading

Code splitting and lazy loading are important for optimizing the performance of my application. By using `import()` with webpackChunkName, I create separate bundles (chunks) for each route component. This means that when a user accesses a specific route, only the necessary JavaScript for that route is loaded, reducing the initial load time.

For example:

```javascript
component: () =>
  import(
    /* webpackChunkName: "createArticle" */ "@/views/newArticle/NewArticleView.vue"
  ),
```
In this code, the **NewArticleView** component will be loaded as a separate chunk when the user navigates to the "new-article" route.

Overall, my Vue Router setup follows best practices by implementing lazy loading, code splitting, and route guards to create a performant and secure SPA navigation experience

# Axios Configuration
In my Vue.js application, I use Axios for making HTTP requests to an API. Here's the configuration for Axios and how it handles 404 errors:

In this Axios configuration:

404 Redirection: When a 404 error is encountered in a response, it redirects to the "not-found" route using Vue Router (router.push({ name: "not-found" })).

```javascript
// Handle API errors
function handleApiError(error: AxiosError) {
  const { response, request } = error;

  if (response) {
    // Handle not-found errors (status code 404)
    if (status === 404) {
      // Redirect to the Not Found page
      router.push({ name: "not-found" });
      return;
    }

    // Handle other API errors (e.g., validation errors) and push toasts for user feedback
    // ...
  } else if (request) {
    // Handle network errors and push a toast for user feedback
    // ...
  } else {
    // Handle other errors and push a toast for user feedback
    // ...
  }
}

// ...

```
Toasts for Error Notifications: For various error scenarios, including network errors, validation errors, and general errors, the Axios configuration pushes toasts to notify the user about the issue. These toasts are dispatched using Vuex and can be displayed to the user to provide feedback about the error.
```javascript
function handleApiError(error: AxiosError) {
  const { response, request } = error;

  if (response) {
    // The request was made, but the server responded with an error status code
    const { status, data } = response;
    const errorsData = (data as any)?.errors;

        // ..

    if (errorsData) {
      for (const key in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, key)) {
          const errorMessages = errorsData[key];
          errorMessages.forEach((errorMessage: string) => {
            store.dispatch("addToast", {
              message: `${key} ${errorMessage}`,
              variant: "danger",
            });
          });
        }
      }
    } else {
      // Dispatch a general error message for other errors
      const errorMessage = (data as any)?.message || "An error occurred";
      store.dispatch("addToast", {
        message: errorMessage,
        variant: "danger",
      });
    }

  } else if (request) {
    // The request was made, but no response was received (network error)
    // Dispatch a toast for network errors
    store.dispatch("addToast", {
      message: "Network error: Unable to reach the server",
      variant: "danger",
    });
  } else {
    // Something happened in setting up the request or sending it
    store.dispatch("addToast", {
      message: "An error occurred: " + error.message,
      variant: "danger",
    });
  }
}
```