import { createContainer, Statefully } from "../src/index";

describe("Main", () => {
  const initialState = { greeting: "John" };
  const store = createContainer<{ greeting: string }>(initialState);

  test("Should create a container", async () => {
    expect(store instanceof Statefully).toBeTruthy();
    expect(store.getState()).toEqual({ greeting: "John" });
  });

  test("Should register and run mutation", () => {
    type GreetingProps = { name: string };
    store.mutation<GreetingProps>("SET_GREETING", (state, { name }) => {
      return { greeting: name };
    });

    store.mutate<GreetingProps>("SET_GREETING", { name: "Doe" });
    expect(store.getState()).toEqual({ greeting: "Doe" });
  });
});
