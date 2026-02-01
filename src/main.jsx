import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './index.js'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Signup from './Pages/Signup.jsx'
import Post from './Pages/Post.jsx'
import Allposts from './Pages/Allposts.jsx'
import Addpost from './Pages/Addpost.jsx'
import Editpost from './Pages/Editpost.jsx'
const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[{
      path:'/',
      element:<Home/>
    },{
      path:'/login',
      element:(
        <AuthLayout authentication={false}><Login/></AuthLayout>
      )
    },{
      path:'/signup',
      element:(
        <AuthLayout authentication={false}><Signup/></AuthLayout>
      )
    },{
      path:'/my-posts',
      element:
        <AuthLayout authentication><Allposts/></AuthLayout>
    },{
      path:'/edit-post/:slug',
      element:(
        <AuthLayout authentication><Editpost/></AuthLayout>
      )
    },{
      path:'/post/:slug',
      element:<Post/>
    },{
      path:'/add-post',
      element:(
        <AuthLayout authentication><Addpost/></AuthLayout>
      )
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
