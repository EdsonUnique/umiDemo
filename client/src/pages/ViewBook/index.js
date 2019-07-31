import React,{Component} from 'react'
import { NavBar, Icon,Popover } from 'antd-mobile';
import router from 'umi/router'
import styles from './index.less'
import { connect } from 'dva';

const Item = Popover.Item;
@connect(({book})=>({
  book,
}))
class ViewBook extends Component{

  state = {
    visible: false,
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);

    const {dispatch}=this.props;

    this.setState({
      visible: false,
    });

    dispatch({
      type:"book/addToShelf",
      payload:{
        id:opt.props.value,
      }
    })

  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

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
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value={item.id} data-seed="logId">添加到书架</Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
           >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>}
        >{item.bookName}</NavBar>
        <div className={styles.bookContent}>
          {item.content}
        </div>
      </div>
    )
  }

}

export default ViewBook
