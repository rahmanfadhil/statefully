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

**NodeJS**

```sh
# Using npm
npm install statefully

# Using yarn
yarn add statefully
```

**HTML**

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

**Actions**

```js
// Create action
const setGreeting = store.action((state, { name }) => ({ greeting: name }));

// Call action
setGreeting({ name: "Doe" });

store.getState(); // { greeting: "Doe" }
```

---

### 📝 Guide

**With TypeScript**

```ts
// Create container
type State = { greeting: string };
const store = createContainer<State>({ greeting: "John" });

// Create action
type SetGreetingProps = { name: string };
const setGreeting = store.action<SetGreetingProps>((state, { name }) => ({
  greeting: name,
}));

// Call action
setGreeting({ name: "Doe" });
```

---

### 🌟 Features

- ✅ Actions
- ❌ Subscription
- ✅ TypeScript Support
- ❌ Flow Support
- ❌ React binding

---

### 🔑 License

[MIT](https://oss.ninja/mit/rahmanfadhil)
