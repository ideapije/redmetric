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
                                    <Th>Period</Th>
                                    <Th>Submitted at</Th>
                                    <Th>Ward Name</Th>
                                    <Th isNumeric>Points</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {todos?.map((todo, tx) => (
                                    <Tr key={tx}>
                                        <Td isNumeric>{tx + 1}</Td>
                                        <Td>
                                            {moment(todo?.period?.opened, "YYYY-MM-DD").format("DD-MMM-YYYY")}
                                            &nbsp;&rarr;&nbsp;
                                            {moment(todo?.period?.closed, "YYYY-MM-DD").format("DD-MMM-YYYY")}
                                        </Td>
                                        <Td>{moment(todo?.updated_at, "YYYY-MM-DD").format("DD-MM-YYYY")}</Td>
                                        <Td>{todo?.user?.village?.name}</Td>
                                        <Td isNumeric>{todo?.total_points}</Td>
                                        <Td>
                                            <Link href={route('dashboard.jury.show', todo.id)}>
                                                <Button variant="link">
                                                    Review
                                                </Button>
                                            </Link>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th isNumeric>#</Th>
                                    <Th>Period</Th>
                                    <Th>Submitted at</Th>
                                    <Th>Ward Name</Th>
                                    <Th isNumeric>Points</Th>
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
