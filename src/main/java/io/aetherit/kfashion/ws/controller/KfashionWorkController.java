package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/work")
public class KfashionWorkController {

        private KfashionWorkService kfashionWorkService;

        @Autowired
        public KfashionWorkController(KfashionWorkService kfashionWorkService) {
            this.kfashionWorkService = kfashionWorkService;
        }

        @PutMapping(value="updateWorkName")
        public ResponseEntity<Object> updateWorkName(HttpServletRequest httpRequest, @RequestBody KfashionWork work) {
            String fileExtension =kfashionWorkService.selectFileExtension(work);

            work.setWorkName(work.getWorkName()+"."+fileExtension);
            kfashionWorkService.updateWorkName(work);
            return new ResponseEntity<Object>("success", HttpStatus.OK);
        }

        @GetMapping(value="workQuantity")
        public ResponseEntity<Object> workQuantity(HttpServletRequest httpRequest,
                                                   @RequestParam(value="authorityNo", required=true)int authorityNo) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            int workState = 0;
            if(authorityNo == 3) {
                workState = 4;
                int workQuantity = kfashionWorkService.selectWorkQuantity(workState);
                resultMap.put("workQuantity", workQuantity);
            }else {
                workState = 1;
                int workQuantity = kfashionWorkService.selectWorkQuantity(workState);
                resultMap.put("workQuantity", workQuantity);
            }

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }



    }

