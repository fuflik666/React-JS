# React Advanced Lesson

This project contains exercises to practice advanced React concepts. Follow the instructions for each exercise precisely. The automated tests will check your work against these exact requirements.

## Exercises

### 1. useEffect and Lifecycle
- **Task 1.1**: Create a component named `FetchUser` that accepts a prop `userId` and uses `useEffect` to set a loading message "Loading..." in state initially. After 100ms, update state to show "User ID: [userId]". Return a `<div>` with the current message in a `<p>` element.
- **Task 1.2**: Create a component named `DocumentTitle` that accepts a prop `title` and uses `useEffect` to update `document.title` with that value. Return `null`.
- **Task 1.3**: Create a component named `WindowResize` that uses `useEffect` to track window width in state. Return a `<div>` with a `<p>` showing "Width: [width]px".

### 2. useContext
- **Task 2.1**: Create a Context named `ThemeContext` and a component `ThemeProvider` that provides value `{ theme: 'dark', toggleTheme: () => {} }`. Create a component `ThemeDisplay` that consumes this context and displays the theme in a `<p>` element with text "Current theme: [theme]".
- **Task 2.2**: Create a Context named `UserContext` with a component `UserProvider` providing `{ name: 'Guest', age: 0 }`. Create `UserInfo` component that displays "Name: [name], Age: [age]" in a `<div>`.

### 3. useReducer
- **Task 3.1**: Create a component named `TodoList` that uses `useReducer` to manage todos. Initial state is an empty array. Support actions: ADD (adds todo with text), REMOVE (removes by index). Return a `<div>` with a list of todos in `<ul>` and each todo in `<li>` with the todo text.
- **Task 3.2**: Create a component named `ShoppingCart` using `useReducer`. Initial state is `{ items: [], total: 0 }`. Support ADD_ITEM action (adds item with name and price). Display total in a `<p>` with text "Total: $[total]".

### 4. Custom Hooks
- **Task 4.1**: Create a custom hook named `useCounter` that accepts an initial value and returns an object with `{ count, increment, decrement, reset }`. Create a component `CounterWithHook` that uses this hook and displays count with three buttons: "Increment", "Decrement", "Reset".
- **Task 4.2**: Create a custom hook named `useLocalStorage` that accepts a key and initial value, manages state, and syncs with localStorage. Create a component `PersistentInput` that uses this hook with key "saved-text" and displays an `<input>` and the saved value in a `<p>`.

### 5. Higher Order Components
- **Task 5.1**: Create a HOC named `withLoading` that accepts a component and returns a new component. If prop `isLoading` is true, show "Loading..." in a `<div>`. Otherwise render the wrapped component. Create a simple component `DataDisplay` that shows a prop `data` in a `<p>`, then create `DataDisplayWithLoading` using the HOC.
- **Task 5.2**: Create a HOC named `withAuth` that accepts a component and checks if prop `isAuthenticated` is true. If true, render the component. If false, show "Access Denied" in a `<div>`. Create `ProtectedContent` component that displays "Secret Content" in a `<p>`, then create `ProtectedContentWithAuth` using the HOC.

## Getting Started
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Complete the tasks in `src/components.js`.
4. Run the tests to check your progress.

## Testing
Run the tests to check your progress. Each task has its own test suite.
```bash
npm install
npm test
```

## Submission
- Push your changes to your GitHub repository.
- Ensure all tests pass.
- Submit the repository link to your instructor.
# React-Advanced
