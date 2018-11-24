export interface Dispatcher<T> {
  name: string;
  callback: (state: T) => T;
}

export class Statefully<T extends object> {
  private state: T;
  private dispatcher: Array<Dispatcher<T>> = [];

  constructor(initialState) {
    this.state = initialState;
  }

  public getState(): T {
    return Object.assign(this.state);
  }

  public register(name: string, callback: (state: T) => T): void {
    this.dispatcher.push({ name, callback });
  }

  public dispatch(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      for (var i = 0; i < this.dispatcher.length; i++) {
        if (this.dispatcher[i].name === name) {
          const dispatcher = this.dispatcher[i];
          const data = dispatcher.callback(Object.assign(this.state));
          this.state = Object.assign({}, this.state, data);
          resolve(Object.assign(this.state));
          break;
        }
        if (i === this.dispatcher.length - 1) {
          reject(`"${name}" is not a registered dispatcher`);
        }
      }
    });
  }
}

export function createStore<IState extends object>(initialState: IState) {
  return new Statefully<IState>(initialState);
}
