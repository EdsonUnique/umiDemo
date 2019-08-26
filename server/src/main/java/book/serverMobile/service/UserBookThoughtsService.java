package book.server.service;

import book.exceptions.MyException;
import book.server.entity.UserBookThoughts;
import book.server.model.UserBookThoughtsModel;

import java.util.List;

public interface UserBookThoughtsService {

    void addThoughts(UserBookThoughts userBookThoughts,String userId) throws MyException;

    List<UserBookThoughtsModel> fetchBookThoughts(String bookId);
}
