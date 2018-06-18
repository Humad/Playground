//////////////////////////////
// Store, actions, dispatch //
//////////////////////////////
const store = Redux.createStore(
    (state = {login: false}) => state
);
  
const loginAction = () => {
    return {
        type: 'LOGIN'
    }
};

// Dispatch the action here:
store.dispatch(loginAction());

////////////////////////
// Handling an action //
////////////////////////

// Reducer is simply a pure function that takes a state and action
// and returns a new state. Nothing else is done here.

const defaultState = {
    login: false
};

const reducer = (state = defaultState, action) => {
// change code below this line
if (action.type === 'LOGIN') {
    return {login: true}
}
return {login: false}
// change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
return {
    type: 'LOGIN'
}
};

//////////////////////////////////
// Registering a Store Listener //
//////////////////////////////////
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// global count variable:
let count = 0;

// change code below this line
store.subscribe(function() {
  count++;
});

// change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);

//////////////////////////////
// Having multiple reducers //
//////////////////////////////
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer
});// define the root reducer here

const store = Redux.createStore(rootReducer);

////////////////////
// Handling async //
////////////////////
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    // dispatch request action here
    asyncDataReducer.dispatch(requestingData());

    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // dispatch received data action here
      asyncDataReducer.dispatch(receivedData(data));

    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

//////////////////////////
// Don't mutate things! //
//////////////////////////
const immutableReducer = (state = ['Do not mutate state!'], action) => {
    switch(action.type) {
      case 'ADD_TO_DO':
        // don't mutate state here or the tests will fail
        let newArray = [...state, action.todo];
        return newArray;
      default:
        return state;
    }
};

const addToDo = (todo) => {
    return {
        type: 'ADD_TO_DO',
        todo: todo
    }
}

const store = Redux.createStore(immutableReducer);

///////////////////////////////////////
// Copy an object with Object.assign //
///////////////////////////////////////
const defaultState = {
    user: 'CamperBot',
    status: 'offline',
    friends: '732,982',
    community: 'freeCodeCamp'
  };
  
  const immutableReducer = (state = defaultState, action) => {
    switch(action.type) {
      case 'ONLINE':
        // don't mutate state here or the tests will fail
        var newObject = Object.assign({}, state, {status: 'online'});
        return newObject;
      default:
        return state;
    }
  };
  
  const wakeUp = () => {
    return {
      type: 'ONLINE'
    }
  };
  
  const store = Redux.createStore(immutableReducer);