package book.server.service.impl;


import book.exceptions.MyException;
import book.server.entity.UserFocusBook;
import book.server.entityMapper.UserFocusBookMapper;
import book.server.service.UserFocusBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserFocusBookServiceImpl implements UserFocusBookService {

    @Autowired
    private UserFocusBookMapper userFocusBookMapper;

    @Override
    @Transactional
    public UserFocusBook addToShelf(String userId, String bookId) throws MyException {

        UserFocusBook userFocusBook=new UserFocusBook();
        userFocusBook.setId(UUID.randomUUID().toString());
        userFocusBook.setBookId(bookId);
        userFocusBook.setUserId(userId);
        userFocusBook.setCreateTime(LocalDateTime.now());

        int effectRow=userFocusBookMapper.insert(userFocusBook);
        if(effectRow==0){
            throw new MyException("添加到书架失败！");
        }

        return userFocusBook;
    }

    //TODO 判断是否已添加
    //public UserFocusBookModel

}
