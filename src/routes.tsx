import { Icon } from '@chakra-ui/react';
import { FaHome, FaQuestionCircle } from 'react-icons/fa';

import Dashboard from "@/views/dashboard";
import CoinDetails from './views/coinDetails';

const routes = [
	{
		name: 'Crypto Assets',
		layout: '/',
		path: '/crypto-assets',
		icon: <Icon as={FaHome} width='24px' height='24px' color='inherit' />,
		component: Dashboard
	},
    {
		name: 'Questions',
		layout: '/',
		path: '/faq',
		icon: <Icon as={FaQuestionCircle} width='24px' height='24px' color='inherit' />,
		component: Dashboard
	},
	{
		name: 'CoinDetails',
		layout: '/',
		path: '/details',
		icon: <Icon as={FaQuestionCircle} width='24px' height='24px' color='inherit' />,
		component: CoinDetails
	},
];

export default routes;
