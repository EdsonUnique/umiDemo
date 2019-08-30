package book.serverAdmin.service.impl;

import book.serverAdmin.model.BookAdminModel;
import book.serverAdmin.modelMapper.BookModelAdminMapper;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceAdminImpl implements BookServiceAdmin {

    @Autowired
    private BookModelAdminMapper bookModelMapper;

    @Override
    public PageInfo<BookAdminModel> fetchBookModelList(int pagenum, int pagesize) {

//        PageHelper.startPage(pagenum,pagesize);
//        Page<BookAdminModel> pages=bookModelMapper.fetchBookModelList();
        Page<BookAdminModel> pages = PageHelper.startPage(pagenum, pagesize).doSelectPage(()-> bookModelMapper.fetchBookModelList());

        return pages.toPageInfo();
    }
}
