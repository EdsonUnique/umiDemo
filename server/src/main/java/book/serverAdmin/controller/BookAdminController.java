package book.serverAdmin.controller;


import book.core.RestVO;
import book.core.RestWrapper;
import book.serverAdmin.model.BookAdminModel;
import book.serverAdmin.service.BookServiceAdmin;
import book.utils.UploadFileToDisk;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

@RestController
@RequestMapping("/admin/book")
public class BookAdminController {

    @Autowired
    private BookServiceAdmin bookServiceAdmin;
    /**
     * 文件上传路径
     */
    private String filePath;

    @GetMapping("/fetchBookList")
    public RestVO fetchBookList(@RequestParam(value="pagenum",required=false,defaultValue = "0")int pagenum
            ,@RequestParam(value="pagesize",required=false,defaultValue = "10")int pagesize){

        PageInfo<BookAdminModel> data=bookServiceAdmin.fetchBookModelList(pagenum,pagesize);
        return RestWrapper.success(data);
    }

    @PostMapping("/addBook")
    public RestVO addBook(@RequestBody BookAdminModel bookModel){

        try{
            bookModel.setFilePath(filePath);
            bookServiceAdmin.addBook(bookModel);
            return RestWrapper.success("添加成功！");
        }catch (Exception e){
            System.err.println(e.getMessage());
            return RestWrapper.error(e.getMessage());
        }


    }

    @PostMapping("/uploadBook")
    public RestVO uploadBook(@RequestParam("fileBook")MultipartFile file){

        //存储到指定文件夹
        try{
            filePath= UploadFileToDisk.writeToUploadFiles(file,"D://resources/upload");
        }catch (Exception e){
            e.printStackTrace();
            return RestWrapper.error(e.getMessage());
        }


        return RestWrapper.success();
    }


}
