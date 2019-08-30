package book.serverAdmin.modelMapper;

import book.serverAdmin.model.BookAdminModel;
import com.github.pagehelper.Page;

public interface BookModelAdminMapper {

    Page<BookAdminModel> fetchBookModelList();

}
