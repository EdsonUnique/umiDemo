package book.serverAdmin.service.impl;

import book.serverAdmin.model.BookModel;
import book.serverAdmin.modelMapper.BookModelAdminMapper;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceAdminImpl implements BookServiceAdmin {

    @Autowired
    private BookModelAdminMapper bookModelMapper;

    @Override
    public Page<BookModel> fetchBookModelList(int pagenum,int pagesize) {

        PageHelper.startPage(pagenum,pagesize);
        List<BookModel> pages=bookModelMapper.fetchBookModelList();
        return (Page<BookModel>)pages;
    }
}
