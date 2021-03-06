// import { makeStyles, p } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import classes from '../src/components/Tnc/bnpl.module.css';

import {
  initCleverTapUserProfile,
  pushClevertapEvent,
  formatMobileNumber,
} from '../src/utils';
import { useRouter } from 'next/router';
import { WrapImage } from '../src/components/WrapImage';
import Link from 'next/link';
import Seo from '../src/components/Seo';
import dynamic from 'next/dynamic';
// import { pushClevertapEvent } from 'app/utils/clevertap';
// import Button2 from '../components/Button';
const DynamicQuestionDropdown = dynamic(
  import('../src/components/QuestionDropdown'),
  {
    ssr: false,
  }
);
const LearnMorePage = () => {
  const [control, setControl] = useState(false);
  const [openedQuestion, setOpenedQuestion] = useState(null);
  const video = useRef(null);
  const router = useRouter();
  const { phone = '', zaloId = '' } = router.query;
  useEffect(() => {
    if (phone || zaloId) {
      initCleverTapUserProfile({
        zaloId,
        Identity: zaloId,
        Phone: phone && formatMobileNumber(phone, true),
      });
      pushClevertapEvent('SCREEN VIEW', {
        currentScreenName: 'bnpl_landing_page',
      });
      pushClevertapEvent('bnpl_landingpage_viewed');
    }
  }, [phone, zaloId]);

  const pushCTforFAQS = () => {
    pushClevertapEvent('bnpl_faq_clicked', {
      screen: 'bnpl_landing_page',
    });
  };

  const pushCTforTNC = () => {
    pushClevertapEvent('bnpl_tnc_clicked', {
      screen: 'bnpl_landing_page',
    });
  };

  const turnControlOnAndPlay = () => {
    setControl(true);
    if (video && video.current) {
      (video.current as any).play();
    }
  };

  const redirectToZaloStore = () => {
    (window.location as any).href = process.env.NEXT_PUBLIC_ZALO_STORE_URL;
  };

  const toggleQuestion = (question: any) => {
    if (openedQuestion && openedQuestion !== question) {
      pushClevertapEvent('bnpl_faq_interact', {
        position: openedQuestion,
        questions: false,
        faq_expanded: 'FALSE',
      });
    }
    pushClevertapEvent('bnpl_faq_interact', {
      position: question,
      questions: false,
      faq_expanded: openedQuestion !== question ? 'TRUE' : 'FALSE',
    });
    setOpenedQuestion(openedQuestion === question ? null : question);
  };

  return (
    <div className={classes.container}>
      <Seo title='Gi???i thi???u' />
      <WrapImage
        desktop={{
          src: '/images/bnpl-thumbnail.png',
          alt: 'thumbnail',
          className: classes.thumbnail,
          layout: 'fill',
          objectFit: 'cover',
        }}
      />
      <div className={classes.titleContainer}>
        <WrapImage
          desktop={{
            src: '/images/fast-dong.png',
            alt: 'fast-dong',
            className: classes.titleIcon,
            layout: 'fill',
            objectFit: 'cover',
          }}
        />
        <p className={classes.title}>Mua tr?????c, tr??? sau</p>
        <p className={classes.subTitle}>T???i ??a 30 ng??y</p>
        <p className={classes.titleDescription} style={{ textAlign: 'center' }}>
          Ch????ng tr??nh h??? tr??? kh??ch h??ng xoay v??ng v???n nhanh qua h??nh th???c nh???p
          h??ng tr?????c, thanh to??n sau v???i h???n m???c t???i ??a 100.000.000vnd
        </p>
      </div>
      <div className={classes.videoContainer} onClick={turnControlOnAndPlay}>
        {/* eslint-disable-next-line */}
        <video
          className={control ? classes.video : classes.videoOnlyPoster}
          poster={'/images/bnpl-video-poster.png'}
          preload='none'
          controls={control}
          ref={video}
        >
          <source
            src='https://assets.telio.me/zalo/bnpl/bnpl-v2.mp4'
            type='video/mp4'
          />
          <p>Tr??nh duy???t c???a b???n kh??ng h??? tr??? xem video.</p>
        </video>
      </div>

      <div className={classes.section}>
        <div className={classes.sectionImageContainer}>
          <WrapImage
            desktop={{
              src: '/images/calendar.png',
              alt: 'calendar',
              className: classes.sectionImage,
              layout: 'fill',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={classes.sectionInfoContainer}>
          <h3 className={classes.sectionTitle}>
            Ph?? qu???n l?? ch??? t??? 3.000??/ng??y
          </h3>
          <p className={classes.sectionDescription}>
            V???i ????n <b style={{ color: '#000' }}>d?????i 8.000.000??</b>, ??p d???ng
            ph?? c??? ?????nh 3.000??/ng??y k??? t??? ng??y giao h??ng, t???i ??a 30 ng??y.
          </p>
          <p
            style={{ marginTop: '16px' }}
            className={classes.sectionDescription}
          >
            V???i ????n <b style={{ color: 'black' }}>t??? 8.000.000??</b>, mi???n ph??
            qu???n l?? trong 3 ng??y ?????u ti??n k??? t??? sau ng??y giao h??ng. Telio ??p
            d???ng ph?? c??? ?????nh 10.000??/ng??y t??? ng??y th??? 4, t???i ??a 30 ng??y.
          </p>
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.sectionImageContainer}>
          <WrapImage
            desktop={{
              src: '/images/pay.png',
              alt: 'pay',
              className: classes.sectionImage,
              layout: 'fill',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={classes.sectionInfoContainer}>
          <h3 className={classes.sectionTitle}>Thanh to??n linh ho???t</h3>
          <p className={classes.sectionDescription}>
            Kh??ch h??ng ???????c l???a ch???n 1 trong 2 ph????ng th???c thanh to??n sau:
            <br />
            &bull; Thu ti???n t???n n??i <br />
            &bull; Chuy???n kho???n ng??n h??ng
          </p>
          <br />
          <i
            style={{ color: '#666d74', fontWeight: 'lighter' }}
            className={classes.sectionDescription}
          >
            *?????t l???ch h???n thu ti???n tr?????c 2 ng??y
          </i>
        </div>
      </div>

      <div className={classes.sectionNoBorder}>
        <div className={classes.sectionImageContainer}>
          <WrapImage
            desktop={{
              src: '/images/touch.png',
              alt: 'touch',
              className: classes.sectionImage,
              layout: 'fill',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={classes.sectionInfoContainer}>
          <h3 className={classes.sectionTitle}>S??? d???ng d??? d??ng</h3>
          <p className={classes.sectionDescription}>
            Kh??ch h??ng ch??? c???n l???a ch???n h??nh th???c Thanh To??n Ch???m khi thanh to??n
            ????n h??ng. Telio ??p d???ng ch????ng tr??nh v???i kh??ch h??ng ????? ??i???u ki???n,
            ????n h??ng s??? ???????c t??? ?????ng x??t duy???t.
          </p>
        </div>
      </div>

      <div className={classes.faqContainer}>
        <div className={classes.faqTitleContainer}>
          <h3 className={classes.faqTitle}>C??u h???i th?????ng g???p</h3>
        </div>
        <div>
          <DynamicQuestionDropdown
            question='Th???i h???n thanh to??n ????n h??ng Thanh To??n Ch???m (Mua tr?????c, tr??? sau) l?? bao l??u?'
            open={openedQuestion === 1}
            toggle={() => toggleQuestion(1)}
          >
            <div className={classes.answerContent}>
              ????n h??ng Thanh To??n Ch???m ???????c thanh to??n t???i ??a trong 30 ng??y k???
              t??? ng??y giao h??ng.
              <br />
              Sau 30 ng??y, Telio c?? quy???n kh??a t??i kho???n v?? kh??ng cho ph??p b???n
              ?????t th??m b???t k?? ????n h??ng n??o. ?????ng th???i, ph?? tr??? h???n 15.000
              VN??/m???i ng??y s??? ???????c ??p d???ng.
            </div>
          </DynamicQuestionDropdown>
          <DynamicQuestionDropdown
            question='L??m th??? n??o ????? thanh to??n ????n h??ng Thanh To??n Ch???m (Mua tr?????c, tr??? sau) ?'
            open={openedQuestion === 2}
            toggle={() => toggleQuestion(2)}
          >
            <div className={classes.answerContent}>
              Kh??ch h??ng ???????c l???a ch???n m???t trong hai c??ch: <br />
              - Thu ti???n t???n n??i: G???i 1800 6751 ????? ?????t l???ch thu ti???n. L??u ??:
              Kh??ch h??ng c???n ?????t l???ch thu ti???n tr?????c 2 ng??y l??m vi???c v?? ch???
              thanh to??n v???i Nh??n vi??n mang theo phi???u thu v?? gi???y gi???i thi???u c??
              con d???u h???p l??? c???a Telio. <br />- Chuy???n kho???n ng??n h??ng: Xem
              h?????ng d???n chi ti???t t???i m???c Thanh To??n Ch???m trong menu / danh m???c
              khi ????ng nh???p v??o Gian h??ng Telio tr??n Zalo
            </div>
          </DynamicQuestionDropdown>
          <DynamicQuestionDropdown
            question='L??m th??? n??o ????? ki???m tra t??nh tr???ng thanh to??n c???a ????n h??ng Thanh To??n Ch???m (Mua tr?????c, tr??? sau) ?'
            open={openedQuestion === 3}
            toggle={() => toggleQuestion(3)}
          >
            <div className={classes.answerContent}>
              - N???u ?????t h??ng qua nh??n vi??n b??n h??ng, li??n h??? t???ng ????i 1800 6751
              ????? ki???m tra t??nh tr???ng thanh to??n.
              <br />- N???u ?????t h??ng qua Zalo, xem h?????ng d???n chi ti???t t???i m???c
              Thanh To??n Ch???m trong menu / danh m???c khi ????ng nh???p v??o Zalo.
            </div>
          </DynamicQuestionDropdown>
          <DynamicQuestionDropdown
            question='L??m th??? n??o ????? x??c minh ????n h??ng ???? thanh to??n th??nh c??ng?'
            open={openedQuestion === 4}
            toggle={() => toggleQuestion(4)}
          >
            <div className={classes.answerContent}>
              - V???i h??nh th???c Thu ti???n t???n n??i, Nh??n vi??n thu ti???n s??? mang theo
              2 b???n phi???u thu c?? gi?? tr??? ph??p l?? nh?? nhau ????? hai b??n x??c nh???n
              khi kh??ch h??ng thanh to??n, sau ???? s??? b??n giao cho kh??ch h??ng 1
              b???n. <br />- V???i h??nh th???c Chuy???n Kho???n, th??ng b??o x??c nh???n chuy???n
              kho???n s??? ???????c g???i ?????n kh??ch h??ng trong v??ng 1 ng??y l??m vi???c sau
              khi ho??n t???t quy tr??nh ki???m tra.
            </div>
          </DynamicQuestionDropdown>
          <div className={classes.linkContainer}>
            <Link href='/bnpl-qna'>
              <div className={classes.link}>
                <p onClick={pushCTforFAQS}>T???t c??? c??u h???i</p>
              </div>
            </Link>
            <Link href='/bnpl-tnc'>
              <div className={classes.link}>
                <p onClick={pushCTforTNC}>??i???u kho???n & ??i???u ki???n</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className={classes.actionContainer}>
        <button className={classes.button} onClick={redirectToZaloStore}>
          <span className={classes.buttonText}>?????t h??ng Thanh To??n Sau</span>
        </button>
        <a className={classes.hotlineCall} href='tel:18006751'>
          <button className={classes.invertButton}>
            <span className={classes.invertButtonText}>Li??n h??? Hotline</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default LearnMorePage;
