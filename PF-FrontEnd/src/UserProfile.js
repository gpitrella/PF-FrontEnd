import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MyProfile from "./components/MyProfile/MyProfile";
import LogIn from './components/LogIn/LogIn';
import PersonalInformation from "./components/MyProfile/PersonalInformation/PersonalInformation";
import MyReviews from "./components/MyProfile/MyReviews/MyReviews";
import { getUserDetail, deleteUserDetail, getUserReviews } from '../src/redux/actions';

import notFoundPage from './components/404/NotFoundPage404';


import "./style/dark.scss";

const UserProfile = () => {
  const { url } = useRouteMatch()
  const { theme } = useSelector(state => state.general);
  const { user } = useSelector((state) => state.general);
  const { oneuser } = useSelector((state) => state.userReducer)
  const { userReviews } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();

  React.useEffect(() => {
      if(user?.user) {
          dispatch(getUserDetail(user?.user.id))
          dispatch(getUserReviews(user?.user.id))
      }
      return () => {
        dispatch(deleteUserDetail())
      };
  }, []);

  // React.useEffect(() => {
   
  //     console.log('entre a get reviews')
  //     console.log(oneuser.id)
    
  // }, [oneuser]);

  return (
    <>
      <div className = {`app ${theme === 'darkTheme' ? 'dark' : ''}`} >
      <h2 className='title_myprofile'> My account </h2>
        <Switch>
          <Route exact path = {`${url}`} component = {MyProfile} />
          <Route exact path = {`${url}/personalinformation`} > { user ? <PersonalInformation oneuser={oneuser}/> : <LogIn/>}</Route>
          <Route exact path = {`${url}/myreviews`} > { user ? <MyReviews oneuser={oneuser} userReviews={userReviews}/> : <LogIn/>}</Route>
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default UserProfile;