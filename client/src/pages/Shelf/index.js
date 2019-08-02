import React,{Component} from 'react'
import {connect} from 'dva';
import { Card, NavBar ,WhiteSpace} from 'antd-mobile';
import moment from 'moment'
import router from 'umi/router';

@connect(({userCenter})=>({
  userCenter
}))
class Shelf extends Component{

  goBackToHistory=()=>{
    window.history.go(-1);
  };

  ViewBook=(item)=>{
    router.push({
      pathname:"/ViewBook",
      query:{
        payload:item,
      }
    })
  };

  handleEmptyShelf=myShelf=>{
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
  }

  render(){

    const {
      userCenter:{
        myShelf:myShelf,
      }
    }=this.props;

    return (
      <div>
        <NavBar
          mode="dark"
          leftContent="返回"
          onLeftClick={this.goBackToHistory}
          rightContent={[

          ]}
        >我的书架</NavBar>


        {
          this.handleEmptyShelf(myShelf)
        }

          {
            myShelf!=undefined && myShelf.length>0 && myShelf.map(item=>{

              return(
                <Card onClick={()=>this.ViewBook(item)} key={item.id}>
                  <Card.Body>
                    <div>《 {item.bookName} 》</div>
                    <div style={{marginLeft:"10%"}}>
                      {item.description.length>15?item.description.substr(0,15)+"......":item.description}
                    </div>
                  </Card.Body>
                  <Card.Footer content={<div>作者：{item.author}</div>} extra={<div>出版日期：{moment(item.publishDate).format("YYYY-MM-DD")}</div>} />
                </Card>
              )
            })
          }

      </div>
    )
  }


}

export default Shelf
