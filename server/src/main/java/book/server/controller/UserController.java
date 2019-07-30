package book.server.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.server.entity.User;
import book.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public RestVO login(@RequestParam( "account") Integer account
                        ,@RequestParam("pwd") String pwd){

        User user=userService.fetchUserByAccountAndPwd(account,pwd);
        if(null==user){
            return RestWrapper.error();
        }

        return RestWrapper.success(user);
    }


}
