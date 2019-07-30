package book.server.service;

import book.server.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User fetchUserByAccountAndPwd(Integer account,String pwd);


}
