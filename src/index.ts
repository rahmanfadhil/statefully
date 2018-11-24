export type MutationCallback<T, U> = (state: T, payload: U) => T;

export interface Mutation<T> {
  name: string;
  callback: MutationCallback<T, any>;
}

export interface ConfigOptions {
  strictMode: boolean;
}

export class Statefully<T extends object> {
  private state: T;
  private config: ConfigOptions;
  private mutations: Array<Mutation<T>> = [];

  public constructor(initialState: T, config?: ConfigOptions) {
    this.state = initialState;
    this.config = Object.assign(
      {},
      { strictMode: false },
      config ? config : undefined,
    );
  }

  public getState(): T {
    return Object.assign(this.state);
  }

  public mutation<U>(name: string, callback: MutationCallback<T, U>): void {
    this.mutations.push({ name, callback });
  }

  public mutate<U>(name: string, payload: U): void {
    for (var i = 0; i < this.mutations.length; i++) {
      if (this.mutations[i].name === name) {
        const mutation = this.mutations[i];
        const data = mutation.callback(Object.assign(this.state), payload);
        this.state = Object.assign({}, this.state, data);
        break;
      }
      if (this.config.strictMode && i === this.mutations.length - 1) {
        throw new Error(`'${name}' is not a registered mutation!`);
      }
    }
  }
}

export function createContainer<IState extends object>(
  initialState: IState,
  config?: ConfigOptions,
) {
  return new Statefully<IState>(initialState, config);
}
