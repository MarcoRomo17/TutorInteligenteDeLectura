import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateQuestion } from "./CreateQuestion";
import { SeeingQuestions } from "./SeeingQuestions";
import { Login } from "./Login";
import Dashboard from './Dashboard';
import { CreateUser } from "./CreateUser";
import { CreateProfessor } from "./CreateProfessor";
import { CreateText } from "./registerText";
import { Catalogue } from "./TextCatalogue";
import { Results } from "./Results";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/CreateQuestion",
    element: <CreateQuestion/>
  },
  {
    path:"/SeeingQuestions",
    element: <SeeingQuestions/>
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/CreateUser",
    element:<CreateUser/>
  },
  {
    path:"/CreateProfessor",
    element:<CreateProfessor/>
  },
  {
    path:"/registerText",
    element:<CreateText/>
  },
  {
    path:"/Catalogue",
    element:<Catalogue/>
  },
  {
    path:"/Results",
    element:<Results/>
  },
  {
    path:"/Dashboard",
    element:<Dashboard/>
  }


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
