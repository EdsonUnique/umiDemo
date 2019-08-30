import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout/lib/index';
import {Pagination, Table} from 'antd';
import styles from './style.less';
import { connect } from 'dva';
import GlobalEnum from "../../utils/GlobalEnum";

@connect(({ book }) => ({
  book,
}))
class ViewBooks extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'book/fetchBookList',
      payload: {
        pagenum: 0,
        pagesize: GlobalEnum.pagesize,
      },
    })
  }

  handleChangePage=(pagenum, pagesize) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'book/fetchBookList',
      payload: {
        pagenum: pagenum,
        pagesize: GlobalEnum.pagesize,
      },
    })
  };

  render() {
    const {
      book:{
        bookList,
        pageInfo,
      },
    }=this.props;

    const columns=[
      {
        title: '书名',
        dataIndex: 'bookName',
        key: 'bookName',
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '所属分类',
        dataIndex: 'tagName',
        key: 'tagId',
      },
      {
        title: '出版商',
        dataIndex: 'publisher',
        key: 'publisher',

      },
      {
        title: '出版日期',
        dataIndex: 'publishDate',
        key: 'publishDate',

      },
      {
        title: '简介',
        dataIndex: 'description',
        key: 'description',
        render:(text)=>{
          return (text!==undefined && text!==null && text.length>6)?text.substr(0,6)+"...":text;
        }

      },
      {
        title: '文本内容',
        dataIndex: 'content',
        key: 'content',
        render:(text)=>{
          return (text!==undefined && text!==null && text.length>6)?text.substr(0,6)+"...":text;
        }

      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        colspan:'2',

      },
    ];

    const pagination={
      total:pageInfo.total,
      defaultCurrent:pageInfo.pagenum,
      pageSize:GlobalEnum.pagesize,
      onChange:(pagenum,pagesize)=>this.handleChangePage(pagenum,pagesize),
    };



    return (
      <PageHeaderWrapper>
        <Table className={styles.ETable} bordered={true} columns={columns} dataSource={bookList} pagination={pagination}/>
      </PageHeaderWrapper>
    );
  }
}

export default ViewBooks;
