package book.server.controller;


import book.core.RestVO;
import book.core.RestWrapper;
import book.server.entity.Tag;
import book.server.model.BookModel;
import book.server.model.TagModel;
import book.server.service.BookService;
import book.server.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


}
