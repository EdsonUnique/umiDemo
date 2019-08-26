package book.server.service.impl;

import book.exceptions.MyException;
import book.server.entity.UserViewBook;
import book.server.entityMapper.UserViewBookMapper;
import book.server.service.UserViewBookService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class UserViewBookImpl implements UserViewBookService {

    @Autowired
    private UserViewBookMapper userViewBookMapper;

    @Override
    @Transactional
    public void recordViews(String bookId, String userId) throws MyException {

        UserViewBook userViewBook=null;
        int effectRow;

        //判断是否已浏览，若已浏览则修改更新时间
        userViewBook=fetchByBookIdAndUserId(bookId,userId);
        if(null!=userViewBook){
            userViewBook.setUpdateTime(LocalDateTime.now());
            effectRow=userViewBookMapper.updateById(userViewBook);

            if(effectRow<=0){
                throw new MyException("操作失败！");
            }

            return;
        }

        //若是第一次浏览则修改创建时间和更新时间并保存

        userViewBook=new UserViewBook();

        userViewBook.setId(UUID.randomUUID().toString());
        userViewBook.setBookId(bookId);
        userViewBook.setUserId(userId);
        userViewBook.setCreateTime(LocalDateTime.now());
        userViewBook.setUpdateTime(userViewBook.getCreateTime());

        effectRow=userViewBookMapper.insert(userViewBook);
        if(effectRow<=0){
            throw new MyException("操作失败！");
        }

    }


    UserViewBook fetchByBookIdAndUserId(String bookId,String userId){

        LambdaQueryWrapper<UserViewBook> qw= Wrappers.lambdaQuery();

        qw.eq(!isBlank(bookId),UserViewBook::getBookId,bookId)
                .eq(!isBlank(userId),UserViewBook::getUserId,userId);

        return userViewBookMapper.selectOne(qw);

    }


}
