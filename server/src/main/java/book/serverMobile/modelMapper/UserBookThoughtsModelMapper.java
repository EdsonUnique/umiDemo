package book.serverMobile.modelMapper;

import book.serverMobile.model.UserBookThoughtsModel;

import java.util.List;

public interface UserBookThoughtsModelMapper {

    List<UserBookThoughtsModel> fetchBookThoughts(String bookId);

}
