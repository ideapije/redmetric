import React, { useEffect, useRef, useState } from 'react';
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
  Icon,
  Radio,
  FormHelperText,
  Heading
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EmailIcon,
  CheckIcon
} from '@chakra-ui/icons';
import ValidationErrors from '@/Components/ValidationErrors';
import Step from '@/Components/Step';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { MdSend, MdAttachFile } from 'react-icons/md';
import { Input } from '@chakra-ui/input';
import { RadioGroup } from '@headlessui/react';
import RadioScore from '@/Components/RadioScore';

export default function JudgingForm(props) {
  const { steps, submission, village } = props;
  const { data, setData, post, put, processing, errors } = useForm({});
  const [page, setPage] = useState(1);
  const [tabs, setTabs] = useState(steps);
  const [inputs, setInputs] = useState(null);

  const submitRef = useRef(null);
  const publishRef = useRef(null);
  const lastKey = parseInt(Object.keys(data).pop(), 10);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnChangePage = (pg) => {
    const modifiedTabs = tabs.map((tab) => ({
      ...tab,
      active: (tab.id === pg)
    }))
    setTabs(modifiedTabs);
    setPage(pg);
    setInputs(data[pg]);
  }
  const handleOnClickSave = () => {
    submitRef.current.click();
  }
  const handleOnClickPublish = () => {
    publishRef.current.click();
  }
  const handleOnClickScore = (id, value) => {
    const obj = {}
    Object.keys(data).forEach((k) => {
      let values = data[k]
      if (parseInt(k, 10) === page) {
        values = values?.map(v => {
          if (v.id === id) {
            return ({
              ...v,
              jury_values: {
                ...v.jury_values,
                point: value
              }
            })
          }
          return v;
        });
      }
      obj[k] = values;
    });
    setData(obj);
  }
  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.jury.judging.store', submission));
  }
  useEffect(() => {
    setData(props.indicators);
    setInputs(props.indicators[page]);
  }, []);

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
          <form onSubmit={submit}>
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <VStack align="self-start" justifyContent="center" spacing={10}>
                {inputs && inputs.map((input, ix) => (
                  <HStack spacing={10} key={input.id}>
                    <FormControl>
                      <HStack spacing={10}>
                        <Heading size="md">{input.code}</Heading>
                        <Text fontWeight={600} color={'orange.500'}>({input.pivot.result > 100 ? input.pivot.result : `${input.pivot.result} %`})</Text>
                      </HStack>
                      <FormLabel htmlFor={`score${input.id}`}>
                        <ol>
                          {input.inputs.map((i, ix) => (
                            <li key={i.id}>
                              {ix + 1}. {i.label}
                            </li>
                          ))}
                        </ol>
                      </FormLabel>
                      <Stack direction="row">
                        {Array.from(({ length: 5 }), (x, option) => (
                          <React.Fragment key={option}>
                            <input
                              type="radio"
                              value={option + 1}
                              name={`points[${input.id}]`}
                              onClick={() => handleOnClickScore(input.id, option + 1)}
                              defaultChecked={(input.jury_values?.point === option + 1)}
                            />
                            <Text>
                              {option + 1}
                            </Text>
                          </React.Fragment>
                        ))}
                      </Stack>
                      {input.description.length > 1 && <FormHelperText>{input.description}</FormHelperText>}
                    </FormControl>
                  </HStack>
                ))}
              </VStack>
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
                    {(lastKey === page) && (
                      <Button type="submit" rightIcon={<MdSend />} colorScheme='red' variant='solid'>
                        Submit
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
          </form>
        </div>
      </div>
    </Authenticated>
  );
}
