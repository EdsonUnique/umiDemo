import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout/lib/index';
import {
  Form,
  Input,
  Icon,
  Select,
  message,
  Button,
  AutoComplete, Upload,
} from 'antd';
import { connect } from "dva";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const {TextArea}=Input;
const props = {
  name: 'fileBook',
  action: 'http://localhost:10008/admin/book/uploadBook',
  // headers: {
  //   authorization: 'authorization-text',
  // },
  onChange(info) {

   if (info.file.status==="done") {
      if(info.file.response.code>0){
        message.success(`${info.file.name} 文件上传成功`);
      }else{
        message.error(`${info.file.name} 文件上传失败`);
      }

    }
  },
};

function beforeUpload(file) {
  const isRightFile = file.type === 'application/msword' || file.type==='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (!isRightFile) {
    message.error('请上传word类型文件!');
  }

  return isRightFile ;
}

@connect(({book})=>({
  book,
}))
class AddBook extends Component {

  constructor(props){
    super(props);
    this.state={

    };
  }

  componentDidMount() {
    //加载分类标签
    const {dispatch}=this.props;

    dispatch({

      type:'book/fetchTags',

    });

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      const {dispatch}=this.props;

      if (!err) {


        dispatch({
          type:'book/addBook',
          payload:values,
        });

      }
    });
  };

  handleReset=()=>{
    this.props.form.resetFields();
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const {
      book:{
        tags,
      }
    }=this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <PageHeaderWrapper>
        <div>
          <Form {...formItemLayout}  method={"post"} onSubmit={this.handleSubmit} onReset={this.handleReset} encType='multipart/form-data'>
            <Form.Item label="书名">
              {getFieldDecorator('bookName', {
                rules: [
                  {
                    required: true,
                    message: '书名不能为空！',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item
              label={
                <span>
              作者
            </span>
              }
            >
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '作者不能为空!', whitespace: true }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="出版商">
              {getFieldDecorator('publisher', {
                rules: [{ required: true, message: '出版商不能为空!' }],
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="出版日期">
              {getFieldDecorator('publishDate', {
                rules: [{ required: true, message: '出版日期不能为空!' }],
              })(

                  <Input type="date"/>
              )}
            </Form.Item>

            <Form.Item label="简介">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '简介不能为空!' }],
              })(


                <TextArea rows={2}/>

              )}
            </Form.Item>

            <Form.Item label="标签">
              {getFieldDecorator('tagId', {
                rules: [{ required: true, message: '标签不能为空!' }],
              })(

                //tags!==undefined && tags.length>0
                <Select>
                  {
                    tags!==undefined && tags.length>0 && tags.map((value,key)=>{

                      return <Option key={key} value={value.id}>{value.name}</Option>
                    })
                  }
                </Select>
              )}
            </Form.Item>

            <Form.Item label="文本上传">
              {getFieldDecorator('fileBook', {
                rules: [{ required: true, message: '文本不能为空!' }],
              })(

                <Upload {...props}
                        accept=".doc,.docx"
                        beforeUpload={beforeUpload}
                        multiple={false}
                >
                  <Button>
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>,
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                添加书籍
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="reset">
                重置
              </Button>
            </Form.Item>
          </Form>

        </div>
      </PageHeaderWrapper>
    );
  }
}
const AddBookForm = Form.create({ name: 'addBook' })(AddBook);
export default AddBookForm;



