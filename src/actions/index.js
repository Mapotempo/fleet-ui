// ===================
// ==  ACTION type  ==
// ===================
export const type = {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER: 'SET_USER'
};

// =========================
// ==  Token action type  ==
// =========================

export function setToken(user) {
    return {
        type: type.SET_TOKEN,
        user
    }
}

// ========================
// ==  User action type  ==
// ========================

export function setUser(user) {
    return {
        type: type.SET_USER,
        user
    }
}