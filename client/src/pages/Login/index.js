import React,{Component} from 'react'
import styles from './login.less'
import { NavBar, Icon ,List,InputItem,Button,WhiteSpace,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';


@connect(({user})=>({
  user,
}))
class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      account:"",
      pwd:"",
    };
  }

  goBackToHistory=()=>{
    window.history.go(-1)
  };

  getChangeAccount=(value)=>{

    this.setState({
      account:value,

    })
  };

  getChangePwd=(value)=>{

    this.setState({
      pwd:value,

    })
  };

  handleSubmit=()=>{
    const {dispatch}=this.props;

    if(!this.state.account || this.state.account.trim()===""){
      Toast.info("账号不能为空")
      return;
    }

    if(!this.state.pwd || this.state.pwd.trim()===""){
      Toast.info("密码不能为空")
      return;
    }

    dispatch({
      type:"user/login",
      payload:{
        account:this.state.account,
        pwd:this.state.pwd,
      }
    })
  };

  render(){



    return (
      <div>
        <NavBar
          mode="dark"
          leftContent="返回"
          onLeftClick={this.goBackToHistory}
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >登录</NavBar>

        <List>

          <InputItem
            type="number"
            onChange={(value)=>this.getChangeAccount(value)}
          >账号</InputItem>
          <InputItem
            type="password"
            onChange={(value)=>this.getChangePwd(value)}
          >密码</InputItem>
        </List>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="ghost" size="small" onClick={()=>this.handleSubmit()} style={{width:"40%",marginLeft:"30%"}} >登录</Button>

      </div>
    )
  }


}
export default Login




