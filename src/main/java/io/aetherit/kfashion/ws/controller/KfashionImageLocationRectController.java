package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionRectList;
import io.aetherit.kfashion.ws.service.KfashionImageLocationRectService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/api/v1/kfashion/rect")
public class KfashionImageLocationRectController {

        private KfashionImageLocationRectService kfashionImageLocationRectService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;

        @Autowired
        public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService,
                                                   KfashionWorkHistoryService kfashionWorkHistoryService) {
            this.kfashionImageLocationRectService = kfashionImageLocationRectService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        }

    @PostMapping(value="/location")
    public ResponseEntity<String> insertLocationRect(HttpServletRequest httpServletRequest,
                                                        @RequestParam List<KfashionRectList> rectList
//                                                        @RequestParam(value="workNo", required = true) Long workNo,
//                                                        @RequestParam(value="workStep", required = true) int workStep,
//                                                        @RequestParam(value="createdId", required = true) String createdId
                                                                                                    ) throws Exception {
            String msg= "";
            System.out.println("asdljkfasdlkfjasldkfj;as"+ rectList);
//            KfashionWorkHistory workHistory = new KfashionWorkHistory();
//            workHistory.setWorkNo(workNo);
//            workHistory.setWorkStep(workStep);
//            workHistory.setCreatedId(createdId);
//            kfashionWorkHistoryService.insertWorkHistory(workHistory);

//            KfashionImageLocationRect rect = new KfashionImageLocationRect();

//            msg = kfashionImageLocationRectService.insertLocationRect(rect);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

}
