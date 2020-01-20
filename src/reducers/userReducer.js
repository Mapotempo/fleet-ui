import { type } from '../actions'

const initState = {
    pk: -1,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
}

export default function userReducer(state = initState, action) {
    console.log('la')
    switch (action.type) {
        case type.SET_USER:
            state = { ...state, ...action.user }
            break;
        default:
            break;
    }
    return state;
}
