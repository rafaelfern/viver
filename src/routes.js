import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Content from './pages/Content/Content';
import Task from './pages/Task/Task';
import Users from './pages/Users/Users';
import NewTask from './pages/Task/NewTask';

export default function routes() {
    return (
        <Switch>
            <Route path="/" exact component={Content} />
            <Route path={"/home"} component={Content} />
            <Route path={"/tarefas"} component={Task} />
            <Route path={"/usuarios"} component={Users} />
            <Route path={"/nova-tarefa"} component={NewTask} />
        </Switch>
    )
}
