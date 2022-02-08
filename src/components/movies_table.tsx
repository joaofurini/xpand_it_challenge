import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Select,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { clearLine } from "readline";
import { EyeIcon } from "../styles/icons.chakra";
import MoviesModal from "./movies_modal";

export default function MoviesTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI

    const tableColumns = useMemo(() => columns, [columns]);
    const tableData = React.useMemo(() => Object.values(data), [data]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [selectedMovieId, setSelectedMovieId] = useState()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: tableColumns,
            data: tableData,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    function renderCell(cell, key) {

        switch (cell.column.id) {
            case "ranking":
            case "title":
                return <Td key={key} width={'500px'} alignSelf={'flex-start'} {...cell.getCellProps()} color="primary">
                    {cell.render("Cell")}
                </Td>;
            case "year":
            case "revenue":
            default:
                return <Td key={key} {...cell.getCellProps()} color="primary">
                    {cell.render("Cell")}
                </Td>;

        }
    }
    const openModal = async () => {
        setIsModalOpen(true)

    }
    // Render the UI for your table
    return (
        <>
            <Stack direction="column" w="full">
                <MoviesModal isOpen={isOpen} onClose={onClose} movieId={selectedMovieId} ></MoviesModal>

                <Table {...getTableProps()}>
                    {/* Table Header */}
                    <Thead>
                        {headerGroups.map((headerGroup, index) => (
                            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                {[
                                    ...headerGroup.headers.map((column, i) => (
                                        <Th
                                            key={i}
                                            {...column.getHeaderProps()}
                                            color="primary"
                                            opacity="50%"
                                        >
                                            {column.render("Header")}
                                        </Th>
                                    )),
                                    <Th>{/* For edit Icon */}</Th>,
                                ]}
                            </Tr>
                        ))}
                    </Thead>

                    {/* Table Data */}
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);



                            return (

                                <Tr key={index} _hover={{ bg: "hoverGray" }} {...row.getRowProps()}>
                                    {[
                                        ...row.cells.map((cell, i) => renderCell(cell, i)),
                                        <Td>

                                            <Button
                                                size="sm"
                                                background="white"
                                                borderRadius="full"
                                                onClick={() => {
                                                    setSelectedMovieId(row.original.id)
                                                    onOpen()
                                                }}
                                                _focus={{ border: "none" }}
                                            >
                                                <EyeIcon />
                                            </Button>

                                        </Td>,
                                    ]}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>

                {/* Pagination */}
                <Flex opacity="50%" justifyContent="end" m={4} alignItems="center">
                    {/* Pagination Info */}
                    <Stack color="primary" alignItems="center" direction="row" mr="5">
                        <Text>Resultados por página</Text>
                        <Select
                            w={20}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </Select>
                        <Text fontWeight="bold">
                            {pageSize * (pageIndex + 1) - pageSize + 1}
                        </Text>
                        <Text fontWeight="bold"> - </Text>
                        <Text fontWeight="bold">
                            {" "}
                            {(pageIndex + 1) * pageSize > data.length
                                ? data.length
                                : (pageIndex + 1) * pageSize}
                        </Text>
                        <Text>de</Text>
                        <Text fontWeight="bold">{data.length}</Text>
                    </Stack>

                    {/* Pagination Buttons */}
                    <Flex>
                        <Tooltip label="First Page">
                            <Button
                                onClick={() => gotoPage(0)}

                                isDisabled={!canPreviousPage}
                                mr={2}
                            >
                                <ArrowLeftIcon h={3} w={3} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Previous Page">
                            <Button onClick={previousPage} isDisabled={!canPreviousPage}>
                                <ChevronLeftIcon h={6} w={6} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Next Page">
                            <Button onClick={nextPage} isDisabled={!canNextPage}>
                                <ChevronRightIcon h={6} w={6} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Last Page">
                            <Button
                                onClick={() => gotoPage(pageCount - 1)}
                                isDisabled={!canNextPage}
                                ml={2}
                            >
                                <ArrowRightIcon h={3} w={3} />
                            </Button>
                        </Tooltip>
                    </Flex>
                </Flex>
            </Stack>
        </>
    );
}
