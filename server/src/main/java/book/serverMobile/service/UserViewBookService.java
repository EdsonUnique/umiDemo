package book.serverMobile.service;


import book.exceptions.MyException;
import org.springframework.stereotype.Service;

@Service
public interface UserViewBookService {

    void recordViews(String bookId,String userId) throws MyException;


}
