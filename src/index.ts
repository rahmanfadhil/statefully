export type MutationCallback<T, U> = (state: T, payload: U) => T;

export interface Mutation<T> {
  name: string;
  callback: MutationCallback<T, any>;
}

export class Statefully<T extends object> {
  private state: T;
  private mutations: Array<Mutation<T>> = [];

  public constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return Object.assign(this.state);
  }

  public mutation<U>(name: string, callback: MutationCallback<T, U>): void {
    this.mutations.push({ name, callback });
  }

  public mutate<U>(name: string, payload: U): Promise<T> {
    return new Promise((resolve, reject) => {
      for (var i = 0; i < this.mutations.length; i++) {
        if (this.mutations[i].name === name) {
          const mutation = this.mutations[i];
          const data = mutation.callback(Object.assign(this.state), payload);
          this.state = Object.assign({}, this.state, data);
          resolve(Object.assign(this.state));
          break;
        }
        if (i === this.mutations.length - 1) {
          reject(`"${name}" is not a registered mutations`);
        }
      }
    });
  }
}

export function createContainer<IState extends object>(initialState: IState) {
  return new Statefully<IState>(initialState);
}
