import { M_PLUS_1 } from "next/font/google";
import { useReducer } from "react";

function counterReducer(state, action) {
  if (action.type === 'increment') {
    return { ...state, counter: state.counter+1 };
  }
  throw new Error(`Unknown action : ${action.type}`);
}

function MyComponent() {
  const [state, dispatch] = useReducer(counterReducer, {counter: 1});

  return (
    <div>Counter : {state.counter}</div>
    <button onClick={() => dispatch({ type: 'increment'}) }>
      Increment
    </button>
  );
}