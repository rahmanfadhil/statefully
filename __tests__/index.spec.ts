import { createContainer, Statefully } from "../src/index";

describe("Main", () => {
  test("Should passed basic test", async () => {
    const initialState = { hello: "world" };
    const store = createContainer<{ hello: string }>(initialState);
    expect(store instanceof Statefully).toBeTruthy();

    type HelloProps = { name: string };
    store.mutation<HelloProps>("SET_HELLO", (state, { name }) => ({
      hello: name,
    }));
    store.mutate<HelloProps>("SET_HELLO", { name: "changed" });
    expect(store.getState()).toEqual({ hello: "changed" });
  });
});
