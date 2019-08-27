package book.serverAdmin.service;

import book.serverAdmin.model.BookModel;
import com.github.pagehelper.Page;
import org.springframework.stereotype.Service;

@Service
public interface BookServiceAdmin {

    Page<BookModel> fetchBookModelList(int pagenum,int pagesize);

}
