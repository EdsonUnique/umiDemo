package book.serverAdmin.controller;


import book.core.RestVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController("/admin/book")
public class BookController {

    @GetMapping("/fetchBookList")
    public RestVO fetchBookList(){

        
        return null;
    }


}
