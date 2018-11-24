import { createStore, Statefully } from "../src";

describe("Main", () => {
  test("Should passed basic test", async () => {
    const initialState = { hello: "world" };
    const store = createStore<{ hello: string }>(initialState);
    expect(store instanceof Statefully).toBeTruthy();

    store.register("SET_HELLO", () => ({ hello: "changed" }));
    await store.dispatch("SET_HELLO");
    expect(store.getState()).toEqual({ hello: "changed" });
  });
});
