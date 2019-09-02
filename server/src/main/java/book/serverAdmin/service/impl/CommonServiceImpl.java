package book.serverAdmin.service.impl;

import book.entity.Tag;
import book.entityMapper.TagMapper;
import book.serverAdmin.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private TagMapper tagMapper;

    @Override
    public List<Tag> fetchTags() {
        return tagMapper.selectList(null);
    }
}
