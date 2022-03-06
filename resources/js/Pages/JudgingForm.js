import React, { useRef, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button } from '@chakra-ui/button';
import { Box, Grid, GridItem, HStack, VStack, Wrap } from '@chakra-ui/layout';
import {
  Flex,
  Spacer,
  Stack,
  Divider,
  InputGroup,
  InputAddon,
  InputRightAddon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link as BtnLink,
  Icon
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EmailIcon,
  CheckIcon
} from '@chakra-ui/icons';
import ValidationErrors from '@/Components/ValidationErrors';
import Step from '@/Components/Step';
import { FormControl } from '@chakra-ui/form-control';
import { MdSend, MdAttachFile } from 'react-icons/md'
import { Input } from '@chakra-ui/input';

export default function JudgingForm(props) {
  const { questions, period, steps, village } = props;
  const [page, setPage] = useState(1);
  const [tabs, setTabs] = useState(steps)

  const submitRef = useRef(null)
  const publishRef = useRef(null)
  const inputs = questions[page];
  const lastKey = parseInt(Object.keys(questions).pop(), 10);

  const { data, setData, post, put, processing, errors } = useForm(questions);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnChangePage = (page) => {
    const modifiedTabs = tabs.map((tab) => ({
      ...tab,
      active: (tab.id === page)
    }))
    setTabs(modifiedTabs);
    setPage(page);
  }

  const onHandleChange = (event) => {
    if (event.hasOwnProperty('target')) {
      const index = parseInt(event.target.id)
      const obj = {}
      Object.keys(data).forEach((k) => {
        let values = data[k]
        if (parseInt(k, 10) === page) {
          values = values?.map((v, vx) => ({
            ...v,
            value: (vx === index && event.target.name === 'value') ? event.target.value : v.value,
            evidence: (vx === index && event.target.name === 'evidence') ? event.target.files[0] : null
          }));
        }
        obj[k] = values;
      })
      setData(obj);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.user.submission.store', period));
  }
  const submitPublish = (e) => {
    e.preventDefault();
    put(route('dashboard.user.submission.publish', period));
  }
  const handleOnClickSave = () => {
    submitRef.current.click();
  }
  const handleOnClickPublish = () => {
    publishRef.current.click();
  }
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Judment Submission {village?.name}</h2>}
    >
      <Head title="Submission Form" />
      <Step items={tabs} />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
      <div className="container mx-auto my-5 p-5">

        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <form onSubmit={submit} encType="multipart/form-data" method="post">
              <input type="hidden" name="_token" value={props.csrf_token} />
              <ValidationErrors errors={errors} />
              <VStack spacing={10}>
                {inputs && inputs?.map((input, ix) => (
                  <VStack w="full" spacing={3} alignItems="flex-start" key={input.id}>
                    <HStack spacing={5}>
                      <strong>{input?.indicator?.code}</strong>
                      <Text>{input.label}</Text>
                    </HStack>
                    <HStack spacing={5} alignItems="self-start">
                      <strong>Result</strong>
                      <Text>{`${data[page][ix]?.result} %`}</Text>
                      <Text>{data[page][ix]?.value}</Text>
                    </HStack>
                    <Divider orientation="horizontal" />
                  </VStack>
                ))}
              </VStack>
              <button type="submit" style={{ opacity: 0 }} ref={submitRef}></button>
            </form>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Flex>
              <Box p='4'>
                <Button
                  variant="ghost"
                  disabled={page === 1}
                  leftIcon={<ArrowLeftIcon />}
                  onClick={() => handleOnChangePage(page - 1)}>
                  Previous
                </Button>
              </Box>
              <Spacer />
              <Box p='4'>
                <Stack direction='row' spacing={6}>
                  <Button onClick={handleOnClickSave} leftIcon={<CheckIcon />} colorScheme="blue" variant='outline'>
                    Save
                  </Button>
                  {(lastKey === page) && (
                    <Button onClick={onOpen} rightIcon={<MdSend />} colorScheme='red' variant='solid'>
                      Publish
                    </Button>
                  )}
                  <Button
                    disabled={(lastKey === page)}
                    variant="ghost"
                    rightIcon={<ArrowRightIcon />}
                    onClick={() => handleOnChangePage(page + 1)}>
                    Next
                  </Button>
                </Stack>
              </Box>
            </Flex>
          </div>
        </div>
        <form onSubmit={submitPublish} method="post">
          <input type="hidden" name="_token" value={props.csrf_token} />
          <input type="hidden" name="period" value={period.id || 0} />
          <button type="submit" style={{ opacity: 0 }} ref={publishRef}></button>
        </form>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Publish Red Metric</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize='xl'>Apakah Anda yakin?</Text>
              <Text fontSize='lg'>
                Data yang terkirim tidak dapat di edit setelah <b>Publish Red Metric</b>
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button rightIcon={<MdSend />} colorScheme='red' variant='solid' onClick={handleOnClickPublish}>
                Publish
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Authenticated>
  );
}