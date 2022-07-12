import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MyProfile from "./components/MyProfile/MyProfile";
import LogIn from './components/LogIn/LogIn';
import PersonalInformation from "./components/MyProfile/PersonalInformation/PersonalInformation";
import MyReviews from "./components/MyProfile/MyReviews/MyReviews";
import MyComments from "./components/MyProfile/MyComments/MyComments";
import MyAddress from "./components/MyProfile/MyAddress/MyAddress";
import MyPurchases from "./components/MyProfile/MyPurchases/MyPurchases";
import UserPurchaseDetails from "./components/UserPurchaseDetails/UserPurchaseDetails";
import { getUserDetail, deleteUserDetail, getUserReviews, getAllCommentByUserID, getOrderByUser } from '../src/redux/actions';

import notFoundPage from './components/404/NotFoundPage404';


import "./style/dark.scss";

const UserProfile = () => {
  const { url } = useRouteMatch()
  const { theme } = useSelector(state => state.general);
  const { user } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  React.useEffect(() => {
      if(user?.user) {
          dispatch(getUserDetail(user?.user.id))
          dispatch(getUserReviews(user?.user.id))
          dispatch(getAllCommentByUserID(user?.user.id))
          dispatch(getOrderByUser(user?.user.id))
      }
      return () => {
        dispatch(deleteUserDetail())
      };
  }, [user]);

  return (
    <>
      <div className = {`app ${theme === 'darkTheme' ? 'dark' : ''}`} >
      <h2 className='title_myprofile'> My account </h2>
        <Switch>
          <Route exact path = {`${url}`} component = {MyProfile} />
          <Route exact path = {`${url}/personalinformation`} > { user ? <PersonalInformation /> : <LogIn/>}</Route>
          <Route exact path = {`${url}/myreviews`} > { user ? <MyReviews /> : <LogIn/>}</Route>
          <Route exact path = {`${url}/mycomments`} > { user ? <MyComments /> : <LogIn/>}</Route>
          <Route exact path = {`${url}/myaddress`} > { user ? <MyAddress /> : <LogIn/>}</Route>
          <Route exact path = {`${url}/mypurchases`} > { user ? <MyPurchases /> : <LogIn/>}</Route>
          <Route exact path = {`${url}/mypurchases/details/:id`} component = {UserPurchaseDetails} />
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default UserProfile;