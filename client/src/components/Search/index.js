import React,{Component} from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './index.less'
import {connect} from 'dva';

@connect(({book})=>({
  book,
}))
class Search extends Component{

  handleSubmit=(value)=>{
    const {dispatch}=this.props;

    dispatch({
      type:"book/search",
      payload:{
        queryString:value,
      },
    })
  };

  render() {
    return (<div className={styles.search}>

      <SearchBar placeholder="输入书名或作者" maxLength={20} onSubmit={(value)=>this.handleSubmit(value)}/>

    </div>);
  }

}

export default Search

