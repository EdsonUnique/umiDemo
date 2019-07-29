package book.server.service.impl;

import book.server.model.BookModel;
import book.server.modelMapper.BookModelMapper;
import book.server.service.BookService;
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
}
