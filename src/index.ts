export type ActionFn<T, U> = (state: T, payload: U) => T;
export type Action<U> = (payload: U) => void;

export class Statefully<T extends object> {
  private state: T;

  public constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return Object.assign(this.state);
  }

  public action<U>(callback: ActionFn<T, U>): Action<U> {
    return (payload: U) => {
      const data = callback(Object.assign(this.state), payload);
      this.state = Object.assign({}, this.state, data);
    };
  }
}

export function createContainer<IState extends object>(initialState: IState) {
  return new Statefully<IState>(initialState);
}
