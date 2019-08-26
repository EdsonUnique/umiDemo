import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout/lib/index';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete, Upload,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const {TextArea}=Input;

class AddBook extends Component {

  state = {

  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset=()=>{
    this.props.form.resetFields();
  }

  render() {

    const { getFieldDecorator } = this.props.form;

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
          <Form {...formItemLayout} onSubmit={this.handleSubmit} onReset={this.handleReset}>
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
              {getFieldDecorator('tag', {
                rules: [{ required: true, message: '标签不能为空!' }],
              })(

                <Select>
                  <option key={1}>现代文学</option>
                  <option key={2}>古代文学</option>
                  <option key={3}>外国文学</option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="文本上传">
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '文本不能为空!' }],
              })(

                <Upload>
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
