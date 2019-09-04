import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout/lib/index';
import {Button, Divider, Table,Modal} from 'antd';
import styles from './style.less';
import { connect } from 'dva';
import GlobalEnum from "../../utils/GlobalEnum";


const { confirm } = Modal;



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

  handleFile=text=>{

    window.open(GlobalEnum.location+`/admin/book/fetchBookFile?filePath=`+encodeURI(text),"_self")


  };

  showDeleteConfirm=(id)=> {
    const {dispatch}=this.props;

    confirm({
      title: '提示',
      content: '确定删除这条记录？',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {


        dispatch({
          type:'book/deleteBook',
          payload:{
            id:id,
          }
        });

      },
      onCancel() {

      },
    });
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
        title: '文本阅读',
        dataIndex: 'filePath',
        key: 'filePath',
        render:(text)=>{
          return (
            <div >
              <Button type={"primary"} shape="round" icon="download" size={"small"} onClick={()=>this.handleFile(text)}>下载</Button>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        colspan:'2',
        render:(text,record)=>{
          //console.log("each:"+JSON.stringify(record))
          return (
            <div>
              <a >编辑</a>
              <Divider type="vertical"/>
              <a onClick={()=>this.showDeleteConfirm(record.id)}>删除</a>
            </div>
          )
        }

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
