import React from 'react'
import { Route, Switch } from 'react-router-dom'
import User from '../components/user/index'
import UserForm from '../components/user/add/index'

const routes = [
    {
        path: '/user/:id',
        component: UserForm
    },
    {
        path: '/user',
        component: UserForm
    },
   
    {
        path: '/',
        component: User
    }
]

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            exact
            render={(props) => <route.component {...props} routes={route.routes} />}
        />
    );
}

const Routers = () => {
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    )
}

export default Routers