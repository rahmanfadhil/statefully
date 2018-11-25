# Statefully

![Travis (.org)](https://img.shields.io/travis/rahmanfadhil/statefully.svg) ![size](https://badgen.net/npm/v/statefully) ![size](https://badgen.net/badgesize/normal/https://unpkg.com/statefully@0.1.3/dist/index.js) ![dependencies](https://badgen.net/npm/dependents/statefully)

📦 A tiny state container for your javascript apps

- 💡 **Simple:** Easy to learn & use APIs
- 📦 **Small:** Zero dependencies + 1kb minified size only
- 🔌 **Pluggable:** Use anywhere you want
- 🔒 **Type-Safe:** Great type support with TypeScript & Flow

> ⚠ NOTE: This project is under active development!

---

### 🔧 Installation

NodeJS

```sh
# Using npm
npm install statefully

# Using yarn
yarn add statefully
```

Vanilla Javascript

```html
<script src="https://unpkg.com/statefully@latest/dist/index.min.js"></script>
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

> Mutation is just a function to mutate container data. Just like 'setState' in React

```js
// Register mutation
store.mutation("SET_GREETING", (state, { name }) => {
  return { greeting: name };
});

// Call mutation
store.mutate("SET_GREETING", { name: "Doe" });

store.getState(); // { greeting: "Doe" }
```

```js
// This will work too 👍
store.mutate({ greeting: "Doe" });

store.getState(); // { greeting: "Doe" }
```

**Actions (beta)**

> Actions is a function to do asynchronous things. Ex: fetch data from server

```js
// Register action
store.action("GET_GREETING", async (mutate, { url }) => {
  // Fetch data from server with given url
  const data = await fetch(url);
  const { name } = await data.json();

  // Just a regular mutate function 😁
  mutate("SET_GREETING", { name: name });
});

// Call action
store.commit("GET_GREETING", {
  url: "https://jsonplaceholder.typicode.com/users/1",
});
```

---

### 📝 Guide

**Strict Mode**

> By default, calling unregistered mutation & action will not throw any errors. But you can change this behavior by passing strictMode to container options

```js
const store = createContainer({ greeting: "John" }, { strictMode: true });

// Both will throw an error
store.mutate("WRONG_MUTATION");
store.commit("WRONG_ACTION");
```

**With TypeScript**

```ts
// Create container
type State = { greeting: string };
const store = createContainer<State>({ greeting: "John" });

// Register mutation
type GreetingProps = { name: string };
store.mutation<GreetingProps>("SET_GREETING", (state, { name }) => {
  return { greeting: name };
});

// Call mutation
store.mutate<GreetingProps>("SET_GREETING", { name: "Doe" });
```

---

### 🌟 Features

- ✅ Mutations
- ✅ Actions
- ❌ Subscrition
- ✅ TypeScript Support
- ❌ Flow Support
- ❌ React binding

---

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
