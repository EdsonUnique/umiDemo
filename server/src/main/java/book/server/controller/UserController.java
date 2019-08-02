package book.server.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.exceptions.MyException;
import book.server.constants.GlobalConstant;
import book.server.entity.User;
import book.server.entity.UserFocusBook;
import book.server.model.UserModel;
import book.server.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public RestVO login(@RequestBody UserModel userModel, HttpSession httpSession){

        User user=userService.fetchUserByPhoneAndPwd(userModel);
        if(null==user){
            return RestWrapper.error("用户不存在！");
        }
        httpSession.setAttribute(GlobalConstant.HTTPSESSION_USER_KEY,user);
        BeanUtils.copyProperties(user,userModel);

        return RestWrapper.success(userModel);
    }

    @PostMapping("/register")
    public RestVO register(@RequestBody UserModel userModel){

        try{

            userService.save(userModel);

        }catch (Exception e){
            System.err.println(e.getMessage());
            return RestWrapper.error(e.getMessage());
        }

        return RestWrapper.success("注册成功！",null);
    }


}
