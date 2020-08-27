package io.aetherit.kfashion.ws.controller;

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
import java.util.HashMap;
import java.util.List;


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


    /**
     * 작업 분배
     *
     * @param authorityNo
     * @param workId
     * @param workCount
     * @return ResponseEntity
     * @throws
     */

    //작업 지정 모달 창에서 확인 버튼 후 동작.
    @PostMapping(value = "/assignment")
    public ResponseEntity<Object> workAssignment(HttpServletRequest httpRequest,
                                                 @RequestParam(value = "workId", required = true) String workId,
                                                 @RequestParam(value = "workCount", required = true) int workCount,
                                                 @RequestParam(value = "authorityNo", required = true) int authorityNo
    ) {

        System.out.println(workId+workCount);

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> workMap = new HashMap<String, Object>();

        if (authorityNo == 3) { //Univ admin이 작업을 지정한 경우
            workMap.put("currentNo", 1);
            workMap.put("authorityNo", 5);
            workMap.put("workCount", workCount);
            List<Long> WorkAssignment = kfashionWorkService.selectWorkAssignment(workMap); //
            for (int i = 0; i < WorkAssignment.size(); i++) {
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
        } else { //High admin이 작업을 지정한 경우
            workMap.put("currentNo", 1);
            workMap.put("authorityNo", 2);
            workMap.put("workCount", workCount);
            List<Long> WorkAssignment = kfashionWorkService.selectWorkAssignment(workMap);

            for (int i = 0; i < WorkAssignment.size(); i++) {
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

    /**
     * 작업 취소
     *
     * @param authorityNo
     * @param workId
     * @param workCount
     * @return ResponseEntity
     * @throws
     */

    @PostMapping(value = "/assignmentCancel")
    public ResponseEntity<Object> workAssignmentCancel(HttpServletRequest httpRequest,
                                                       @RequestParam(value = "workId", required = true) String workId,
                                                       @RequestParam(value = "workCount", required = true) int workCount,
                                                       @RequestParam(value = "authorityNo", required = true) int authorityNo) {


        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> workAssignmentCancelMap = new HashMap<String, Object>();

        if (authorityNo == 3) { //Univ admin이 작업을 취소한 경우
            workAssignmentCancelMap.put("currentNo", 5);
            workAssignmentCancelMap.put("workStep", 6);
            workAssignmentCancelMap.put("workCount", workCount);
            workAssignmentCancelMap.put("workId", workId);
            List<Long> workAssignmentCancel = kfashionWorkService.selectWorkAssignmentCancel(workAssignmentCancelMap); //
            for (int i = 0; i < workAssignmentCancel.size(); i++) {
                KfashionWork work = new KfashionWork();
                work.setNo(workAssignmentCancel.get(i));
                work.setWorkState(1);
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(workAssignmentCancel.get(i));
                workHistory.setCreatedId(workId);
                workHistory.setWorkStep(5);
                kfashionWorkHistoryService.deleteAssignmentCancelWorkHistory(workHistory);
            }
        } else { //High admin이 작업을 취소한 경우
            workAssignmentCancelMap.put("currentNo", 2);
            workAssignmentCancelMap.put("workStep", 4);
            workAssignmentCancelMap.put("workCount", workCount);
            workAssignmentCancelMap.put("workId", workId);
            List<Long> workAssignmentCancel = kfashionWorkService.selectWorkAssignmentCancel(workAssignmentCancelMap);

            for (int i = 0; i < workAssignmentCancel.size(); i++) {
                KfashionWork work = new KfashionWork();
                work.setNo(workAssignmentCancel.get(i));
                work.setWorkState(1);
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(workAssignmentCancel.get(i));
                workHistory.setCreatedId(workId);
                workHistory.setWorkStep(2);
                kfashionWorkHistoryService.deleteAssignmentCancelWorkHistory(workHistory);
            }
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 작업 진행 상황
     *
     * @param authorityNo
     * @param createdId
     * @return ResponseEntity
     * @throws
     */
    @PostMapping(value = "/progressRate")
    public ResponseEntity<Object> workProgressRate(HttpServletRequest httpRequest,
                                                   @RequestParam(value = "createdId") String createdId,
                                                   @RequestParam(value = "authorityNo", required = true) int authorityNo) {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> workHistoryMap = new HashMap<String, Object>();
        if (authorityNo == 3) {
            workHistoryMap.put("authorityNo", 5);
            workHistoryMap.put("workStep", 6);
            workHistoryMap.put("createdId", createdId);
            KfashionWorkHistory selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(workHistoryMap);
            selectWorkProgressRate.setCreatedId(createdId);
            resultMap.put("selectWorkProgressRate", selectWorkProgressRate);

        } else {
            workHistoryMap.put("authorityNo", 2);
            workHistoryMap.put("workStep", 4);
            workHistoryMap.put("createdId", createdId);
            KfashionWorkHistory selectWorkProgressRate = kfashionWorkHistoryService.selectWorkProgressRate(workHistoryMap);
            selectWorkProgressRate.setCreatedId(createdId);
            resultMap.put("selectWorkProgressRate", selectWorkProgressRate);
            workHistoryMap.put("workStep", 3);
            KfashionWorkHistory selectWorPolygonRate = kfashionWorkHistoryService.selectWorkProgressRate(workHistoryMap);
            resultMap.put("selectWorkProgressRate", selectWorkProgressRate);
            resultMap.put("selectWorPolygonRate", selectWorPolygonRate);
        }

        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @PostMapping(value = "/professionalComplete")
    public ResponseEntity<Object> professionalComplete(HttpServletRequest httpServletRequest,
                                                       @RequestBody KfashionWorkHistory workHistory) throws Exception {
        kfashionWorkHistoryService.insertWorkHistory(workHistory);
        workHistory.setWorkStep(7);
        Long no = kfashionWorkHistoryService.selectSuccessWorkNo(workHistory);
        if(no != null || no > 0) {
            KfashionWork work = new KfashionWork();
            work.setNo(no);
            work.setWorkState(7);
            kfashionWorkService.updateWork(work);
        }
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    @PostMapping(value = "/basicComplete")
    public ResponseEntity<Object> basicComplete(HttpServletRequest httpServletRequest,
                                                @RequestBody KfashionWorkHistory workHistory) throws Exception {
        kfashionWorkHistoryService.insertWorkHistory(workHistory);
        workHistory.setWorkStep(8);
        Long no = kfashionWorkHistoryService.selectSuccessWorkNo(workHistory);
        if(no != null || no > 0) {
            KfashionWork work = new KfashionWork();
            work.setNo(no);
            work.setWorkState(7);
            kfashionWorkService.updateWork(work);
        }
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
}
