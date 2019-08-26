package book.server.service;

import book.server.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {

    List<Tag> fetchTagList();

}
