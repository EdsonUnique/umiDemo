package book.serverMobile.service;

import book.exceptions.MyException;
import book.entity.User;
import book.serverMobile.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User fetchUserByPhoneAndPwd(UserModel userModel);

    void save(UserModel userModel) throws MyException;


}
