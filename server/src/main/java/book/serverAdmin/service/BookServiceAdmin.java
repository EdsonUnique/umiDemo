package book.serverAdmin.service;

import book.serverAdmin.model.BookAdminModel;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

@Service
public interface BookServiceAdmin {

    PageInfo<BookAdminModel> fetchBookModelList(int pagenum, int pagesize);

    void addBook(BookAdminModel bookAdminModel) throws Exception;

    void deleteBook(String bookId) throws Exception;

}
