# Statefully

![Travis (.org)](https://img.shields.io/travis/rahmanfadhil/statefully.svg) ![size](https://badgen.now.sh/badge/install%20size/7.65%20kB/44CC11)

📦 A tiny state container for your javascript apps

### 🌟 Features

- 💡 **Simple:** Easy to learn & use APIs
- 📦 **Small:** 7kb install size only
- 🔌 **Pluggable:** Use anywhere you want
- 🔒 **Type-Safe:** Great type support with TypeScript & Flow

> ⚠ NOTE: This project is under active development!

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

// Create container with initial value
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

store.getState(); // { greeting: "Doe" }
```

---

### 📝 Guide

**Strict Mode**

> By default, calling unregistered mutation will not throw any errors. But you can change this behavior by passing strictMode to container options

```js
const store = createContainer({ greeting: "John" }, { strictMode: true });

store.mutate("WRONG_MUTATION"); // Will throw an Error
```

**Use TypeScript**

```ts
// Create container
type State = { greeting: string };
const store = createContainer<State>({ greeting: "John" });

// Register mutation
type GreetingProps = { name: string };
store.mutation<GreetingProps>("SET_GREETING", ({ name }) => {
  return { greeting: name };
});

// Call mutation
store.mutate<GreetingProps>("SET_GREETING", { name: "Doe" });
```

---

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
