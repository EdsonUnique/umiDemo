package book.server.service.impl;

import book.server.entity.Tag;
import book.server.entityMapper.TagMapper;
import book.server.model.TagModel;
import book.server.service.TagService;
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
