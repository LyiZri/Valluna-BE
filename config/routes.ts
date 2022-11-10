import { IRoute } from 'umi';
export default <IRoute[]>[
  {
    path: '/',
    redirect: '/account',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        // wrappers: ['@/wrappers/loginAuth'],
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
        // wrappers: ['@/wrappers/loginAuth'],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    name: ' Account',
    exact: false,
    // component: './Account',
    routes: [
      {
        path: '/account',
        redirect: '/account/user-access-controls',
        wrappers: ['@/wrappers/defaultAuth'],
      },
      {
        path: '/account/user-access-controls',
        name: 'User Access Controls',
        exact: false,
        component: '@/pages/Accounts/UserAccessControls',
        wrappers: ['@/wrappers/defaultAuth'],
      },
      {
        path: '/account/role-form',
        component: './Accounts/UserAccessControls/roleForm',
      },
    ],
  },
  {
    path: '/homepage',
    name: 'Homepage',
    routes: [
      {
        path: '/homepage/homepage-banners',
        name: 'Homepage Banners',
        component: './Homepage/HomepageBanners',
      },
      // {
      //   path: '/homepage/featured-articles',
      //   name: 'Featured Articles',
      //   component: './Homepage/FeaturedArticles',
      // },
      // {
      //   path: '/homepage/featured-games',
      //   name: 'Featured Games',
      //   component: './Homepage/FeaturedGames',
      // },
      {
        path: '/homepage/banner-form',
        component: './Homepage/HomepageBanners/bannerForm',
      },
    ],
  },
  {
    path: '/games-listings',
    name: 'Games Listings',
    routes: [
      {
        path: '/games-listings/overview',
        name: 'Overview',
        component: './GamesListings/Overview',
      },
      {
        path: '/games-listings/game-listings-form',
        component: './GamesListings/Overview/gameListingForm',
      },
      {
        path: '/games-listings/blockchain',
        name: 'BlockChain',
        component: './GamesListings/BlockChain',
      },
      {
        path: '/games-listings/categories',
        name: 'Categories',
        component: './GamesListings/Categories',
      },
    ],
  },
  {
    path: '/articels',
    name: 'Articles',
    routes: [
      {
        path: '/articels/overview',
        component: './Articles',
        name: 'OverView',
      },
      {
        path: '/articels/airticle-form',
        component: './Articles/AirticleForm',
      },
    ],
  },
  {
    path: '/',
    redirect: '/account',
  },
  {
    component: './404',
  },
];
