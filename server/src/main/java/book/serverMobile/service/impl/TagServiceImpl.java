package book.serverMobile.service.impl;

import book.entity.Tag;
import book.entityMapper.TagMapper;
import book.serverMobile.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagMapper tagMapper;

    @Override
    public List<Tag> fetchTagList() {
        return tagMapper.selectList(null);
    }
}
