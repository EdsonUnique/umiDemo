package book.server.service;

import book.server.model.BookModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    List<BookModel> fetchBookList();

    List<BookModel> fetchListByTagId(int tagId);

    List<BookModel> fetchListByNameAndAuthor(String queryString);

    List<BookModel> fetchMyShelf(String userId);

    List<BookModel> fetchMyViews(String userId);

}
