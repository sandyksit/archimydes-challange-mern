import { doRequest } from '../utils/request'
import * as urls from './apiUrl'

const getRoles = () => {
    return doRequest(`${urls.GET_ROLE}`, 'get')
}

const getUsers = () => {
    return doRequest(`${urls.GET_ROLE}`, 'get')
}

const getUserById = (params) => {
    return doRequest(`${urls.GET_USER}/${params}`, 'get')
}

const postUser = (params) => {
    return doRequest(`${urls.REGISTER_USER}`, 'post', params)
}

const putUser = (id, params) => {
    return doRequest(`${urls.GET_USER}/${id}`, 'put', params)
}

const deleteUser = (params) => {
    return doRequest(`${urls.GET_USER}/${params}`, 'delete',)
}

export {
    getRoles,
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}