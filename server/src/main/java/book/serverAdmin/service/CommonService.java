package book.serverAdmin.service;

import book.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommonService {

    List<Tag> fetchTags();


}
