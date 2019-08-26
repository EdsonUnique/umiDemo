package book.server.service;

import book.exceptions.MyException;
import book.server.entity.User;
import book.server.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User fetchUserByPhoneAndPwd(UserModel userModel);

    void save(UserModel userModel) throws MyException;


}
