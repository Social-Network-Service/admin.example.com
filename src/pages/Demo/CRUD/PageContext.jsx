import {createContext, useReducer, useContext} from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function usePage() {
  return useContext(TasksContext);
}

export function usePageDispatch() {
  return useContext(TasksDispatchContext);
}

export function PageProvider({children}) {
  const [tasks, dispatch] = useReducer(
    pageReducer,
    initialState
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function pageReducer(state, action) {
  switch (action.type) {
    case 'create_show':
      return {
        ...state,
        createVisible: true,
        selectedData: action.data,
      }
      break;
    case 'create_hide':
      return {
        ...state,
        createVisible: false,
        selectedData: null,
      }
      break;
    case 'added': {
      return [...state, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return state.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return state.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
  return state;
}

const initialState = {
  createVisible: false,
  selectedData: null,
  tasks: [
    {id: 0, text: 'Philosopher’s Path', done: true},
    {id: 1, text: 'Visit the temple', done: false},
    {id: 2, text: 'Drink matcha', done: false}
  ]
}
