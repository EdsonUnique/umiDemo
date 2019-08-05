import React,{Component} from 'react'
import {connect} from 'dva';
import { Card, NavBar ,WhiteSpace} from 'antd-mobile';
import moment from 'moment'
import router from 'umi/router';
import GlobalEnum from '@/utils/GlobalEnum';

@connect(({myViews})=>({
  myViews
}))
class MyViews extends Component{

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

    if(null!=sessionStorage.getItem(GlobalEnum.sessionUserKey)){
      //添加到我的浏览
      const {dispatch}=this.props;

      dispatch({
        type:"myViews/recordViews",
        payload:{
          id:item.id,
        }
      })
    }
  };

  handleEmptymyViewsList=myViewsList=>{
    if(myViewsList!=undefined && myViewsList.length<=0){
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
      myViews:{
        myViewsList:myViewsList,
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
        >我的浏览</NavBar>


        {
          this.handleEmptymyViewsList(myViewsList)
        }

        {
          myViewsList!=undefined && myViewsList.length>0 && myViewsList.map(item=>{

            return(
              <Card onClick={()=>this.ViewBook(item)} key={item.id}>
                <Card.Body>
                  <div>
                    <div>《 {item.bookName} 》

                    </div>
                  </div>

                  <div style={{marginLeft:"10%"}}>
                    {item.description.length>15?item.description.substr(0,15)+"......":item.description}
                  </div>
                </Card.Body>
                <Card.Footer content={<div>作者：{item.author}</div>} extra={<div>{moment(item.viewBookDate).format("YYYY-MM-DD HH:MM")}</div>} />
              </Card>
            )
          })
        }

      </div>
    )
  }


}

export default MyViews
