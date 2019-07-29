import React,{Component} from 'react'
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router'
import styles from './index.less'


class ViewBook extends Component{

  goBackToIndex=()=>{
    router.push("/")
  };

  render(){


    const {
      payload:item,
    }=this.props.location.query;

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.goBackToIndex}
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >{item.bookName}</NavBar>
        <div className={styles.bookContent}>
          {item.content}
        </div>
      </div>
    )
  }

}

export default ViewBook
