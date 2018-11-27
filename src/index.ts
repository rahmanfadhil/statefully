export type ActionFn<T, U> = (state: T, payload: U) => T;
export type Action<U> = (payload: U) => Promise<void[]>;

export type SubscriberFn = () => void;

export class Statefully<T extends object> {
  private state: T;
  private _listeners: SubscriberFn[];

  public constructor(initialState: T) {
    this.state = initialState;
    this._listeners = [];
  }

  public getState(): T {
    return Object.assign(this.state);
  }

  public action<U>(callback: ActionFn<T, U>): Action<U> {
    return (payload: U) => {
      return Promise.resolve().then(() => {
        const data = callback(Object.assign(this.state), payload);
        this.state = Object.assign({}, this.state, data);
        const promises = this._listeners.map((listener) => listener());
        return Promise.all(promises);
      });
    };
  }

  public subscribe(fn: SubscriberFn): void {
    this._listeners.push(fn);
  }

  public unsubscribe(fn: SubscriberFn): void {
    this._listeners = this._listeners.filter((f) => f !== fn);
  }
}

export function createContainer<IState extends object>(initialState: IState) {
  return new Statefully<IState>(initialState);
}
