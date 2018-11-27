import React, {
  Component,
  createContext,
  SFC,
  ReactNode,
  ComponentType,
} from "react";

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

export interface ConnectProps<T extends object> {
  context: Statefully<T>;
}

export function createContainer<IState extends object>(
  initialState: IState,
): {
  store: Statefully<IState>;
  Provider: SFC;
  connect: <P extends object>(
    component: ComponentType<P & ConnectProps<IState>>,
  ) => ComponentType<P>;
} {
  const store = new Statefully<IState>(initialState);
  const StateContext = createContext(store);
  const Provider: SFC = (props) => (
    <StateContext.Provider value={store} {...props} />
  );
  const connect = <P extends object>(
    WrappedComponent: ComponentType<P & ConnectProps<IState>>,
  ): ComponentType<P> => {
    return class extends Component<P> {
      private subscribe() {
        this.setState({});
      }
      private init(context: Statefully<IState>) {
        context.unsubscribe(this.subscribe);
        context.subscribe(this.subscribe);
      }
      render() {
        return (
          <StateContext.Consumer>
            {(context) => {
              this.init(context);
              return <WrappedComponent {...this.props} context={context} />;
            }}
          </StateContext.Consumer>
        );
      }
    };
  };
  return { store, Provider, connect };
}
