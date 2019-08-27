package book.serverAdmin.modelMapper;

import book.serverAdmin.model.BookModel;
import com.github.pagehelper.Page;

import java.util.List;

public interface BookModelAdminMapper {

    List<BookModel> fetchBookModelList();

}
