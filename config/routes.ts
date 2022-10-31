export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    name: ' Account',
    // component: './Account',
    routes: [
      {
        path: '/account/all-accounts',
        name: 'All Accounts',
        component: './Accounts/AllAccounts',
      },
      {
        path: '/account/user-access-controls',
        name: 'User Access Controls',
        component: './Accounts/UserAccessControls',
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
      {
        path: '/homepage/featured-articles',
        name: 'Featured Articles',
        component: './Homepage/FeaturedArticles',
      },
      {
        path: '/homepage/featured-games',
        name: 'Featured Games',
        component: './Homepage/FeaturedGames',
      },
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
        name: 'Articels',
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
