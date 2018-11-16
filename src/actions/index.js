export const authorize = payload => ({
    type: 'AUTH_REQUEST',
    payload
});

export const authsuccess = payload => ({
    type: 'AUTH_SUCCESS',
    payload
});

export const authfailure = payload => ({
    type: 'AUTH_FAILURE',
    payload
});

export const logout = payload => ({
    type: 'LOGOUT',
    payload
});

export const fetchplanet = payload => ({
    type: 'GET_PLANET',
    payload
})

export const planetsuccess = payload => ({
    type: 'PLANET_SUCCESS',
    payload
})