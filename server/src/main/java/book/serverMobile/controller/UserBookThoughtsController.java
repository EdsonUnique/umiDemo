package book.serverMobile.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.serverMobile.constants.GlobalConstant;
import book.entity.User;
import book.entity.UserBookThoughts;
import book.serverMobile.model.UserBookThoughtsModel;
import book.serverMobile.service.UserBookThoughtsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/book/thoughts")
public class UserBookThoughtsController {

    @Autowired
    private UserBookThoughtsService userBookThoughtsService;

    @PostMapping("/addThoughts")
    public RestVO addThoughts(@RequestBody UserBookThoughts userBookThoughts, HttpSession httpSession){

        User user=(User)httpSession.getAttribute(GlobalConstant.HTTPSESSION_USER_KEY);
        try{
            userBookThoughtsService.addThoughts(userBookThoughts,user.getId());
            return RestWrapper.success("评论成功！");
        }catch(Exception e){
            System.err.println(e.getMessage());
            return RestWrapper.error(e.getMessage());
        }

    }

    @GetMapping("/fetchBookThoughts/{id}")
    public RestVO fetchBookThoughts(@PathVariable("id")String bookId){
        try{

            List<UserBookThoughtsModel> data=userBookThoughtsService.fetchBookThoughts(bookId);
            return RestWrapper.success(data);
        }catch (Exception e){
            System.err.println(e.getMessage());
            return RestWrapper.error("获取失败！");
        }
    }




}
