import { createStore } from "redux";


// Actions
// ---------------------
export const RENDER_CONFETTI = "RENDER_CONFETTI";
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export const USER_PROFILE = "USER_PROFILE";

export function renderConfetti(payload = null) {
  return { type: RENDER_CONFETTI, payload }
};

export function userCreated(payload = null) {
  return { type: USER_AUTHENTICATED, payload }
};

// Reducers
// ---------------------
const initialState = {
  articles: [],
  confetti: false,
  userAuthenticated: false
};

export function rootReducer(state = initialState, action) {
  //console.log("rootReducer", action)
  if (action.type === RENDER_CONFETTI) {
    return Object.assign({}, state, {
      confetti: action.payload
    });
  }
  if (action.type === USER_AUTHENTICATED) {
    return Object.assign({}, state, {
      userAuthenticated: action.payload
    });
  }
  if (action.type === USER_PROFILE) {
    return Object.assign({}, state, {
      userAuthenticated: action.payload
    });
  }
  return state;
}

export const store = createStore(rootReducer);
export default store