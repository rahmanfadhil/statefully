export type MutationCallback<T> = (state: T, payload: any) => T;

export interface Mutation<T> {
  name: string;
  callback: MutationCallback<T>;
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

  public mutation(name: string, callback: MutationCallback<T>): void {
    this.mutations.push({ name, callback });
  }

  public mutate(name: string, payload: any): Promise<T> {
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

export function createStore<IState extends object>(initialState: IState) {
  return new Statefully<IState>(initialState);
}
