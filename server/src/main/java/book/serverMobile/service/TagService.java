package book.serverMobile.service;

import book.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TagService {

    List<Tag> fetchTagList();

}
