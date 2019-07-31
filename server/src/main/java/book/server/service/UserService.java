package book.server.service;

import book.server.entity.User;
import book.server.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User fetchUserByAccountAndPwd(UserModel userModel);


}
