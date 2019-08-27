package book.serverMobile.modelMapper;

import book.serverMobile.model.BookModel;

import java.util.List;

public interface BookModelMapper {

    List<BookModel> fetchBookList();

    List<BookModel> fetchListByTagId(int tagId);

    List<BookModel> fetchListByNameAndAuthor(String queryString);

    List<BookModel> fetchMyShelf(String userId);

    List<BookModel> fetchMyViews(String userId);
}
