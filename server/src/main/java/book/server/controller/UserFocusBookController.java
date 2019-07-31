package book.server.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.exceptions.MyException;
import book.server.constants.GlobalConstant;
import book.server.entity.User;
import book.server.entity.UserFocusBook;
import book.server.service.UserFocusBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/book")
public class UserFocusBookController {

    @Autowired
    private UserFocusBookService userFocusBookService;

    /**
     * 添加到书架
     * @param bookId
     * @return
     */
    @GetMapping("/addToShelf/{id}")
    public RestVO addToShelf(@PathVariable("id") String bookId, HttpSession httpSession){

        User user=(User) httpSession.getAttribute(GlobalConstant.HTTPSESSION_USER_KEY);
        if(null==user){
            return RestWrapper.error("用户未登录！");
        }

        try{
            UserFocusBook data=userFocusBookService.addToShelf(user.getId(),bookId);
            return RestWrapper.success("添加成功！",data);
        }catch (Exception e){
            e.printStackTrace();
            return RestWrapper.error(e.getMessage());
        }

    }
}
