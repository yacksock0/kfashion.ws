package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
    private KfashionWorkService kfashionWorkService;

        @Autowired
        public KfashionWorkHistoryController(KfashionWorkHistoryService kfashionWorkHistoryService,
                                             KfashionWorkService kfashionWorkService) {
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
        }


    @PostMapping(value = "/assignment")
    public ResponseEntity<Object> workAssignment(HttpServletRequest httpRequest,
                                                 @RequestParam(value="workId", required=true)String workId,
                                                 @RequestParam(value="workCount", required=true)int workCount
                                                 ) {
            System.out.println(workId+workCount);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionWorkHistory> selectWorkAssignment = kfashionWorkHistoryService.selectWorkAssignment(workCount);
        for(int i = 0; i <selectWorkAssignment.size() ; i++){
            KfashionWork work = new KfashionWork();
            work.setNo(selectWorkAssignment.get(i).getWorkNo());
            work.setWorkState(2);
            kfashionWorkService.updateWork(work);

            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setWorkNo(selectWorkAssignment.get(i).getWorkNo());
            workHistory.setCreatedId(workId);
            workHistory.setWorkStep(2);
            kfashionWorkHistoryService.insertWorkHistory(workHistory);
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @PostMapping(value = "/progressRate")
    public ResponseEntity<Object> workProgressRate(HttpServletRequest httpRequest,
                                                 @RequestParam(value="createdId")String createdId
    ) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(createdId);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}
