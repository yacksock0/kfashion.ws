package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/v1/kfashion/work/history")
public class KfashionWorkHistoryController {

        private KfashionWorkHistoryService kfashionWorkHistoryService;

        @Autowired
        public KfashionWorkHistoryController(KfashionWorkHistoryService kfashionWorkHistoryService) {
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        }


    @GetMapping(value = "/assignment")
    public ResponseEntity<Object> workAssignment(HttpServletRequest httpRequest,
                                                 @RequestParam(value="workId")String workId,
                                                 @RequestParam(value="workCount")int workCount
                                                 ) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();


        List<KfashionWorkHistory> selectWorkAssignment = kfashionWorkHistoryService.selectWorkAssignment(workCount);

        for(int i = 0; i <selectWorkAssignment.size() ; i++){
            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setWorkNo(selectWorkAssignment.get(i).getWorkNo());
            workHistory.setCreatedId(workId);
            workHistory.setWorkStep(2);
            kfashionWorkHistoryService.insertWorkHistory(workHistory);
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}
