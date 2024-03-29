package book.serverMobile.controller;


import book.core.RestVO;
import book.core.RestWrapper;
import book.serverMobile.constants.GlobalConstant;
import book.entity.Tag;
import book.entity.User;
import book.serverMobile.model.BookModel;
import book.serverMobile.service.BookService;
import book.serverMobile.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private TagService tagService;

    @GetMapping("/fetchBookList")
    public RestVO fetchBookList(){

        List<BookModel> data=bookService.fetchBookList();
        return RestWrapper.success(data);
    }

    @GetMapping("/fetchTagList")
    public RestVO fetchTagList(){
        List<Tag> data=tagService.fetchTagList();
        return RestWrapper.success(data);
    }

    @GetMapping("/fetchListByTagId")
    public RestVO fetchListByTagId(@RequestParam("id") int tagId){

        List<BookModel> data=bookService.fetchListByTagId(tagId);
        return RestWrapper.success(data);

    }

    /**
     * 根据书名和作者名查询
     * @param
     * @return
     */
    @GetMapping("/fetchListByNameAndAuthor")
    public RestVO fetchListByNameAndAuthor(@RequestParam("queryString") String queryString){

        List<BookModel> data=bookService.fetchListByNameAndAuthor(queryString);
        return RestWrapper.success(data);

    }

    @GetMapping("/fetchMyShelf")
    public RestVO fetchMyShelf(HttpSession httpSession){

        User user=(User)httpSession.getAttribute(GlobalConstant.HTTPSESSION_USER_KEY);
        if(null==user){
            return RestWrapper.error("用户未登录");
        }

        List<BookModel> data=bookService.fetchMyShelf(user.getId());
        return RestWrapper.success(data);
    }

    @GetMapping("/fetchMyViews")
    public RestVO fetchMyViews(HttpSession httpSession){

        User user=(User)httpSession.getAttribute(GlobalConstant.HTTPSESSION_USER_KEY);
        if(null==user){
            return RestWrapper.error("用户未登录");
        }

        List<BookModel> data=bookService.fetchMyViews(user.getId());
        return RestWrapper.success(data);
    }



}
