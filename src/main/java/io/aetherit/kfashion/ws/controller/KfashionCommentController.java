package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.service.KfashionCategoryItemService;
import io.aetherit.kfashion.ws.service.KfashionCommentService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/kfashion/comment")
public class KfashionCommentController {

    private KfashionCommentService kfashionCommentService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;

    @Autowired
    public KfashionCommentController(KfashionCommentService kfashionCommentService,
                                     KfashionWorkHistoryService kfashionWorkHistoryService) {
        this.kfashionCommentService = kfashionCommentService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
    }

    /**
     * 기본 작업 리턴 코멘트
     * @param kfashionComment
     * @return ResponseEntity
     * @throws Exception
     */

    @PostMapping(value = "/highComment")
    public ResponseEntity<Object> highComment(HttpServletRequest httpRequest,
                                                   @RequestBody KfashionComment kfashionComment) {
        kfashionComment.setReceiveId(kfashionWorkHistoryService.selectReceiveId(kfashionComment.getWorkNo()));
        if(kfashionComment.getWorkStep() == 3) {
            kfashionComment.setCommentNo(1);
            kfashionCommentService.insertHighPolyComment(kfashionComment);

        }else if(kfashionComment.getWorkStep1() == 4) {
            kfashionComment.setCommentNo(1);
            kfashionCommentService.insertHighLabelComment(kfashionComment);

        }else if(kfashionComment.getWorkStep1() == 3 && kfashionComment.getWorkStep1() == 4) {
            kfashionComment.setCommentNo(1);
            kfashionCommentService.insertHighPolyComment(kfashionComment);
            kfashionCommentService.insertHighLabelComment(kfashionComment);
        }
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
}
