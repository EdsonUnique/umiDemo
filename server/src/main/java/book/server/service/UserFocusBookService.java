package book.server.service;

import book.exceptions.MyException;
import book.server.entity.UserFocusBook;
import org.springframework.stereotype.Service;

@Service
public interface UserFocusBookService {

    UserFocusBook addToShelf(String userId,String bookId) throws MyException;

}
