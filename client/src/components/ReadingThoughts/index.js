import React, { Component } from 'react';
import SuspendButton from 'suspend-button'
import logo from '../../assets/imgs/button.png'
import { Modal,TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva'

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

@connect(({readingThoughts})=>({
  readingThoughts
}))
class ReadingThoughtsWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    };
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  onClose = (key,type) => () => {
    this.setState({
      [key]: false,
    });

    if(type==1){//完成
      const {dispatch}=this.props;
      let formData=this.props.form.getFieldsValue();
      let bookId=this.props.bookId;

      dispatch({
        type:'readingThoughts/addThoughts',
        payload:{
          contentViews:formData.contentViews,
          bookId:bookId,
        }
      })
    }



  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };


  render() {

    const { getFieldProps } = this.props.form;


    return (
      <div>
        <div onClick={this.showModal('modal1')}>

          <SuspendButton img={logo} style={{height:"48px",width:"48px"}}>

          </SuspendButton>

        </div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          footer={[{ text: '取消', onPress: () => { this.onClose('modal1',0)(); } },
            { text: '完成', onPress: () => { this.onClose('modal1',1)(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            <TextareaItem
              {...getFieldProps('contentViews', {
                initialValue: '写下你的感想......',
              })}
              rows={20}
              count={400}
            />
          </div>
        </Modal>
      </div>
    );
  }

}

const ReadingThoughts = createForm()(ReadingThoughtsWrapper);


export default ReadingThoughts
