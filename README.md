# Statefully

![npm](https://img.shields.io/npm/dt/statefully.svg) ![Travis (.org)](https://img.shields.io/travis/rahmanfadhil/statefully.svg) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/statefully.svg)

📦 A tiny state container for your javascript apps

### 🔧 Installation

```sh
# Using npm
npm install statefully

# Using yarn
yarn add statefully
```

### 📦 Usage

```js
import { createContainer } from "statefully";

// Create store with initial value
const store = createContainer({ greeting: "John" });

store.getState(); // { greeting: "John" }

// Register mutation
store.mutation("SET_HELLO", () => {
  return { greeting: "Doe" }; // Set greeting to "Doe"
});

// Run mutation
// mutate function is async, dont forget to add 'await'
await store.mutate("SET_HELLO");

store.getState(); // { greeting: "Doe" }
```

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
