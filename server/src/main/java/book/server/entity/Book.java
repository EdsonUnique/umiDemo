package book.server.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author Edson
 * @since 2019-08-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId("id")
    private String id;

    @TableField("book_name")
    private String bookName;

    @TableField("author")
    private String author;

    @TableField("publisher")
    private String publisher;

    @TableField("publish_date")
    private LocalDateTime publishDate;

    @TableField("description")
    private String description;

    @TableField("content")
    private String content;

    @TableField("tag_id")
    private Integer tagId;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_time")
    private LocalDateTime updateTime;


}
