import { createContainer, Statefully } from "../src/index";

describe("Main", () => {
  const initialState = { greeting: "John" };
  const store = createContainer<{ greeting: string }>(initialState);

  test("Should create a container", async () => {
    expect(store instanceof Statefully).toBeTruthy();
    expect(store.getState()).toEqual({ greeting: "John" });
  });

  test("Should register and run mutation", () => {
    type SetGreetingProps = { name: string };
    const setGreeting = store.action<SetGreetingProps>((state, { name }) => ({
      greeting: name,
    }));
    setGreeting({ name: "Doe" });
    expect(store.getState()).toEqual({ greeting: "Doe" });
  });
});
