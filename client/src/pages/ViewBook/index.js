import React,{Component} from 'react'
import { NavBar, Icon,Popover } from 'antd-mobile';
import router from 'umi/router'
import styles from './index.less'
import { connect } from 'dva';
import ReadingThoughts from '@/components/ReadingThoughts';

const Item = Popover.Item;
@connect(({viewBook,readingThoughts})=>({
  viewBook,readingThoughts,
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


    if(opt.props.namekey==1){
      dispatch({
        type:"viewBook/addToShelf",
        payload:{
          id:opt.props.value,
        }
      })
    }else if(opt.props.namekey==2){
      //查看评论
      dispatch({
        type:"readingThoughts/fetchBookThoughts",
        payload:{
          id:opt.props.value,
          item:this.props.location.query.payload,
        }
      })
    }

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
                (<Item key="1" value={item.id} namekey="1" data-seed="logId">添加到书架</Item>),
                (<Item key="2" value={item.id} namekey="2">查看评论</Item>),
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

        <ReadingThoughts bookId={item.id}/>
      </div>
    )
  }

}

export default ViewBook
