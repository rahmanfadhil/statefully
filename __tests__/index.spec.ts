import { createContainer, Statefully } from "../src/index";

describe("Main", () => {
  const initialState = { greeting: "John" };
  const store = createContainer<{ greeting: string }>(initialState);

  test("Should create a container", () => {
    expect(store instanceof Statefully).toBeTruthy();
    expect(store.getState()).toEqual({ greeting: "John" });
  });

  test("Should register and run mutation", async () => {
    type SetGreetingProps = { name: string };
    const setGreeting = store.action<SetGreetingProps>((state, { name }) => ({
      greeting: name,
    }));
    await setGreeting({ name: "Doe" });
    expect(store.getState()).toEqual({ greeting: "Doe" });
  });
});
