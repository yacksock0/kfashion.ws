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
                                                 @RequestParam(value="workCount", required=true)int workCount
                                                 ) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();

        int authorityNo = kfashionUserInfoService.selectCheckAuthorityNo(workId);
        HashMap<String, Object> workMap = new HashMap<String, Object>();
        workMap.put("authorityNo",authorityNo);
        workMap.put("workCount",workCount);
        if(authorityNo == 3) {
            List<Long> selectWorkAssignment = kfashionWorkHistoryService.selectWorkAssignment(workMap);
            for(int i = 0; i <selectWorkAssignment.size() ; i++){
                KfashionWork work = new KfashionWork();
                work.setNo(selectWorkAssignment.get(i));
                work.setWorkState(3);
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(selectWorkAssignment.get(i));
                workHistory.setCreatedId(workId);
                workHistory.setWorkStep(3);

                kfashionWorkHistoryService.insertWorkHistory(workHistory);
            }
        }else {
            List<Long> selectWorkAssignment = kfashionWorkHistoryService.selectWorkAssignment(workMap);

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
