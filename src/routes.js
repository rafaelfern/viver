
import Task from "../src/pages/Task/Task";
import Users from "../src/pages/Users/Users";
import Content from "../src/pages/Content/Content";
import Login from "../src/pages/Login/Login";
import NewTask from "../src/pages/Task/NewTask";
import NewUser from "../src/pages/Users/NewUser";
import Admin from "../src/layouts/Admin";

var routes = [

  {
    path: "/tarefas",
    component: Task,
    layout: "/admin",
  },
  {
    path: "/usuarios",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/home",
    component: Content,
    layout: "/admin",
  },
  {
    path: "/login",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/nova-tarefa",
    component: NewTask,
    layout: "/admin",
  },
  {
    path: "/novo-usuario",
    component: NewUser,
    layout: "/admin"
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    redirect: true,
    path: "/",
    to: "/login",
  },

];
export default routes;
 