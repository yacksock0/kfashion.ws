package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/kfashion/work")
public class KfashionWorkController {

    private KfashionWorkService kfashionWorkService;

    @Autowired
    public KfashionWorkController(KfashionWorkService kfashionWorkService) {
        this.kfashionWorkService = kfashionWorkService;
    }

    /**
     * 이미지 이름 수정
     *
     * @param work
     * @return ResponseEntity
     * @throws
     */

    @PutMapping(value = "updateWorkName")
    public ResponseEntity<Object> updateWorkName(HttpServletRequest httpRequest, @RequestBody KfashionWork work) {
        String fileExtension = kfashionWorkService.selectFileExtension(work);
        int pos = fileExtension.lastIndexOf(".");
        String fileType = fileExtension.substring(pos + 1);
        work.setWorkName(work.getWorkName() + "." + fileType);
        kfashionWorkService.updateWorkName(work);
        return new ResponseEntity<Object>("success", HttpStatus.OK);
    }

    /**
     * 작업 분배 수량
     *
     * @param authorityNo
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "workQuantity")
    public ResponseEntity<Object> workQuantity(HttpServletRequest httpRequest,
                                               @RequestParam(value = "authorityNo", required = true) int authorityNo) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int workState = 0;
        if (authorityNo == 3) {
            //대학생들 작업지정 후에 work_history : step = 5로 이동
            workState = 5;  //work_history : step = 1에 해당되는 row들은 다 가져오되 step = 5에 해당되는 row들은 제외 해줄꺼야.

            int workQuantity = kfashionWorkService.selectWorkQuantity(workState);
            resultMap.put("workQuantity", workQuantity);
        } else {
            //고등학생들 작업지정 후에 work_history : 2로 이동
            workState = 2;  //work_history : step = 1에 해당되는 row들은 다 가져오되 step = 2에 해당되는 row들은 제외 해줄꺼야.
            int workQuantity = kfashionWorkService.selectWorkQuantity(workState);
            resultMap.put("workQuantity", workQuantity);
        }

        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 작업 취소 할수 있는 수량
     *
     * @param authorityNo
     * @param userId
     * @return ResponseEntity
     * @throws
     */

    @GetMapping(value = "workUserCancelQuantity")
    public ResponseEntity<Object> workUserCancelQuantity(HttpServletRequest httpRequest,
                                                         @RequestParam(value = "authorityNo", required = true) int authorityNo,
                                                         @RequestParam(value = "userId", required = true) String userId) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int workState = 0;
        Map<String, Object> workCancelQuantityMap = new HashMap<>();
        if (authorityNo == 3) {
            workCancelQuantityMap.put("workState", 5);
            workCancelQuantityMap.put("workStep", 6);
            workCancelQuantityMap.put("userId", userId);
            //대학생들 작업지정 후에 work_history : step = 5로 이동
            //work_history : step = 1에 해당되는 row들은 다 가져오되 step = 5에 해당되는 row들은 제외 해줄꺼야.

            int workUserCancelQuantity = kfashionWorkService.selectWorkUserCancelQuantity(workCancelQuantityMap);
            resultMap.put("workUserCancelQuantity", workUserCancelQuantity);
        } else {
            workCancelQuantityMap.put("workState", 2);
            workCancelQuantityMap.put("workStep", 4);
            workCancelQuantityMap.put("userId", userId);
            //고등학생들 작업지정 후에 work_history : 2로 이동
            //work_history : step = 1에 해당되는 row들은 다 가져오되 step = 2에 해당되는 row들은 제외 해줄꺼야.
            int workUserCancelQuantity = kfashionWorkService.selectWorkUserCancelQuantity(workCancelQuantityMap);
            resultMap.put("workUserCancelQuantity", workUserCancelQuantity);
        }

        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    /**
     * 전체 작업 수량
     *
     * @return ResponseEntity
     * @throws
     */
    @GetMapping(value = "totalWork")
    public ResponseEntity<Object> totalWork(HttpServletRequest httpRequest){
        Long totalWork = kfashionWorkService.selectTotalWork();
        return new ResponseEntity<Object>(totalWork, HttpStatus.OK);
    }


}

