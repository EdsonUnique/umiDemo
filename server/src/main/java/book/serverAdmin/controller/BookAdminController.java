package book.serverAdmin.controller;


import book.core.RestVO;
import book.core.RestWrapper;
import book.serverAdmin.model.BookAdminModel;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/book")
public class BookAdminController {

    @Autowired
    private BookServiceAdmin bookServiceAdmin;

    @GetMapping("/fetchBookList")
    public RestVO fetchBookList(@RequestParam(value="pagenum",required=false,defaultValue = "0")int pagenum
            ,@RequestParam(value="pagesize",required=false,defaultValue = "10")int pagesize){

        PageInfo<BookAdminModel> data=bookServiceAdmin.fetchBookModelList(pagenum,pagesize);
        return RestWrapper.success(data);
    }

    @PostMapping("/addBook")
    public RestVO addBook(@RequestBody BookAdminModel bookModel){

        System.out.println(bookModel);
        return null;
    }


}
