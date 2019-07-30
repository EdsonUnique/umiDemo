import React,{Component} from 'react'
import { TabBar } from 'antd-mobile';
import {Icon} from 'antd'
import router from 'umi/router';

class FooterNav extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               hidden: !this.state.hidden,
             });
           }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
           onClick={(e) => {
             e.preventDefault();
             this.setState({
               fullScreen: !this.state.fullScreen,
             });
           }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  handleRouter=(selectedNav,path)=>{
    this.setState({
      selectedTab:selectedNav
    })

    router.push(path)

  }

  render() {
    return (
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={<Icon type="bars" style={{fontSize:'24px'}}/>
            }
            selectedIcon={<Icon type="bars" style={{fontSize:'24px'}}/>
            }
            selected={this.state.selectedTab === 'login.js'}
            onPress={() => this.handleRouter('login.js','/')}

          >
            {/*{this.renderContent('Life')}*/}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <Icon type="tag" style={{fontSize:'24px'}}/>
            }
            selectedIcon={
              <Icon type="tag" style={{fontSize:'24px'}}/>
            }
            title="分类"
            key="category"
            selected={this.state.selectedTab === 'category'}
            onPress={() => {
              this.setState({
                selectedTab: 'category',
              });
            }}
          >
            {/*{this.renderContent('Koubei')}*/}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="圈子"
            key="circle"
            selected={this.state.selectedTab === 'circle'}
            onPress={() => {
              this.setState({
                selectedTab: 'circle',
              });
            }}
          >

          </TabBar.Item>
          <TabBar.Item
            icon={<Icon type="star" style={{fontSize:'24px'}}/>}
            selectedIcon={<Icon type="star" style={{fontSize:'24px'}} />}
            title="关注"
            key="focus"
            selected={this.state.selectedTab === 'focus'}
            onPress={() => {
              this.setState({
                selectedTab: 'focus',
              });
            }}
          >
            {/*{this.renderContent('My')}*/}
          </TabBar.Item>
          <TabBar.Item
            icon={<Icon type="user" style={{fontSize:'24px'}}/>}
            selectedIcon={<Icon type="user" style={{fontSize:'24px'}}/>}
            title="用户中心"
            key="userCenter"
            selected={this.state.selectedTab === 'userCenter'}
            onPress={() => this.handleRouter('userCenter','/userCenter')}
          >
            {/*{this.renderContent('My')}*/}
          </TabBar.Item>
        </TabBar>
    );
  }

}

export default FooterNav;
