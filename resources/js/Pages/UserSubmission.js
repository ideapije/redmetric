import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"
import { VStack, Container, Divider, Box, Badge } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import moment from 'moment';
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function UserSubmission(props) {
    const { todos } = props;
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.title || ''}</h2>}
        >
            <Head title={props.title || ''} />
            <VStack>
                <Divider />
                <Container maxW="container.xl" bg="white">
                    <Box m={[2, 3]} overflowX="scroll">
                        <Table variant="striped" colorScheme="gray" mt="50">
                            <TableCaption>All Submission</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th isNumeric>#</Th>
                                    <Th>Joined at</Th>
                                    <Th>Period</Th>
                                    <Th isNumeric>Rangking</Th>
                                    <Th>Status</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            
                            <Tfoot>
                                <Tr>
                                    <Th isNumeric>#</Th>
                                    <Th>Joined at</Th>
                                    <Th>Period</Th>
                                    <Th isNumeric>Rangking</Th>
                                    <Th>Status</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </Box>
                </Container>
            </VStack>
        </Authenticated>
    );
}
