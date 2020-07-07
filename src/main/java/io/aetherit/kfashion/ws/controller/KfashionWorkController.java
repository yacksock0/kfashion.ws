package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/kfashion/work")
public class KfashionWorkController {

        private KfashionWorkService kfashionWorkService;

        @Autowired
        public KfashionWorkController(KfashionWorkService kfashionWorkService) {
            this.kfashionWorkService = kfashionWorkService;
        }

        @PutMapping(value="updateWorkName")
        public ResponseEntity<Object> updateWorkName(HttpServletRequest httpRequest,
                                                     @RequestParam(value="workNo") Long workNo,
                                                     @RequestParam(value="workName") String workName) {
            KfashionWork work = new KfashionWork();
            work.setNo(workNo);
            work.setWorkName(workName);
            kfashionWorkService.updateWorkName(work);

            return new ResponseEntity<Object>("success", HttpStatus.OK);
        }

    }

