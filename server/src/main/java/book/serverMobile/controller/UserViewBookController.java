package book.serverMobile.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.serverMobile.constants.GlobalConstant;
import book.entity.User;
import book.serverMobile.service.UserViewBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/userCenter")
public class UserViewBookController {

    @Autowired
    private UserViewBookService userViewBookService;

    @GetMapping("/recordViews/{id}")
    public RestVO recordViews(@PathVariable("id") String bookId, HttpSession httpSession){

        User user=(User) httpSession.getAttribute(GlobalConstant.HTTPSESSION_USER_KEY);

        if(null==user){
            return RestWrapper.error("用户未登录");
        }

        try{

            userViewBookService.recordViews(bookId,user.getId());
            return RestWrapper.success();
        }catch(Exception e){
            System.err.println(e.getMessage());
            return RestWrapper.error(e.getMessage());
        }

    }


}
