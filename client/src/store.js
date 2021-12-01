import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thumk"
import rootReducer from "./reducers"

const initialState = {}

const middleware = [ thunk ]

const store = createStore(
    rootReducer,
    initialState,
    conpose(
        applyMiddleware(..middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
            compose
    )
)

export default store