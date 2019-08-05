import styles from './index.less'
import React,{Component} from 'react';
import { Avatar } from 'antd';
import { List, WhiteSpace } from 'antd-mobile';
import GlobalEnum from '@/utils/GlobalEnum';
import router from 'umi/router'
import { connect } from 'dva';

const Item = List.Item;
const Brief = Item.Brief;

@connect(({userCenter,myViews})=>({
  userCenter,myViews
}))
class UserCenter extends Component{

  handleGoLogin=()=>{
    router.push("/Login")
  };

  handleLogin=(user)=>{
    if(user){
      //已登录
      return (
        <p>{user.genderStr}    {user.age}岁</p>
      )
    }else{
      return (
        <p><a onClick={this.handleGoLogin}>请先登录</a></p>
      )
    }
  };

  handleMyShelf=()=>{
    const {dispatch}=this.props;

    dispatch({
      type:"userCenter/fetchMyShelf"
    })

  };

  handleMyViews=()=>{

    const {dispatch}=this.props;

    dispatch({
      type:"myViews/fetchMyViews",
    })

  };

  render(){

    const user=JSON.parse(sessionStorage.getItem(GlobalEnum.sessionUserKey));

    return (
      <div className={styles.wrap}>

          <div className={styles.header}>
            <Avatar style={{ backgroundColor: '#87d068'}} size={64} icon="user" />
            <WhiteSpace/>
            <p>{user?user.nickname:"您还未登录"}</p>
            {
              this.handleLogin(user)
            }
          </div>
          <div className={styles.items}>
            <div>
              <svg t="1563698909517" className="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="9482" width="40" height="30">
                <path
                  d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
                  p-id="9483" fill="#d81e06"></path>
              </svg>

              <p>我的关注</p></div>
            <div>
              <svg t="1563698760943" className="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="8109" width="40" height="30">
                <path
                  d="M160 894c0 17.7 14.3 32 32 32h286V550H160v344zM546 926h286c17.7 0 32-14.3 32-32V550H546v376zM880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v140h366V310h68v172h366V342c0-17.7-14.3-32-32-32z m-402-4h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70 70 31.4 70 70v70z m138 0h-70v-70c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70z"
                  p-id="8110" fill="#d81e01"></path>
              </svg>
              <p>我的积分</p></div>
            <div>
              <svg t="1563698952166" className="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="9663" width="40" height="30">
                <path d="M508 512m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z" p-id="9664" fill="#d81e06"></path>
                <path
                  d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"
                  p-id="9665" fill="#d81e06"></path>
              </svg>
              <p>我的粉丝</p></div>
            <div>
              <svg t="1563698985180" className="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="9845" width="40" height="30">
                <path
                  d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8-21.1 21.2-32.8 49.2-32.8 79.1 0 29.9 11.7 57.9 32.8 79.1 21.2 21.1 49.2 32.8 79.1 32.8 29.9 0 57.9-11.7 79.1-32.8 21.1-21.2 32.8-49.2 32.8-79.1 0-29.9-11.7-57.9-32.8-79.1-21.2-21.2-49.2-32.8-79.1-32.8z"
                  p-id="9846" fill="#d81e06"></path>
                <path
                  d="M924.8 626.1l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9c10.1-8.6 13.8-22.6 9.3-35.2l-0.9-2.6c-18.1-50.4-44.8-96.8-79.6-137.7l-1.8-2.1c-8.6-10.1-22.5-13.9-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9c-2.4-13.1-12.7-23.3-25.8-25.7l-2.7-0.5c-52-9.4-106.8-9.4-158.8 0l-2.7 0.5c-13.1 2.4-23.4 12.6-25.8 25.7l-15.8 85.3c-35.9 13.6-69.1 32.9-98.9 57.3l-81.8-29.1c-12.5-4.4-26.5-0.7-35.1 9.5l-1.8 2.1c-34.8 41.1-61.5 87.4-79.6 137.7l-0.9 2.6c-4.5 12.5-0.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57 0 19.2 1.5 38.4 4.6 57l-66 56.5c-10.1 8.6-13.8 22.6-9.3 35.2l0.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1c8.6 10.1 22.5 13.9 35.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3c2.4 13.1 12.7 23.3 25.8 25.7l2.7 0.5c26.1 4.7 52.7 7.1 79.4 7.1 26.7 0 53.4-2.4 79.4-7.1l2.7-0.5c13.1-2.4 23.4-12.6 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9c12.5 4.4 26.5 0.7 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l0.9-2.6c4.3-12.4 0.6-26.3-9.5-35z m-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8 175.8 78.7 175.8 175.8-78.7 175.8-175.8 175.8z"
                  p-id="9847" fill="#d81e06"></path>
              </svg>
              <p>我的资料</p></div>
          </div>
          <div className={styles.contents}>
            <List className="my-list">
              <Item  arrow="horizontal" onClick={this.handleMyShelf}>我的书架</Item>
              <Item  arrow="horizontal" onClick={this.handleMyViews}>我的浏览</Item>
              <Item  arrow="horizontal" onClick={() => {}}>我的笔记</Item>
              <Item  arrow="horizontal" onClick={() => {}}>我的分享</Item>
              <Item  arrow="horizontal" onClick={() => {}}>我的书架</Item>
              <Item  arrow="horizontal" onClick={() => {}}>我的书架</Item>
              <Item  arrow="horizontal" onClick={() => {}}>我的书架</Item>

            </List>
          </div>


      </div>
    )
  }

}

export default UserCenter
