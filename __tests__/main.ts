import { createStore, Statefully } from "../src";

describe("Main", () => {
  test("Should passed basic test", async () => {
    const initialState = { hello: "world" };
    const store = createStore<{ hello: string }>(initialState);
    expect(store instanceof Statefully).toBeTruthy();

    store.mutation("SET_HELLO", (state, { name }) => ({ hello: name }));
    await store.mutate("SET_HELLO", { name: "changed" });
    expect(store.getState()).toEqual({ hello: "changed" });
  });
});
