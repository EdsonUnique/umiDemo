package book.server.service.impl;

import book.exceptions.MyException;
import book.server.constants.GlobalConstant;
import book.server.entity.User;
import book.server.entityMapper.UserMapper;
import book.server.model.UserModel;
import book.server.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNull;
import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User fetchUserByPhoneAndPwd(UserModel userModel) {

        LambdaQueryWrapper<User> qw= Wrappers.<User>lambdaQuery();
        qw.eq(!isNull(userModel.getPhoneNumber()),User::getPhoneNumber,userModel.getPhoneNumber())
            .eq(!isBlank(userModel.getPwd()),User::getPwd,
                    Base64.getEncoder().encodeToString(
                            (GlobalConstant.PWD_PREFIX+userModel.getPwd()+GlobalConstant.PWD_SUBFIX)
                                    .getBytes()));

        return userMapper.selectOne(qw);
    }

    @Override
    @Transactional
    public void save(UserModel userModel) throws MyException {

        User user=fetchUserByPhoneNumber(userModel.getPhoneNumber());

        //判断手机号唯一
        if(null!=user){
            throw new MyException("手机号已注册！");
        }

        //密码加密
        user=new User();
        BeanUtils.copyProperties(userModel,user);
        user.setId(UUID.randomUUID().toString());
        user.setCreateTime(LocalDateTime.now());
        user.setPwd(Base64.getEncoder().encodeToString((GlobalConstant.PWD_PREFIX+user.getPwd()+GlobalConstant.PWD_SUBFIX).getBytes()));

        //存储
        int effectRow=userMapper.insert(user);
        if(effectRow<=0){
            throw new MyException("注册失败，服务器忙！");
        }


    }

    public User fetchUserByPhoneNumber(String phoneNumber){

        User user=null;

        LambdaQueryWrapper<User> qw=Wrappers.lambdaQuery();
        qw.eq(!isBlank(phoneNumber),User::getPhoneNumber,phoneNumber);
        user=userMapper.selectOne(qw);

        return user;
    }



}
