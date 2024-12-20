---
title: "Reasons Why CSS Media Queries May Not Work"
excerpt: "`useCallback` does not need to be used for every function. Overusing it can add unnecessary overhead. Its primary purpose is to return the same function reference when dependencies remain unchanged."
coverImage: "/assets/blog/when-to-use-useCallback/cover.jpg"
date: "2024-12-20T05:35:07.322Z"
author:
  name: Ian Zhang
  picture: "/assets/blog/authors/me.jpeg"
ogImage:
  url: "/assets/blog/when-to-use-useCallback/cover.jpg"
tags: ["React"]
---

When to Use `useCallback` in React

## Not Every Function Needs `useCallback`

When should you use `useCallback`? This is a common question among developers.

Here are three frequently asked questions:

1. Why not wrap every function in `useCallback`?
2. Isn’t `useCallback` a caching tool?
3. Wouldn’t caching every function improve performance?

It’s true that `useCallback` is a caching tool. However, it does not prevent the recreation of functions.

### Example

```javascript
// Example Component
const ExampleComponent = () => {
  // fun 1: Function wrapped in useCallback
  const fun1 = useCallback(() => {
    console.log("Example function 1");
    ...
  }, []);

  // fun 2: Function not wrapped in useCallback
  const fun2 = () => {
    console.log("Example function 2");
    ...
  };

  return <div></div>;
};

```

In this `ExampleComponent` component, there are two functions: `fun1` (wrapped in `useCallback`) and `fun2` (not wrapped in `useCallback`).

At first glance, you might think that when the `ExampleComponent` component re-renders, only `fun2` will be recreated while `fun1` remains the same. However, this is not true. Functions wrapped in `useCallback` are also recreated and passed as arguments to `useCallback`.

The primary purpose of `useCallback` is not to prevent functions from being recreated but to return the same function reference (old function address) when dependencies remain unchanged. Regardless of whether `useCallback` is used, functions will still be recreated when a component renders.

### Hidden Cost of Overusing `useCallback`

Every function wrapped in `useCallback` is managed by `useCallback`'s internal queue. If you overuse `useCallback`, the queue grows, and every re-render of a component requires `useCallback` to:

1. Traverse its internal queue to find the relevant functions.
2. Check if the dependencies of those functions have changed.

Both actions consume resources. Overusing `useCallback` doesn’t prevent function recreation but adds unnecessary overhead to your project.

---

## When to Use `useCallback`

The correct scenario for using `useCallback` is when you pass a function to a child component that is memoized using `React.memo`.

`useCallback` ensures that the function reference remains unchanged when dependencies do not change, which prevents unnecessary re-renders of memoized child components.

### How React.memo Works

`React.memo` is a caching tool that prevents a component from re-rendering if its props haven’t changed. Specifically, `React.memo` compares the memory addresses of the props to detect changes.

When you pass a function as a prop, React detects changes if the function reference changes. If the parent component re-renders (even for state changes unrelated to the child component), all functions in the parent are recreated, and their references change. This triggers a re-render of the memoized child component.

---

### Example 1: Without `useCallback`

```JavaScript
import { memo } from "react";

/** Parent Component **/
const Parent = () => {
  const [parentState, setParentState] = useState(0); // Parent state

  // Function to be passed to child component
  const toChildFun = () => {
    console.log("Function passed to child component");
    // Additional logic here
  };

  return (
    <div>
      <button onClick={() => setParentState((val) => val + 1)}>
        Click to change parent state
      </button>
      {/* Pass function to child */}
      <Child fun={toChildFun}></Child>
    </div>
  );
};

/** Memoized Child Component **/
const Child = memo(() => {
  console.log("Child component re-rendered");
  return <div></div>;
});


```

**Behavior:**

When you click the button in the parent component, the parent re-renders because its state (`parentState`) changes. Since the `toChildFun` function reference changes, the memoized child component detects the change in its props and re-renders.

---

### Example 2: With `useCallback`

```JavaScript
import { useCallback, memo } from "react";

/** Parent Component **/
const Parent = () => {
  const [parentState, setParentState] = useState(0); // Parent state

  // Function to be passed to child component (wrapped in useCallback)
  const toChildFun = useCallback(() => {
    console.log("Function passed to child component");
    // Additional logic here
  }, []);

  return (
    <div>
      <button onClick={() => setParentState((val) => val + 1)}>
        Click to change parent state
      </button>
      {/* Pass function to child */}
      <Child fun={toChildFun}></Child>
    </div>
  );
};

/** Memoized Child Component **/
const Child = memo(() => {
  console.log("Child component re-rendered");
  return <div></div>;
});


```

**Behavior:**

The parent component re-renders when its state changes, but the `toChildFun` function reference remains unchanged because of `useCallback`. The memoized child component does not detect a change in its props and does not re-render.

---

## Summary

1. **Don’t wrap every function in `useCallback`.** Overusing `useCallback` can introduce performance overhead rather than optimization.
2. **`useCallback` doesn’t prevent function recreation.** It ensures that the same function reference is returned when dependencies don’t change.
3. **Use `useCallback` with `React.memo`.** It’s particularly useful when passing functions as props to memoized child components to prevent unnecessary re-renders.