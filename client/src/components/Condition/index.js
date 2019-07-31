import styles from './index.less';
import React,{Component} from 'react'
import { Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router'

const operation = Modal.operation;

@connect(({book})=>({
  book
}))
class Condition extends Component{

  handleCondition=(id)=>{
    const {dispatch}=this.props;

    dispatch({
      type:'book/fetchListByTagId',
      payload:{
        id:id,
      }
    })

  };

  handleConditionAll=()=>{
    const {dispatch}=this.props;
    dispatch({
      type:"book/initIndexPage"
    })
  };

  render() {

    const {
      data:tagList
    }=this.props;

    return(

      <div className={styles.wrap}>
        <div key={tagList?tagList.length+1:""} onClick={()=>this.handleConditionAll()}>
          全部
        </div>
        {
          tagList!=undefined && tagList.length>0 && tagList.map((item)=>{
            return (
              <div onClick={()=>this.handleCondition(item.id)} key={item.id}>
                {item.name}
              </div>
            )
          })
        }
      </div>


    )
  }

}

export default Condition;
