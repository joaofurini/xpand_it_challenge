import { Text, Button, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function MoviesFilter({ yearsList, onFiltersApplied, onResetFilters }) {

    const [selectedFilter, setSelectedFilter] = useState(0)

    return (
        <HStack mb={'20px'}>
            <Button
                backgroundColor={selectedFilter == 1 ? '#00BAFF' : 'transparent'}

                color={'black'}
                onClick={() => {
                    setSelectedFilter(1)
                    onFiltersApplied('top_revenue', "")

                }} fontWeight={'normal'} border='1px' borderColor='gray.200' borderRadius={20} height={'30px'}>
                <Text color={selectedFilter == 1 ? 'white' : 'gray'}>Top 10 Revenue</Text>
            </Button>
            <Select
                color={selectedFilter == 2 ? 'white' : 'gray'}
                backgroundColor={selectedFilter == 2 ? '#00BAFF' : 'transparent'}

                maxWidth={200}
                onChange={(event) => {
                    setSelectedFilter(2)
                    onFiltersApplied("revenue_by_year", event.target.value)
                }} fontWeight={'normal'} border='1px' borderColor='gray.200' borderRadius={20} height={'30px'}>
                <option style={{ color: 'gray' }} value="">Revenue by year</option>
                {yearsList.map(item => {
                    return <option key={item} style={{ color: 'gray' }} value={item}>{item}</option>
                })}
            </Select>
            <Button backgroundImage={'/images/reset_filters_icon.png'}
                backgroundRepeat={'no-repeat'}
                backgroundColor={'transparent'} backgroundPosition={'center'}
                _hover={{ backgroundColor: 'trasparent', }}
                _focus={{ border: 'none' }}
                onClick={() => {
                    setSelectedFilter(0)
                    onResetFilters()


                }} />
        </HStack>



    )
}
