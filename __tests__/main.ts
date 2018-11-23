import { createStore, Statefully } from "../src";

describe("Main", () => {
  test("Should passed basic test", async () => {
    const initialState = { hello: "world" };
    const store = createStore(initialState);
    expect(store instanceof Statefully).toBeTruthy();

    store.register("setHello", () => ({ hello: "changed" }));
    await store.dispatch("setHello");
    expect(store.state).toEqual({ hello: "changed" });
  });
});
