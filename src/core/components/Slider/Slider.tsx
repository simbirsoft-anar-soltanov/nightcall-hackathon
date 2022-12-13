import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'src/index.scss';

const mockSliderImages = [
  {
    id: 1,
    url: 'https://i.ibb.co/LCRXRDL/Different-Types-of-Volunteering-1.jpg',
  },
  { id: 2, url: 'https://i.ibb.co/XYPr04x/NHLEAFinterns.jpg' },
  { id: 3, url: 'https://i.ibb.co/gzrpcQH/istockphoto-459965109-612x612.jpg' },
  { id: 4, url: 'https://i.ibb.co/LtwrbtH/i-Stock-1145183123.jpg' },
  { id: 5, url: 'https://i.ibb.co/c6NwtRJ/chopra-brightspotcdn.jpg' },
];

const Slider = () => {
  return (
    <Box sx={{ marginTop: '16px' }}>
      <Swiper
        effect={'coverflow'}
        grabCursor
        centeredSlides
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination
        initialSlide={2}
        loop
        modules={[EffectCoverflow, Pagination]}
        className='mySwiper'
      >
        {mockSliderImages.map(({ id, url }) => (
          <SwiperSlide key={id}>
            <img src={url} width='300px' height='300px' />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Slider;
