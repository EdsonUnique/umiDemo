import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout/lib/index';
import {Table} from 'antd';
import styles from './style.less';

class ViewBooks extends Component {


  handleChangePage=(pagenum,pagesize)=>{
    alert(pagenum);
  };

  render() {

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

      },
      {
        title: '文本内容',
        dataIndex: 'content',
        key: 'content',

      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        colspan:'2',

      },
    ];

    const data=[
      {
        key:1,
        bookName:'shuhd',
      },
      {
        key:2,
        bookName:'shuews23hd',
      },
    ];

    const pagination={
      total:100,
      defaultPageSize:10,
      onChange:(pagenum,pagesize)=>this.handleChangePage(pagenum,pagesize),
    };



    return (
      <PageHeaderWrapper>
        <Table className={styles.ETable} bordered={true} columns={columns} dataSource={data} pagination={pagination}/>
      </PageHeaderWrapper>
    );
  }
}

export default ViewBooks;
