---
title: "React 19 new features and improvements"
excerpt: "let's check what the React team have been doing and what will be provided in react 19"
coverImage: "/assets/blog/react-19-new/cover.png"
date: "2024-05-17T05:35:07.322Z"
author:
  name: Ricardo Esteves
  picture: "/assets/blog/authors/ricardo.png"
ogImage:
  url: "/assets/blog/react-19-new/cover.png"
tags: ["webdev", "react", "javascript"]
---

## New/Extended Features in React 19

> Some of them already stable and available on Next.js

### **1. React Compiler**

The React Compiler is a significant feature in React 19. It takes your React code and converts it into regular JavaScript. This process can potentially double the performance of your application.
The need for a compiler arises from the challenges with memoization and multiple re-renders. Traditionally, React uses a process called bundling to transform the JSX code into optimized JavaScript files for the browser. The new compiler takes this concept a step further. It analyzes your code at a deeper level, understanding the structure and dependencies between components.
React operates on a core principle: re-rendering of UI triggered by changes in application state. This allows us to describe the desired end state of the UI, rather than implicitly writing step-by-step instructions on how to manipulate the DOM. However, this can sometimes lead to excessive re-renders.

To prevent this, we had to intentionally optimize our components using memoization techniques. Memoization in React is a performance optimization technique that involves storing and reusing the results of expensive computations or component output based on the input parameters.
The React Compiler aims to simplify this process by automatically handling memoization and re-rendering. It allows compiled React code to automatically render only the right parts of the UI when the state changes. This removes the need of `useMemo`, `useCallback`, and `memo`. (If you follow the [rules of react](https://19.react.dev/reference/react#rules-of-react))

### **2. Server Components**

Server Components in React 19 allow components to be processed on the server before delivering the page to users. This results in faster page loading and better SEO. It's a significant improvement as it reduces the amount of JavaScript that needs to be sent to the client, improving performance, particularly on slower networks.

### **3. Actions**

Actions in React 19 simplify the management of data and interactions within web pages. They provide a pending state that starts at the beginning of a request and automatically resets when the final state update is committed. This allows you to keep the current UI responsive and interactive while the data is changing.

### **4. Document Metadata**

Document Metadata in React 19 allowing us to accomplish more with less code. It provides a way to manage the metadata of a document, such as the title, meta tags, and other head elements. This is particularly useful for SEO and user experience, as it allows to dynamically change the metadata based on the application state.

### **5. Asset Loading**

Asset Loading in React 19 enables assets to load in the background. This improves both the application's load time and the user experience. It's a significant improvement as it allows for better control over how and when assets are loaded, which can have a big impact on performance.

### **6. Web Components**

Web Components in React 19 introduce improved compatibility with the Web Components standard. This allows for more flexible and compatible frontend development. It's a significant improvement as it allows us to use custom elements, shadow DOM, and HTML templates.

### **7. Enhanced/New Hooks**

**Introduces four new hooks: `useOptimistic`, `useFormStatus`, `useFormState`, and `use`.**

> **useOptimistic**

The `useOptimistic` hook allows you to update the UI optimistically before receiving confirmation from the server². This provides a seamless user experience by ensuring that users don't have to wait for feedback. It's particularly useful in scenarios where you want to give immediate feedback to the user, even before the server has responded.

> **useFormStatus**

The `useFormStatus` hook manages the status of form fields, handling validation logic and submission state. It gives you status information of the last form submission. This simplifies form management by providing a centralized mechanism to monitor and modify the status of form fields.

> **useFormState**

The `useFormState` hook serves as a manager for form input states. It offers a centralized mechanism to monitor and modify their values efficiently. It allows you to update state based on the outcome of form actions. This hook requires two arguments:

- `fn`: This parameter represents the function to execute when the form is submitted or a button is pressed. Upon invocation, this function receives the previous state of the form (initially the `initialState` that you pass, subsequently its previous return value) as its initial argument, followed by the arguments that a form action normally receives.
- `initialState`: This argument denotes the initial state value desired for the form. It can be any serializable value. Once the action is initially invoked, this parameter becomes irrelevant.

> **use**

The `use` hook is a versatile React Hook designed to fetch and utilize the value of a resource, such as a Promise or context, within your components or custom hooks. What sets `use` apart from other React Hooks is its unique ability to be invoked within loops and conditional statements, such as if blocks. However, it still adheres to the standard requirement that the function utilizing `use` must be either a Component or another Hook.

**Check out:** [React19 beta API docs](https://react.dev/blog/2024/04/25/react-19)

## **In conclusion**

This will be an overall improvement not just on user
experience but also for developers.

The React Compiler stands out as a game-changer. It takes your React code and converts it into optimized JavaScript, improving performance. This is a significant step forward as it not only enhances the performance but also simplifies the development process by automatically handling memoization and re-rendering. This means that we can focus more on building great user experiences rather than worrying about performance optimization.

On my opinion the use hook is another powerful addition that is set to revolutionize how we write and manage state in our React applications. The use hook provides a more flexible and efficient way to fetch and utilize the value of a resource, such as a Promise or context, within your components or custom hooks. What sets it apart from other React Hooks is its unique ability to be invoked within loops and conditional statements, such as if blocks. This brings a new level of dynamism and control to state management in React.
