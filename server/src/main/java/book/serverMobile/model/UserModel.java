package book.serverMobile.model;

import book.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel extends User {

    private String genderStr;

    private String age;

    public String getGenderStr() {

        return super.getGender().equals(false)?"女":"男";
    }

    public String getAge() {

        return Integer.valueOf(LocalDate.now().getYear()-super.getBirth().getYear()).toString();
    }
}
