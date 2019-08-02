import React ,{Component} from 'react'
import { List, InputItem, Picker, Button, Icon, NavBar,DatePicker ,Toast,WhiteSpace} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';

const Item = List.Item;
@connect(({user})=>({
  user,
}))
class RegisterWrapper extends Component{

  state = {
    date: new Date(),
    visible: false,
    password:"",
    gender:[0],
  };

  onSubmit = () => {

    const {dispatch}=this.props;

    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const formData=this.props.form.getFieldsValue();
        formData.gender=(formData.gender)[0];//修改性别传值

        dispatch({
          type:"user/register",
          payload:{
            formData:formData,
          },
        })

      }
    });
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  validateNickName = (rule, value, callback) => {
    if (value && value.length >0 && value.length<9) {
      callback();
    } else {
      callback(new Error('昵称长度1-8个汉字或字母'));
    }
  };

  validatePassword2=(rule, value, callback) => {
    if (value && value === this.state.password) {
      callback();
    } else {
      callback(new Error('两次密码输入不一致'));
    }
  };

  validatePassword=(rule, value, callback) => {
    if (value && value.match("^[0-9a-zA-Z]{6,12}$")) {//包含字母和数字 6至12位
      callback();
    } else {
      callback(new Error('包含字母和数字,长度6至12位'));
    }
  };

  validatePhoneNumber=(rule, value, callback) => {
    if (value && value.match("^((\\+86)|(86))?(13)\\d{9}$")) {
      callback();
    } else {
      callback(new Error('手机号格式不正确'));
    }
  };

  handleStatePassword=value=>{
    this.setState({
      password:value,
    })
  };

  goBackToHistory=()=>{
    window.history.go(-1);
  };


  render(){

    const { getFieldProps, getFieldError } = this.props.form;

    const genderData=[
      {
        value:0,
        label:'女'
      },
      {
        value:1,
        label:'男'
      },
    ];

    return(
      <form>
        <NavBar
          mode="dark"
          leftContent="返回"
          onLeftClick={this.goBackToHistory}
          rightContent={[

          ]}
        >注册</NavBar>
        <List>
          <InputItem
            {...getFieldProps('nickname', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '昵称不能为空' },
                { validator:this.validateNickName },
              ],
            })}
            clear
            error={!!getFieldError('nickname')}
            onErrorClick={() => {
              Toast.fail(getFieldError('nickname').join("且"));
            }}
            // placeholder="please input account"
          >昵称</InputItem>

          <Picker data={genderData}
                  cols={1}
                  {...getFieldProps('gender',{initialValue:[1]})}
               >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>



          <DatePicker
            mode="date"
            value={this.state.date}
            minDate={new Date(1919,1,1)}
            maxDate={new Date(2060,1,1)}
            onChange={date => this.setState({ date })}
            {...getFieldProps('birth',{
              initialValue: this.state.date,
            })}
          >
            <List.Item arrow="horizontal">出生日期</List.Item>
          </DatePicker>

          <InputItem {...getFieldProps('password', {
            // initialValue: 'little ant',
            rules: [
              { required: true, message: '密码不能为空' },
              { validator: this.validatePassword },
            ],})} type="password" onBlur={value=>this.handleStatePassword(value)} clear
                     error={!!getFieldError('password')}
                     onErrorClick={() => {
                       Toast.fail(getFieldError('password').join("且"));}}>
            密码
          </InputItem>
          <InputItem {...getFieldProps('pwd', {
            // initialValue: 'little ant',
            rules: [
              { required: true, message: '确认密码不能为空' },
              { validator: this.validatePassword2 },
            ],})} type="password" clear
                     error={!!getFieldError('pwd')}
                     onErrorClick={() => {
                       Toast.fail(getFieldError('pwd').join("且"));}}>
            确认密码
          </InputItem>
          <InputItem {...getFieldProps('phoneNumber',{
            // initialValue: 'little ant',
            rules: [
          { required: true, message: '手机号不能为空' },
          { validator: this.validatePhoneNumber },
            ],})}  clear
                  error={!!getFieldError('phoneNumber')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('phoneNumber').join("且"));}} >
            手机号
          </InputItem>

        </List>
        <WhiteSpace/>
        <Item style={{marginLeft:"30%"}}>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>注册</Button>
          <Button size="small" inline style={{ marginLeft: '20px' }} onClick={this.onReset}>重置</Button>
        </Item>
      </form>
    )
  }

}

const Register = createForm()(RegisterWrapper);
export default Register


