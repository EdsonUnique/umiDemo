import styles from './index.less';
import React,{Component} from 'react'


class FullScreenLayout extends Component{

  render() {

    return(
      <div>
          {this.props.children}
      </div>


    )
  }

}

export default FullScreenLayout;
