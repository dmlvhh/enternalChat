import Store from 'electron-store';
// const Store = require("electron-store")
const store = new Store()
let userId = null

export const initUserId = (_userId) => {
    userId = _userId
}

export const setData = (key,value)=> {
    store.set(key,value)
}

export const getData = (key)=> {
    return store.get(key)
}

export const setUserData = (key,value) => {
    setData(userId+key,value)
}

export const getUserData = (key) => {
    return store.get(userId+key)
}

export const deleteUserData = (key) => {
    store.delete(userId+key)
}