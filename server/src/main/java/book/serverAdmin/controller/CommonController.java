package book.serverAdmin.controller;

import book.core.RestVO;
import book.core.RestWrapper;
import book.entity.Tag;
import book.serverAdmin.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 提供共有的请求
 */
@RestController
@RequestMapping("/admin/common")
public class CommonController {

    @Autowired
    private CommonService commonService;

    @GetMapping("/fetchTags")
    public RestVO fetchTags(){

        List<Tag> data=commonService.fetchTags();

        return RestWrapper.success(data);

    }


}
