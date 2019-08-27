package book.serverAdmin.service.impl;

import book.serverAdmin.model.BookModel;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.Page;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BookServiceImplTest {

    @Autowired
    private BookServiceAdmin bookService;

    @Test
    public void BookServiceImpl(){
        Page<BookModel> pages=bookService.fetchBookModelList(0,3);
        System.out.println(pages);
    }

}