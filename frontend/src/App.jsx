import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Details/Home'
import Navbar from './components/Details/Navbar'
import About from './components/Details/About'
import Contact from './components/Details/Contact'
import Loginpage from './components/Authentication/Loginpage'
import SignUppage from './components/Authentication/SignUppage'
import Forgotpassord from './components/Authentication/Forgotpassord'
import Updatepassword from './components/Authentication/Updatepassword'
import Verifyemail from './components/Authentication/Verifyemail'
import { MyProfile } from './components/Details/MyProfile'
import MyAnalytics from './components/Details/MyAnalytics'
import { MyClassroom } from './components/Details/MyClassroom'
import CreateCourse from "./components/Course/CreateCourse"
import { MyLearnings } from './components/Details/MyLearnings'
import MyBasket from './components/Details/MyBasket'
import Settings from './components/Details/Settings'
import EditCourse from './components/Course/EditCourse'
import { CategoryPage } from './components/Course/CategoryPage'
import { CourseBuyDetails } from './components/Course/CourseBuyDetails'
import { ViewCourse } from './components/Course/ViewCourse'
import ScrollToTop from './components/Reusable/ScrollToTop'
import Private from './components/Reusable/Private'
import Protected from './components/Reusable/Protected'
import CheckAuthExpiry from './components/Reusable/CheckAuthExpiry'
import Public from './components/Reusable/Public'
import NotFound from './components/Reusable/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { loadcart } from './redux/Cartslice'
import { useEffect } from 'react'

function App() {

  // const dispatch = useDispatch();

  // const user = useSelector(state => state.User?.user);

  // useEffect(()=>{

  //   dispatch(loadcart(user?.userinfo?._id));

  // })

  return (
    
    <div className='relative'>
      
      <Navbar></Navbar>

      <ScrollToTop></ScrollToTop>

      <CheckAuthExpiry></CheckAuthExpiry>

      <Routes>

          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/login' element={<Public><Loginpage></Loginpage></Public>}></Route>
          <Route path='/signup' element={<Public><SignUppage></SignUppage></Public>}></Route>
          <Route path='/forgot-password' element={<Public><Forgotpassord></Forgotpassord></Public>}></Route>
          <Route path='/update-password/:code' element={<Public><Updatepassword></Updatepassword></Public>}></Route>
          <Route path='/verifyemail' element={<Public><Verifyemail></Verifyemail></Public>}></Route>
          <Route path='/dashboard/profile' element={ <Private><MyProfile></MyProfile></Private>}></Route>
          <Route path='/dashboard/analytics' element={<Private><Protected role={["Instructor"]}><MyAnalytics></MyAnalytics></Protected></Private>}></Route>
          <Route path='/dashboard/classroom' element={<Private><Protected role={["Instructor"]}><MyClassroom></MyClassroom></Protected></Private>}></Route>
          <Route path='/dashboard/create-course' element={<Private><Protected role={["Instructor"]}><CreateCourse></CreateCourse></Protected></Private>}></Route>
          <Route path='/dashboard/learnings' element={<Private><Protected role={["Student"]}><MyLearnings></MyLearnings></Protected></Private>}></Route>
          <Route path='/dashboard/basket' element={<Private><Protected role={["Student"]}><MyBasket></MyBasket></Protected></Private>}></Route>
          <Route path='/dashboard/settings' element={<Private><Settings></Settings></Private>}></Route>
          <Route path='/dashboard/edit-course/:courseid' element={<Private><Protected role={["Instructor"]}><EditCourse></EditCourse></Protected></Private>}></Route>
          <Route path='/categorypage/:categoryid' element={<CategoryPage></CategoryPage>}></Route>
          <Route path='/course/:courseid' element={<Private><Protected role={["Student"]}><CourseBuyDetails></CourseBuyDetails></Protected></Private>}></Route>
          <Route path='/course/viewcourse/:courseid' element={<Private><Protected role={["Student"]}><ViewCourse></ViewCourse></Protected></Private>}></Route>

          <Route path='*' element={<NotFound></NotFound>}></Route>

      </Routes>
      
    </div>

  )
}

export default App
