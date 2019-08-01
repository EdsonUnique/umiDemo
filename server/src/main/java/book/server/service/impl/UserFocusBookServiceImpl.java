package book.server.service.impl;


import book.exceptions.MyException;
import book.server.entity.UserFocusBook;
import book.server.entityMapper.UserFocusBookMapper;
import book.server.service.UserFocusBookService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class UserFocusBookServiceImpl implements UserFocusBookService {

    @Autowired
    private UserFocusBookMapper userFocusBookMapper;

    @Override
    @Transactional
    public UserFocusBook addToShelf(String userId, String bookId) throws MyException {

        //判断是否已添加到书架
        UserFocusBook tmp=findByUserIDAndBookId(userId,bookId);
        if(null!=tmp){
            throw new MyException("已添加到书架");
        }

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

    public UserFocusBook findByUserIDAndBookId(String userId,String bookId){

        LambdaQueryWrapper<UserFocusBook> qw= Wrappers.<UserFocusBook>lambdaQuery();
        qw.eq(!isBlank(userId),UserFocusBook::getUserId,userId)
                .eq(!isBlank(bookId),UserFocusBook::getBookId,bookId);

        return userFocusBookMapper.selectOne(qw);

    }

}
