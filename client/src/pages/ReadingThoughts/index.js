import React ,{Component} from 'react'
import {connect} from 'dva';
import { Card, Icon, NavBar, Popover, WhiteSpace } from 'antd-mobile';
import styles from '@/pages/ViewBook/index.less';
import moment from 'moment';
import router from 'umi/router'

@connect(({readingThoughts})=>({
  readingThoughts,
}))
class ReadingThoughtsWrapper extends Component{

  constructor(props){
    super(props);
    this.state={

    };
  };

  handleEmptyThoughts=myShelf=>{
    if(myShelf!=undefined && myShelf.length<=0){
      return (
        <div align={"center"}>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          @^@……空空如也~~~~
        </div>
      )
    }
  };



  render() {

    const {
        readingThoughts:{
          bookReadingThoughtsList,
      }
    }=this.props;

    return (
        <div>
          <NavBar
            mode="dark"
            leftContent="返回"
            onLeftClick={()=>{router.goBack()}}
            rightContent={[

            ]}
            rightContent={[<div>我的评论</div>]}
          >书评</NavBar>

          {
            this.handleEmptyThoughts(bookReadingThoughtsList)
          }

          {
            bookReadingThoughtsList!=undefined && bookReadingThoughtsList.length>0 && bookReadingThoughtsList.map(item=>{

              return(
                <Card>
                  <Card.Header
                    title={item.nickname}
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<span>{moment(item.createTime).format("YYYY-MM-DD HH:MM")}</span>}
                  />
                  <Card.Body>
                    <div>{item.contentViews}</div>
                  </Card.Body>
                  {/*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*/}
                </Card>
              )
            })
          }


        </div>
    );
  }


}

export default ReadingThoughtsWrapper

