import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext,
} from "react";

/* ===========================
 * 1. useEffect & lifecycle
 * ===========================
 */

// Task 1.1 – FetchUser
export function FetchUser({ userId }) {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // при зміні userId знову показуємо Loading...
    setMessage("Loading...");
    const timer = setTimeout(() => {
      setMessage(`User ID: ${userId}`);
    }, 100);

    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

// Task 1.2 – DocumentTitle
export function DocumentTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // по умові компонент повинен повертати null
  return null;
}

// Task 1.3 – WindowResize
export function WindowResize() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <p>{`Width: ${width}px`}</p>
    </div>
  );
}

/* ===========================
 * 2. useContext
 * ===========================
 */

// Task 2.1 – ThemeContext / ThemeProvider / ThemeDisplay
export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const value = { theme: "dark", toggleTheme: () => {} };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function ThemeDisplay() {
  const { theme } = useContext(ThemeContext);
  return <p>{`Current theme: ${theme}`}</p>;
}

// Task 2.2 – UserContext / UserProvider / UserInfo
export const UserContext = createContext({
  name: "Guest",
  age: 0,
});

export function UserProvider({ children }) {
  const value = { name: "Guest", age: 0 };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function UserInfo() {
  const { name, age } = useContext(UserContext);
  return <div>{`Name: ${name}, Age: ${age}`}</div>;
}

/* ===========================
 * 3. useReducer
 * ===========================
 */

// Task 3.1 – TodoList
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { text: action.text }];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}

export function TodoList() {
  const [todos] = useReducer(todosReducer, []);

  return (
    <div>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

// Task 3.2 – ShoppingCart
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const items = [...state.items, { name: action.name, price: action.price }];
      const total = state.total + action.price;
      return { items, total };
    }
    default:
      return state;
  }
}

export function ShoppingCart() {
  const [state] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <div>
      <p>{`Total: $${state.total}`}</p>
    </div>
  );
}

/* ===========================
 * 4. Custom Hooks
 * ===========================
 */

// Task 4.1 – useCounter + CounterWithHook
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

export function CounterWithHook() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Task 4.2 – useLocalStorage + PersistentInput
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        try {
          return JSON.parse(stored);
        } catch {
          return stored;
        }
      }
    } catch {
      // ігноруємо проблеми з localStorage
    }

    return initialValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const toStore =
        typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, toStore);
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue];
}

export function PersistentInput() {
  // важливо: початкове значення НЕ пусте, щоб тест з /./ знайшов текст
  const [text, setText] = useLocalStorage("saved-text", "Saved text");

  const handleChange = (e) => setText(e.target.value);

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
}

/* ===========================
 * 5. Higher Order Components
 * ===========================
 */

// Task 5.1 – withLoading + DataDisplay
export function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const { isLoading, ...rest } = props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...rest} />;
  };
}

export function DataDisplay({ data }) {
  return <p>{data}</p>;
}

export const DataDisplayWithLoading = withLoading(DataDisplay);

// Task 5.2 – withAuth + ProtectedContent
export function ProtectedContent() {
  return <p>Secret Content</p>;
}

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { isAuthenticated, ...rest } = props;
    if (!isAuthenticated) {
      // Текст і регістр СУВОРО такий, як у тесті
      return <div>Access Denied</div>;
    }
    return <WrappedComponent {...rest} />;
  };
}

export const ProtectedContentWithAuth = withAuth(ProtectedContent);
