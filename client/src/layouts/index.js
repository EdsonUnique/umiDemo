import FullScreenLayout from '@/layouts/FullScreenLayout';
import BasicLayout from '@/layouts/BasicLayout';

export default function(props) {

  switch (props.location.pathname) {
    case '/ViewBook':{
      return <FullScreenLayout>{props.children}</FullScreenLayout>
    }
    case '/Login':{
      return <FullScreenLayout>{props.children}</FullScreenLayout>
    }
    case '/Register':{
      return <FullScreenLayout>{props.children}</FullScreenLayout>
    }
    default:{
      return <BasicLayout>{props.children}</BasicLayout>
    }
  }

}
