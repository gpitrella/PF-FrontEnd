import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MyProfile from "./components/MyProfile/MyProfile";
import LogIn from './components/LogIn/LogIn';
import PersonalInformation from "./components/MyProfile/PersonalInformation/PersonalInformation";
import MyReviews from "./components/MyProfile/MyReviews/MyReviews";
import MyComments from "./components/MyProfile/MyComments/MyComments"
import { getUserDetail, deleteUserDetail, getUserReviews, getAllCommentByUserID } from '../src/redux/actions';

import notFoundPage from './components/404/NotFoundPage404';


import "./style/dark.scss";

const UserProfile = () => {
  const { url } = useRouteMatch()
  const { theme } = useSelector(state => state.general);
  const { user } = useSelector((state) => state.general);
  const { oneuser } = useSelector((state) => state.userReducer)
  const { userReviews } = useSelector((state) => state.userReducer)
  const { commentByUser } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();

  React.useEffect(() => {
      if(user?.user) {
        console.log(user.user)
          dispatch(getUserDetail(user?.user.id))
          dispatch(getUserReviews(user?.user.id))
          dispatch(getAllCommentByUserID(user?.user.id))
      }
      return () => {
        dispatch(deleteUserDetail())
      };
  }, [user]);
  console.log(commentByUser)


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
          <Route exact path = {`${url}/myreviews`} > { user ? <MyReviews userReviews={userReviews}/> : <LogIn/>}</Route>
          <Route exact path = {`${url}/mycomments`} > { user ? <MyComments commentByUser={commentByUser}/> : <LogIn/>}</Route>
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default UserProfile;