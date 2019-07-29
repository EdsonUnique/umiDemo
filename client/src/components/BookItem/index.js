import styles from './index.less';
import React,{Component} from 'react'
import {Icon} from 'antd'
import moment from 'moment'
import router from 'umi/router';

import { Tag } from 'antd-mobile';

class BookItem extends Component{

  ViewBook=(item)=>{
    router.push({
      pathname:"/ViewBook",
      query:{
        payload:item,
      }
    })
  };

  render() {

    const {
      data:item,
    }=this.props

    return(

      <div className={styles.wrap} onClick={()=>this.ViewBook(item)}>
        <div className={styles.book_image}>
          <Icon type="book" theme="twoTone"  style={{fontSize:'100px'}}/>
        </div>
        <div className={styles.description}>
          <div>书名：《{item.bookName}》</div>
          <div>作者：{item.author}</div>
          <div>出版社：{item.publisher}</div>
          <div>出版日期：{moment(item.publishDate).format("YYYY-MM-DD")}</div>
          <div>简介：{item.description.length>12?item.description.substr(0,12)+"......":item.description}</div>
          <div>标签：<Tag data-seed="logId">{item.tagName}</Tag>
          </div>
        </div>
      </div>


    )
  }

}

export default BookItem;
