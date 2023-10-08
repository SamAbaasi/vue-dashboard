# dashboard

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
import { ref, Ref } from "vue";
import useAPI, { UseApiProps, UseApiReturnType } from "./useAPI"; // Import the useAPI function

// Define the API method you want to use
async function fetchUserData(params?: Record<string, any>) {
  // Make your API request here
  const response = await someApiFunction(params);
  return response.data;
}

// Create a success callback function to handle the API response
function handleSuccess(data: any) {
  // Do something with the data, e.g., update your component's state
}

// Create a failed callback function to handle API errors
function handleFailure(error: any) {
  // Handle the error, e.g., display an error message to the user
}

// Define the API configuration
const apiConfig: UseApiProps<ResponseType> = {
  apiMethod: fetchUserData,
  successCallback: handleSuccess,
  failedCallback: handleFailure,
};

// Use the useAPI function to create an API request hook
const { pending, request }: UseApiReturnType<ResponseType> = useAPI(apiConfig);

// In your Vue component, you can use the 'pending' variable to manage loading states
// and invoke the 'request' function to make API requests
```

# Vee-Validate Integration and Custom Rules

In this section, we'll explore how Vee-Validate is integrated into your Vue.js component and how custom validation rules are used. We'll also discuss the reasons for using Vee-Validate and the custom rules you've created.

## Table of Contents

- [Vee-Validate Integration](#vee-validate-integration)
- [Custom Validation Rules](#custom-validation-rules)
- [Reasons for Using Vee-Validate](#reasons-for-using-vee-validate)

## Vee-Validate Integration

In your Vue.js component, you've integrated the Vee-Validate library for form validation. Vee-Validate is a popular library that simplifies form validation in Vue applications by providing a set of built-in validation rules and a way to create custom rules.

### 1. Import

You import Vee-Validate functions and rules at the beginning of your script section:

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
You register the ValidationProvider and ValidationObserver components to use them within your template:
```javascript
components: {
  ValidationProvider,
  ValidationObserver,
},
```
### 3. Validation Rules
You configure validation rules for your form inputs using the **rules** attribute in your template. For example, you've set rules for "User," "Email," and "Password" inputs using **ValidationProvider**.

### 4. Custom Rules
You've also created custom validation rules. For instance, you've defined a custom rule for the "password" field to ensure it contains at least one uppercase letter, one lowercase letter, and meets specific length criteria. This custom rule is added to Vee-Validate using **extend**.

### 5. Validation State
You define a method **getValidationState** to determine the validation state of each input field, which is used to apply CSS classes and styles based on whether the field is valid or not.

### 6. Form Submission
The **ValidationObserver** component is used to handle form submission and validation. The **@submit.stop.prevent** event listener calls the **handleSubmit** method when the form is submitted.

## Custom Validation Rules
You've created custom validation rules using Vee-Validate's extend function. Here are some details about the custom rule you've defined for passwords:

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
You can reuse this custom rule in your form fields by specifying **"password"** in the **rules** attribute.

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
