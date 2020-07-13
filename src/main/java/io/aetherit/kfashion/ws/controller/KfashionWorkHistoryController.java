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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
//            System.out.println(workId+workCount);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<Long> selectWorkAssignment = kfashionWorkHistoryService.selectWorkAssignment(workCount);

        System.out.println(selectWorkAssignment);
        for(int i = 0; i <selectWorkAssignment.size() ; i++){
            KfashionWork work = new KfashionWork();
            work.setNo(selectWorkAssignment.get(i));
            work.setWorkState(2);
            kfashionWorkService.updateWork(work);

            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setWorkNo(selectWorkAssignment.get(i));
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

            System.out.println(createdId);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        KfashionWorkHistory selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(createdId);

        System.out.println(selectWorkProgressRate.getCreatedId());
        System.out.println(selectWorkProgressRate.getFinishWork());
        System.out.println(selectWorkProgressRate.getTotalWork());
        resultMap.put("createdId", selectWorkProgressRate.getCreatedId());
        resultMap.put("finishWork", selectWorkProgressRate.getFinishWork());
        resultMap.put("totalWork", selectWorkProgressRate.getTotalWork());

//        selectWorkProgressRate.setCreatedId(createdId);
//        System.out.println(selectWorkProgressRate);
//        resultMap.put("selectWorkProgressRate", selectWorkProgressRate);
//        return null;
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}
