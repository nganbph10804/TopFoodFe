import { Feed } from './feedItem';

type TwittProps = React.ComponentProps<typeof Feed>;

export const dataFeed: Omit<TwittProps, 'onPress'>[] = [
  {
    id: 1,
    name: 'Trần Đại Minh',
    handle: '@JoshWComeau',
    date: '10h ago',
    content:
      '🔥 Món ăn nào cũng ngon và dễ nấu, đặc biệt giá rẻ lại trôi cơm chắc chắn ai cũng sẽ thích ăn',
    image:
      'https://chefjob.vn/wp-content/uploads/2018/01/pho-mon-an-truyen-thong-viet-nam-noi-tieng-the-gioi.jpg',
    avatar:
      'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/88433635_583131522417290_8166507621851856896_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=z3e9jnqAbmYAX_FAFaX&_nc_ht=scontent.fhan14-1.fna&oh=22cffca208ca81e32c9c8667d6a50977&oe=6185FACA',
    comments: 12,
    retweets: 36,
    hearts: 175,
  },
  {
    id: 2,
    name: 'Phạm Huy Thiên',
    handle: '@satya164',
    date: '20h ago',
    content:
      'Cà tím nhồi thịt sốt dầu hào vừa mềm ngon, lại có chút đậm đà thơm nức mũi ăn với cơm không gì hấp... 😅\n\n#Javascript',
    image:
      'https://cdn.eva.vn/upload/3-2021/images/2021-08-06/tu-lanh-con-qua-ca-tim-dem-nhoi-thit-roi-sot-dau-hao-the-nay-ai-cung-an-het-sach-batch_37ecd6edf39e46babf5b68ff14b26320-1628201506-860-width700height466.jpg',
    avatar:
      'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/83971520_172220777472510_677474599239155712_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=e3f864&_nc_ohc=6pNIGj9lMZUAX9YWsWU&_nc_ht=scontent.fhan14-2.fna&oh=b13f1f1b52e341f536a0e7cb8ecb86c2&oe=6185D685',
    comments: 64,
    retweets: 87,
    hearts: 400,
  },
  {
    id: 3,
    name: 'Elvin',
    handle: '@elvin_not_11',
    date: '14h ago',
    content:
      'Hid the home indicator from the app so the device resembles an actual iPod even more. Thanks @flipeesposito for the suggestion!',
    image:
      'https://static.antyweb.pl/uploads/2014/09/IPod_classic_6G_80GB_packaging-2007-09-22-1420x670.jpg',
    avatar:
      'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
    comments: 23,
    retweets: 21,
    hearts: 300,
  },
  {
    id: 4,
    name: ' Josh',
    handle: '@JoshWComeau',
    date: '10h ago',
    content:
      'Automatically use "smart" directional curly quotes with the `quotes` CSS property! Even handles nested quotes with the <q> tag :o',
    image: 'https://pbs.twimg.com/media/EOUrCOcWAAA71rA?format=png&name=small',
    avatar:
      'https://pbs.twimg.com/profile_images/1242807739681845248/HeUb7BAt_400x400.jpg',
    comments: 12,
    retweets: 36,
    hearts: 175,
  },
  {
    id: 5,
    name: 'Satyajit Sahoo',
    handle: '@satya164',
    date: '20h ago',
    content:
      'Not sure if I should be proud or ashamed of this piece of art 😅\n\n#Typescript',
    image: 'https://pbs.twimg.com/media/EONH4KWX4AEV-JP?format=jpg&name=medium',
    avatar:
      'https://pbs.twimg.com/profile_images/1203032057875771393/x0nVAZPL_400x400.jpg',
    comments: 64,
    retweets: 87,
    hearts: 400,
  },
  {
    id: 6,
    name: 'Elvin',
    handle: '@elvin_not_11',
    date: '14h ago',
    content:
      'Hid the home indicator from the app so the device resembles an actual iPod even more. Thanks @flipeesposito for the suggestion!',
    image:
      'https://static.antyweb.pl/uploads/2014/09/IPod_classic_6G_80GB_packaging-2007-09-22-1420x670.jpg',
    avatar:
      'https://pbs.twimg.com/profile_images/1274435026482937858/JZmznbJO_400x400.jpg',
    comments: 23,
    retweets: 21,
    hearts: 300,
  },
];
