import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import faker from "@faker-js/faker";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AppHeader from "../components/header";
import MoviesFilter from "../components/movies_filter";
import MoviesTable from "../components/movies_table";
import { Movie } from "../interfaces/movie";
import api from "../utils/api";




const columns = [
  {
    Header: "Ranking",
    accessor: "rank",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Revenue",
    accessor: "revenue",
  },
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {

    const response = await api.get("/movies");

    console.log(response)

    let moviesList: Array<Movie> = response.data.content
    // moviesList = moviesList.sort((a, b) => b.revenue - a.revenue)

    const yearsList = [...new Set(moviesList.map((item) => item.year))];


    return {
      props: {
        data: moviesList,
        yearsList
      },
    };

  } catch (error) {
    console.log(error);

  }
};




export default function Home({ data, yearsList }) {


  const [tableData, setTableData] = useState<Array<Movie>>(data);
  const [filteredData, setFilteredData] = useState(data)

  function resetFilters() {

    let tempData = data
    tempData = tempData.sort((a, b) => a.rank - b.rank)

    setTableData(tempData)
  }

  function applyFilters({ type, value }) {

    switch (type) {
      case 'revenue_by_year':
        let revenueByYearData = data
        let filteredData = revenueByYearData.filter(item => item.year == value)
        filteredData = filteredData.sort((a, b) => b.revenue - a.revenue)
        filteredData = filteredData.slice(0, 10)
        setTableData(filteredData)
        break;
      case 'top_revenue':
        let topRevenueData = data
        filteredData = topRevenueData.sort((a, b) => b.revenue - a.revenue)
        filteredData = filteredData.slice(0, 10)
        setTableData(filteredData)
        break
      default:
        break;
    }

  }

  return (
    <VStack display={'flex'} alignContent={'start'} justifyContent={'start'} >

      <AppHeader />
      <Box pl={'10%'} pr={'10%'} width={'100%'} >
        <Text fontSize={'24px'} mt={'20px'} mb={'20px'}  >Movie Ranking</Text>
        <MoviesFilter
          onResetFilters={resetFilters}
          onFiltersApplied={(type, value) => {
            applyFilters({ type, value })
          }} yearsList={yearsList} />
        <MoviesTable columns={columns} data={tableData} />
      </Box>
    </VStack>
  )
}
