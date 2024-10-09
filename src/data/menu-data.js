import home_1 from '@assets/img/menu/menu-home-1.jpg';
import home_2 from '@assets/img/menu/menu-home-2.jpg';
import home_3 from '@assets/img/menu/menu-home-3.jpg';
import home_4 from '@assets/img/menu/menu-home-4.jpg';

const menu_data = [
  {
    id: 1,
    single_link: true,
    homes: true,
    title: 'Home',
    link: '/',
  
  },
  {
    id: 2,
    single_link: true,
    products: true,
    title: 'Products',
    link: '/shop',
   
  },
 
  {
    id: 4,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
   
  },
  {
    id: 6,
    single_link: true,
    title: 'About Us',
    link: '/aboutus',
  },
  {
    id: 7,
    single_link: true,
    title: 'Contact Us',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    single_link: true,
    homes: true,
    title: 'Home',
    link: '/',
  
  },
  {
    id: 2,
    single_link: true,
    sub_menu: true,
    title: 'Products',
    link: '/shop',
   
  },
  {
    id: 3,
    sub_menu: true,
    title: 'eCommerce',
    sub_menus: [
      { title: 'Shopping Cart', link: '/cart' },
      { title: 'Checkout', link: '/checkout' },
      { title: 'My account', link: '/profile' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'Setting',
    sub_menus: [
      { title: 'Login', link: '/login' },
      { title: 'Register', link: '/register' },
      { title: 'Forgot Password', link: '/forgot' },
      { title: 'Change Password', link: '/profile' },
     
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'Legal',
    sub_menus: [
      { title: 'Terms and Conditions', link: 'termsandconditions' },
      { title: 'Privacy Policy', link: '/privacypolicy' },
      { title: 'Refund Policy', link: '/refundpolicy' },
      { title: 'Shipping Policy', link: '/shippingpolicy' },
     
    ],
  },
  {
    id: 4,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
   
  },
  {
    id: 6,
    single_link: true,
    title: 'About Us',
    link: '/aboutus',
  },
  {
    id: 7,
    single_link: true,
    title: 'Contact Us',
    link: '/contact',
  },
]