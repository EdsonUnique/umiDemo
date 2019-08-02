package book.server.modelMapper;

import book.server.model.BookModel;

import java.util.List;

public interface BookModelMapper {

    List<BookModel> fetchBookList();

    List<BookModel> fetchListByTagId(int tagId);

    List<BookModel> fetchListByNameAndAuthor(String queryString);

    List<BookModel> fetchMyShelf(String userId);
}
