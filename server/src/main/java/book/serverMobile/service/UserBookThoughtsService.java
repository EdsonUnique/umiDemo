package book.serverMobile.service;

import book.exceptions.MyException;
import book.entity.UserBookThoughts;
import book.serverMobile.model.UserBookThoughtsModel;

import java.util.List;

public interface UserBookThoughtsService {

    void addThoughts(UserBookThoughts userBookThoughts,String userId) throws MyException;

    List<UserBookThoughtsModel> fetchBookThoughts(String bookId);
}
