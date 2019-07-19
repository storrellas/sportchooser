import { createStore } from "redux";


// Actions
// ---------------------
export const RENDER_CONFETTI = "RENDER_CONFETTI";
export const USER_CREATED = "USER_CREATED";

export function renderConfetti(payload = null) {
  return { type: RENDER_CONFETTI, payload }
};

export function userCreated(payload = null) {
  return { type: USER_CREATED, payload }
};

// Reducers
// ---------------------
const initialState = {
  articles: [],
  confetti: false,
  user: undefined
};

export function rootReducer(state = initialState, action) {
  //console.log("rootReducer", action)
  if (action.type === RENDER_CONFETTI) {
    return Object.assign({}, state, {
      confetti: action.payload
    });
  }
  if (action.type === USER_CREATED) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  return state;
}

export const store = createStore(rootReducer);
export default store