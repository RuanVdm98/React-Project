import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../pages/Account/Login'
import Register from '../pages/Account/Register'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/account/register" exact component={Register} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
)

export default Routes
