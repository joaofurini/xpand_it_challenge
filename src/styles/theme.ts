import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {

        body: 'Roboto',
        heading: 'Roboto',
    },
    styles: {
        global: {
            body: {
                bg: "#FFFFFF",
                color: '#536B7A'
            }
        }
    }
})