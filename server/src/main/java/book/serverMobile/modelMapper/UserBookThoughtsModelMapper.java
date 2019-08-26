package book.server.modelMapper;

import book.server.model.UserBookThoughtsModel;

import java.util.List;

public interface UserBookThoughtsModelMapper {

    List<UserBookThoughtsModel> fetchBookThoughts(String bookId);

}
