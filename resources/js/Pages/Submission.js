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

export default function Submission(props) {
    const { submissions } = props;
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Submission</h2>}
        >
            <Head title="Submission" />
            <VStack>
                <Divider />
                <Container maxW="container.xl" bg="white">
                    <Box m={[2, 3]} overflowX="scroll">
                        <Table variant="striped" colorScheme="gray" mt="50">
                            <TableCaption>All Submission Periods</TableCaption>
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
                            <Tbody>
                                {submissions?.map((s, index) => (
                                    <Tr key={index}>
                                        <Td isNumeric>{index + 1}</Td>
                                        <Td>{moment(s.created_at, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY HH:mm:ss")}</Td>
                                        <Td>

                                            {moment(s?.period?.opened, "YYYY-MM-DD").format("DD-MMM-YYYY")}
                                            &nbsp;&rarr;&nbsp;
                                            {moment(s?.period?.closed, "YYYY-MM-DD").format("DD-MMM-YYYY")}

                                        </Td>
                                        <Td isNumeric>{s.ranking}</Td>
                                        <Td>
                                            <Badge variant="subtle" colorScheme={s?.status?.color}>
                                                {s?.status?.text}
                                            </Badge>
                                        </Td>
                                        <Td>
                                            <Link href={route('dashboard.user.submission.form', s.period.id)}>
                                                <Button rightIcon={<ArrowForwardIcon />} size="sm" colorScheme="teal" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
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
