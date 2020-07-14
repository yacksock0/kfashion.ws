package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        private KfashionUserInfoService kfashionUserInfoService;

        @Autowired
        public KfashionWorkHistoryController(KfashionWorkHistoryService kfashionWorkHistoryService,
                                             KfashionWorkService kfashionWorkService,
                                             KfashionUserInfoService kfashionUserInfoService) {
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
            this.kfashionUserInfoService = kfashionUserInfoService;
        }


    @PostMapping(value = "/assignment")
    public ResponseEntity<Object> workAssignment(HttpServletRequest httpRequest,
                                                 @RequestParam(value="workId", required=true)String workId,
                                                 @RequestParam(value="workCount", required=true)int workCount,
                                                 @RequestParam(value="authorityNo", required=true)int authorityNo
                                                 ) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> workMap = new HashMap<String, Object>();
        if(authorityNo == 3) {
            workMap.put("authorityNo",4);
            workMap.put("workCount",workCount);
            List<Long> WorkAssignment = kfashionWorkService.selectWorkAssignment(workMap);
            for(int i = 0; i <WorkAssignment.size() ; i++){
                KfashionWork work = new KfashionWork();
                work.setNo(WorkAssignment.get(i));
                work.setWorkState(5);
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(WorkAssignment.get(i));
                workHistory.setCreatedId(workId);
                workHistory.setWorkStep(5);

                kfashionWorkHistoryService.insertWorkHistory(workHistory);
            }
        }else {
            workMap.put("authorityNo",1);
            workMap.put("workCount",workCount);
            List<Long> WorkAssignment = kfashionWorkService.selectWorkAssignment(workMap);

            for(int i = 0; i <WorkAssignment.size() ; i++){
                KfashionWork work = new KfashionWork();
                work.setNo(WorkAssignment.get(i));
                work.setWorkState(2);
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(WorkAssignment.get(i));
                workHistory.setCreatedId(workId);
                workHistory.setWorkStep(2);
                kfashionWorkHistoryService.insertWorkHistory(workHistory);
            }
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @PostMapping(value = "/progressRate")
    public ResponseEntity<Object> workProgressRate(HttpServletRequest httpRequest,
                                                 @RequestParam(value="createdId")String createdId,
                                                 @RequestParam(value="authorityNo", required=true)int authorityNo) {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> workHistoryMap = new HashMap<String, Object>();
        if(authorityNo == 3) {
            workHistoryMap.put("authorityNo", 5);
            workHistoryMap.put("workStep", 6);
            workHistoryMap.put("createdId", createdId);
            KfashionWorkHistory selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(workHistoryMap);
            selectWorkProgressRate.setCreatedId(createdId);
            resultMap.put("selectWorkProgressRate", selectWorkProgressRate);

        }else {
            workHistoryMap.put("authorityNo", 2);
            workHistoryMap.put("workStep", 4);
            workHistoryMap.put("createdId", createdId);
            KfashionWorkHistory selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(workHistoryMap);
            selectWorkProgressRate.setCreatedId(createdId);
            resultMap.put("selectWorkProgressRate", selectWorkProgressRate);
        }

        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}
