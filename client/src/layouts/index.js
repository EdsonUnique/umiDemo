import FullScreenLayout from '@/layouts/FullScreenLayout';
import BasicLayout from '@/layouts/BasicLayout';

export default function(props) {
  if(props.location.pathname==='/ViewBook'){
    return <FullScreenLayout>{props.children}</FullScreenLayout>
  }else {
    return <BasicLayout>{props.children}</BasicLayout>
  }
}
