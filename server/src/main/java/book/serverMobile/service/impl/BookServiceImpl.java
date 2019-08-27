package book.serverMobile.service.impl;

import book.serverMobile.model.BookModel;
import book.serverMobile.modelMapper.BookModelMapper;
import book.serverMobile.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookModelMapper bookModelMapper;

    @Override
    public List<BookModel> fetchBookList() {
        return bookModelMapper.fetchBookList();
    }

    @Override
    public List<BookModel> fetchListByTagId(int tagId) {
        return bookModelMapper.fetchListByTagId(tagId);
    }

    @Override
    public List<BookModel> fetchListByNameAndAuthor(String queryString) {
        return bookModelMapper.fetchListByNameAndAuthor(queryString);
    }

    @Override
    public List<BookModel> fetchMyShelf(String userId) {

        return bookModelMapper.fetchMyShelf(userId);
    }

    @Override
    public List<BookModel> fetchMyViews(String userId) {

        return bookModelMapper.fetchMyViews(userId);
    }
}
