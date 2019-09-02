package book.serverAdmin.service.impl;

import book.entityMapper.BookMapper;
import book.exceptions.MyException;
import book.serverAdmin.model.BookAdminModel;
import book.serverAdmin.modelMapper.BookModelAdminMapper;
import book.serverAdmin.service.BookServiceAdmin;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class BookServiceAdminImpl implements BookServiceAdmin {

    @Autowired
    private BookModelAdminMapper bookModelMapper;
    @Autowired
    private BookMapper bookMapper;

    @Override
    public PageInfo<BookAdminModel> fetchBookModelList(int pagenum, int pagesize) {

//        PageHelper.startPage(pagenum,pagesize);
//        Page<BookAdminModel> pages=bookModelMapper.fetchBookModelList();
        Page<BookAdminModel> pages = PageHelper.startPage(pagenum, pagesize).doSelectPage(()-> bookModelMapper.fetchBookModelList());

        return pages.toPageInfo();
    }

    @Override
    @Transactional
    public void addBook(BookAdminModel bookAdminModel) throws Exception{

        if(null==bookAdminModel.getFilePath()){
            throw new MyException("文件未上传！");
        }

        bookAdminModel.setId(UUID.randomUUID().toString());
        bookAdminModel.setCreateTime(LocalDateTime.now());
        bookAdminModel.setUpdateTime(LocalDateTime.now());

        int effectRow=bookMapper.insert(bookAdminModel);
        if(effectRow<=0){
            throw new MyException("添加失败！");
        }

    }




}
