import React,{Component} from 'react'
import styles from './login.less'
import { NavBar, Icon ,List,InputItem,Button,WhiteSpace,Toast} from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router'


@connect(({user})=>({
  user,
}))
class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      phoneNumber:"",
      pwd:"",
    };
  }

  goBackToHistory=()=>{
    window.history.go(-1)
  };

  getChangeAccount=(value)=>{

    this.setState({
      phoneNumber:value,

    })
  };

  getChangePwd=(value)=>{

    this.setState({
      pwd:value,

    })
  };

  handleSubmit=()=>{
    const {dispatch}=this.props;

    if(!this.state.phoneNumber || this.state.phoneNumber.trim()===""){
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
        phoneNumber:this.state.phoneNumber,
        pwd:this.state.pwd,
      }
    })
  };

  handleGoRegister=()=>{
    router.push("/Register")
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
            placeholder={"请输入手机号"}
          >账号</InputItem>
          <InputItem
            type="password"
            onChange={(value)=>this.getChangePwd(value)}
          >密码</InputItem>
        </List>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="ghost" size="small" onClick={()=>this.handleSubmit()} style={{width:"40%",marginLeft:"30%"}} >登录</Button>
          <WhiteSpace/>
          <WhiteSpace/>
        <p style={{textAlign:'right'}}>
            <a onClick={this.handleGoRegister}>还没有账号？请先注册 >>></a>
        </p>
      </div>
    )
  }


}
export default Login




