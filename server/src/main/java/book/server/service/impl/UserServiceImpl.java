package book.server.service.impl;

import book.server.entity.User;
import book.server.entityMapper.UserMapper;
import book.server.model.UserModel;
import book.server.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNull;
import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User fetchUserByAccountAndPwd(UserModel userModel) {

        LambdaQueryWrapper<User> qw= Wrappers.<User>lambdaQuery();
        qw.eq(!isNull(userModel.getAccount()),User::getAccount,userModel.getAccount())
            .eq(!isBlank(userModel.getPwd()),User::getPwd,userModel.getPwd());

        return userMapper.selectOne(qw);
    }
}
