# Statefully

![Travis (.org)](https://img.shields.io/travis/rahmanfadhil/statefully.svg) ![size](https://badgen.now.sh/badge/install%20size/7.65%20kB/44CC11)

📦 A tiny state container for your javascript apps

### 🌟 Features

- 💡 **Simple:** Easy to learn APIs
- 📦 **Small:** 7kb install size only
- 🔌 **Pluggable:** Use anywhere you want
- 🔒 **Type-Safe:** Great type support with TypeScript & Flow

> ⚠ This project is under active development!

---

### 🔧 Installation

```sh
# Using npm
npm install statefully

# Using yarn
yarn add statefully
```

---

### 📦 Usage

**Create container**

```js
// Using ES Module
import { createContainer } from "statefully";
// Using CommonJS
const { createContainer } = require("statefully");

// Create store with initial value
const store = createContainer({ greeting: "John" });
```

**Get current state**

```js
store.getState(); // { greeting: "John" }
```

**Mutations**

```js
// Register mutation
store.mutation("SET_GREETING", ({ name }) => {
  return { greeting: name };
});

// Call mutation
store.mutate("SET_GREETING", { name: "Doe" });
```

---

### 📝 Guide

> ⚠ Mutations are asynchronous

```js
store.mutate("SET_GREETING", { name: "Doe" });

store.getState(); // Will not get latest value
```

```js
await store.mutate("SET_GREETING", { name: "Doe" });

store.getState(); // This will work 👍
```

---

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
