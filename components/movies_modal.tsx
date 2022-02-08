import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../interfaces/movie";
import { MovieDetailed } from "../interfaces/movie_detailed";
import { EyeIcon } from "../styles/icons.chakra";
import api from "../utils/api";


interface MovieModalProps {

    movieId?: Function
    isOpen: boolean
    onClose: Function
}

export default function MoviesModal({ movieId, isOpen, onClose }: MovieModalProps) {

    const [isNoteFormHidden, setIsNoteFormHidden] = useState("none");
    const [movie, setMovie] = useState<MovieDetailed>()
    const [isLoading, setIsLoading] = useState(true)
    const newNote = useRef();


    async function getMovieById() {

        console.log(movieId)

        if (movieId != undefined) {

            const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`)

            setMovie(response.data)

            setIsLoading(false)

            console.log(response)
        }



    }



    useEffect(() => {
        getMovieById()


    }, [movieId])
    return (
        <>
            <Modal
                size="4xl"
                isOpen={isOpen}
                onClose={() => {
                    setIsLoading(true)
                    setMovie(undefined)
                    setIsNoteFormHidden("none");
                    onClose();
                }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        w="full"
                        fontSize="4xl"
                        fontWeight="normal"
                        color="secondaryBlue"
                    >
                        {movie?.title ?? ""}
                    </ModalHeader>


                    {isLoading ? <Box></Box> : <HStack >

                        <ModalCloseButton
                            p={4}
                            color="primary"
                            size="lg"
                            _focus={{ border: "none" }}
                        />
                        <Box width={100} height={1} backgroundColor={'#21B3CF'} opacity={0.5}></Box>
                    </HStack>}

                    <ModalBody p={0}>

                        {
                            isLoading ? <Box height={650} display={'flex'} justifyContent={'center'} alignItems={'center'} >

                                <Spinner />
                            </Box> : <Flex>
                                <HStack w="full" spacing={8}>
                                    {/* Left side - No scroll */}
                                    <Stack spacing={8} h="full" pl={16} pt={8}>

                                    </Stack>
                                    {/* Right side - With scroll*/}
                                    <Stack
                                        spacing={12}
                                        pr={8}


                                        w="full"
                                        h="xl"
                                        marginRight="0px"
                                        overflowY="scroll"
                                    >
                                        {/* Description */}



                                        <Box>
                                            <Text color="primary" opacity={0.6} mt={10}>
                                                Year
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.year ?? ""}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Description
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.description ?? ""}
                                            </Text>
                                        </Box>
                                        <HStack width={'60%'} display={'flex'} justifyContent={'space-between'} alignItems={'start'}>


                                            <Box>
                                                <Text color="primary" opacity={0.6} >
                                                    Director
                                                </Text>
                                                <Text color="#00BAFF" fontWeight={'bold'} wordBreak="break-word">
                                                    {movie?.director ?? ""}
                                                </Text>
                                            </Box>

                                            <Box>
                                                <Text color="primary" opacity={0.6} >
                                                    Actors
                                                </Text>

                                                <Text color="#00BAFF" fontWeight={'bold'} wordBreak="break-word">{movie.actors}</Text>

                                            </Box>

                                        </HStack>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Runtime
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.runtime ?? ""}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Rating
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.rating ?? ""}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Votes
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.votes ?? ""}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Revenue
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.revenue ?? ""}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text color="primary" opacity={0.6} >
                                                Metascore
                                            </Text>
                                            <Text color="primary" fontWeight={'bold'} wordBreak="break-word">
                                                {movie?.metascore ?? ""}
                                            </Text>
                                        </Box>

                                        {/* Notes */}

                                    </Stack>
                                </HStack>
                            </Flex>

                        }

                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    );
}
