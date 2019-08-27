package book.serverAdmin.controller;


import book.core.RestVO;
import book.core.RestWrapper;
import book.serverAdmin.model.BookModel;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController("/admin/book")
public class BookController {

    @Autowired
    private BookServiceAdmin bookServiceAdmin;

    @GetMapping("/fetchBookList")
    public RestVO fetchBookList(@RequestParam(value="pagenum",required=false,defaultValue = "0")int pagenum
            ,@RequestParam(value="pagesize",required=false,defaultValue = "10")int pagesize){

        Page<BookModel> data=bookServiceAdmin.fetchBookModelList(pagenum,pagesize);
        return RestWrapper.success(data);
    }

    @PostMapping("/addBook")
    public RestVO addBook(){


        return null;
    }


}
