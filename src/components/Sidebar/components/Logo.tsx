import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { HSeparator } from '@/components/Separator';

export const SidebarBrand = () => {
	const logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text w='175px' my='32px' fontSize={'2rem'} fontWeight={600} color={logoColor}>Crypto Dashboard</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
