# Statefully

![Travis (.org)](https://img.shields.io/travis/rahmanfadhil/statefully.svg) ![npm](https://img.shields.io/npm/dt/statefully.svg) ![size](https://badgen.now.sh/badge/install%20size/7.65%20kB/44CC11)

📦 A tiny state container for your javascript apps

### 🌟 Features

- 💡 Simple
- ⏫ Scalable
- 🚀 Asynchronous
- 👍 Type Support

> ⚠ This project is under active development

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

```js
// Using ES Module
import { createContainer } from "statefully";
// Using CommonJS
const { createContainer } = require("statefully");

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

---

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
