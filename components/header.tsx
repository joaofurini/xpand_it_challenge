import { Box, Image, Text } from "@chakra-ui/react";

export default function AppHeader() {
    return (

        <Box
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            h={'50px'}
            bgColor={'#012433'}
            w={'100%'}
        >
            <Image alt="xpand-it-logo " src="https://www.xpand-it.com/wp-content/uploads/2022/01/DNA2022_LP_logoXpand.png" ml={20} w={'100px'} />
        </Box>

    )
}
