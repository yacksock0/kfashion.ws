import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:0,
  },
  paperin:{
    marginTop:56,
  },
  titletext: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: '17px',
    fontWeight: '600',
  },
  linestyle: {
    border:'none',
    height:'1px',
    background:'#e2e2e2',
    marginBottom:20,
  },
  textstyle: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: '14px',
    marginBottom:20,
  },
 
}));

export default function SideHelp() {
  const classes = useStyles();
  

  return (
    <div>
        <Paper elevation={0} className={classes.paperin}>

            <Typography className={classes.titletext}>다각형 지정</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 이미지 리스트 탭 &gt; 선택에서 <CheckIcon />을 클릭하여 작업할 이미지 선택</Typography>
            <Typography className={classes.textstyle}>2. 각 영역 별 START버튼을 통해 영역지정 완료 후 FINISH 버튼 클릭 &#40;Start &gt; Finish &gt; Save&#41; </Typography>
            <Typography className={classes.textstyle}>3. 삭제 버튼을 통해 한 점씩&#44; 또는 전부삭제 가능 </Typography>
            <Typography className={classes.textstyle}>4. 필요한 영역의 작업이 모두 완료되면 작업완료 버튼 클릭 </Typography>
            <Typography className={classes.textstyle}>5. 검수 후 반송된 이미지는 코멘트가 적용되어 확인 후 재작업 가능 &#40;반송된 이미지는 삭제 불가능&#41; </Typography>
            <Typography className={classes.textstyle}>6. 체크박스 활용하여 이미지 일괄삭제 가능 </Typography>

            {/* <Typography className={classes.titletext}>기본 레이블링</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측 상단에 이미지리스트에서 작업 할 이미지 선택</Typography>
            <Typography className={classes.textstyle}>2. 영역정보가 존재하는 탭&#40;아우터&#44; 상의&#44; 하의&#44; 원피스&#41;에서 색상 및 소매길이 선택 후 다음 탭으로 이동 </Typography>
            <Typography className={classes.textstyle}>3. 영역정보가 존재하는 마지막 탭 입력 후 저장버튼 클릭 </Typography>
            <Typography className={classes.textstyle}>4. 체크박스 클릭후 대표 이미지 선택하여 작업시 체크한 이미지 전부 동일한 값으로 입력됩니다. </Typography>

            <Typography className={classes.titletext}>전문 레이블링</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측 상단에 이미지리스트에서 작업 할 이미지 선택 &#47; 체크박스 클릭후 대표 이미지 선택하여 작업시 체크한 이미지 전부 동일한 값으로 입력됩니다.</Typography>
            <Typography className={classes.textstyle}>2. 스타일 선택 완료 후 영역정보가 존재하는 탭&#40;아우터&#44; 상의&#44; 하의&#44; 원피스&#41;에서 세부항목 선택 </Typography>
            <Typography className={classes.textstyle}>3. 이미지에 해당되는 모든 탭의 정보를 입력한 후 저장버튼을 눌러주세요. </Typography>
            <Typography className={classes.textstyle}>4. 전체선택 후 페이지이동시 이전 선택은 무효 처리 됩니다. </Typography>
            <Typography className={classes.textstyle}>5. 체크박스는 삭제&#44; 저장 일괄적으로 사용가능 </Typography>

            <Typography className={classes.titletext}>기본작업 검수</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측 상단에 검수할 확인 할 이미지 선택</Typography>
            <Typography className={classes.textstyle}>2. 작업한 폴리곤 좌표 및 레이블링 확인 </Typography>
            <Typography className={classes.textstyle}>3. 확인 후 수정 사항 있으면 반송 버튼을 선택 </Typography>
            <Typography className={classes.textstyle}>4. 반송 시 수정 사항 있는 부분 체크 후 반송 사유 작성 후 확인 </Typography>
            <Typography className={classes.textstyle}>5. 체크 박스 활용하여 일괄적으로 완료 가능 합니다 &#40; 반송은 체크박스 활용 불가능합니다 &#41; </Typography>

            <Typography className={classes.titletext}>작업내용 체크</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측 상단에 상호간 작업내용 체크 확인 할 이미지 선택 &#47; 본인이 작업한 이미지 리스트는 맨 앞쪽에 최근작업 한 순서로 정렬되어 있음</Typography>
            <Typography className={classes.textstyle}>2. 수정 버튼 클릭시 수정 화면 이동 후 세부사항 선택 후 수정완료 버튼 눌러주세요. </Typography>
            <Typography className={classes.textstyle}>3. 본인이 작업한 이미지 리스트에만 수정&#44;삭제&#44;완료 버튼 활성화 </Typography>
            <Typography className={classes.textstyle}>4. 체크박스 수정&#44;완료&#44;삭제 일괄적으로 가능 </Typography>

            <Typography className={classes.titletext}>기본작업 내용</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측 상단에 검수할 확인 할 이미지 선택</Typography>
            <Typography className={classes.textstyle}>2. 작업한 폴리곤 좌표 및 레이블링 확인 </Typography>
            <Typography className={classes.textstyle}>3. 확인 후 수정 사항 있으면 반송 버튼을 선택 </Typography>
            <Typography className={classes.textstyle}>4. 반송 시 수정 사항 있는 부분 체크 후 반송 사유 작성 후 확인 </Typography>
            <Typography className={classes.textstyle}>5. 체크 박스 활용하여 일괄적으로 완료 가능 합니다 &#40; 반송은 체크박스 활용 불가능합니다 &#41; </Typography>

            <Typography className={classes.titletext}>작업자 등록</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 우측상단 &#43; 버튼을 통해 작업자 추가 &#47; 작업 리스트의 액션버튼을 통해 작업자 이름&#47;비밀번호 수정</Typography>

            <Typography className={classes.titletext}>작업 지정</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 그룹 회원 리스트의 작업지정 버튼을 통해 해당 작업자에게 작업분배</Typography> */}

            {/* <Typography className={classes.titletext}>작업내용 수정</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 스타일 선택 수정 완료후 영역정보가 존재하는 탭&#40;아우터&#44; 상의&#44; 하의&#44; 원피스&#41;에서 세부항목 선택</Typography> 
            <Typography className={classes.textstyle}>2. 이미지에 해당되는 모든 탭의 정보를 수정 </Typography>
            <Typography className={classes.textstyle}>3. 수정이 끝나면 수정완료 버튼을 눌러주세요 </Typography>
            <Typography className={classes.textstyle}>4. 수정할 사항이 없으면 돌아가기 버튼을 눌러주세요 </Typography> */}



                
        </Paper>
    </div>
  );
}

