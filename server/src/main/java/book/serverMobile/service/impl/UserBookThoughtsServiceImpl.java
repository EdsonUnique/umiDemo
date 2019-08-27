package book.serverMobile.service.impl;

import book.exceptions.MyException;
import book.entity.UserBookThoughts;
import book.entityMapper.UserBookThoughtsMapper;
import book.serverMobile.model.UserBookThoughtsModel;
import book.serverMobile.modelMapper.UserBookThoughtsModelMapper;
import book.serverMobile.service.UserBookThoughtsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserBookThoughtsServiceImpl implements UserBookThoughtsService {


    @Autowired
    private UserBookThoughtsMapper userBookThoughtsMapper;
    @Autowired
    private UserBookThoughtsModelMapper userBookThoughtsModelMapper;

    @Override
    @Transactional
    public void addThoughts(UserBookThoughts userBookThoughts, String userId) throws MyException {

        userBookThoughts.setId(UUID.randomUUID().toString());
        userBookThoughts.setUserId(userId);
        userBookThoughts.setCreateTime(LocalDateTime.now());

        int effectRow=userBookThoughtsMapper.insert(userBookThoughts);
        if(effectRow<=0){
            throw new MyException("评论失败！");
        }

    }

    @Override
    public List<UserBookThoughtsModel> fetchBookThoughts(String bookId) {
        return userBookThoughtsModelMapper.fetchBookThoughts(bookId);
    }
}
