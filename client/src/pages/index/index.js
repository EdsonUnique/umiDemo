import Search from '@/components/Search';
import React,{Component} from 'react';
import Condition from '@/components/Condition';
import { NoticeBar,NavBar} from 'antd-mobile';
import BookItem from '@/components/BookItem';
import {Button} from 'antd-mobile'
import { connect } from 'react-redux';

@connect(({ book }) => ({
  book,
}))
class IndexPage extends Component{

  constructor(props){
    super(props)
    this.state={
    }
  }

  componentDidMount(){
    const {dispatch}=this.props

    dispatch({
      type:"book/initIndexPage"
    })
  }



  render(){

    const {
      book:{
        bookList:bookList,
        tagList:tagList,
      },
    }=this.props

    return (
      <div>
        <NavBar
          mode="dark"
        >书同友</NavBar>
        <Search/>
        <Condition data={tagList}/>
        <NoticeBar mode="link" action={<span>去看看</span>}  marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          新书上架：《红楼梦》、《三国演义》、《文心雕龙》、《活着》、《平凡的世界》
        </NoticeBar>
        <NoticeBar mode="link" action={<span>去看看</span>}  marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          好友分享：时光机、信息爆炸、梦龙、大海、励志、打得开、点击、出的长度、打开
        </NoticeBar>
          {
           bookList!=undefined && bookList.length>0 && bookList.map(item=>{
              return <BookItem key={item.id} data={item} />
            })
          }
      </div>
    )
  }

}

export default IndexPage
