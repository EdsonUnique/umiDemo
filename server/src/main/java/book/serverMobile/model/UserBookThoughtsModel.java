package book.server.model;

import book.server.entity.UserBookThoughts;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBookThoughtsModel extends UserBookThoughts {

    private String nickname;

}
