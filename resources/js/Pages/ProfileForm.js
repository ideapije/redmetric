import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Uploader from '@/Components/Uploader';
import moment from 'moment'
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import UserCard from '@/Components/UserCard';
import ReactDatePicker from 'react-datepicker';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputRightAddon,
    VStack,
    Heading,
    Text,
    Textarea,
    SimpleGrid,
    GridItem,
    Select,
    Checkbox,
    Button,
    Box,
} from '@chakra-ui/react';

export default function ProfileForm(props) {
    const { membership, village, provinces } = props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: village?.name || '',
        since: village?.since ? new Date(village.since) : null,
        address: village?.address || '',
        website: village?.website || '',
        province: village?.province || '',
        head: village?.head || '',
        secretary: village?.secretary || '',
        amount_male: village?.amount_male || '',
        amount_female: village?.amount_female || '',
        amount_productive_age: village?.amount_productive_age || '',
        area: village?.area || '',
        address_longitude: village?.address_longitude || '',
        address_latitude: village?.address_latitude || ''
    });

    const handleOnChange = (event) => {
        if (event.hasOwnProperty('target')) {
            setData(event.target.name, event.target.value);
        } else {
            setData('since', event)
        }
    };

    const submit = (e) => {
        e.preventDefault();
        village?.id ? put(route('dashboard.profile.update', village.id)) : post(route('dashboard.profile.store'));
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Profile</h2>}
        >
            <Head title="Profile Form" />
            <ValidationErrors errors={errors} />
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <UserCard {...{ membership, ...props }} />
                    </div>

                    <div className="w-full md:w-9/12 mx-2 h-64 bg-white p-3 border-t-4 h-full">
                        <form onSubmit={submit}>
                            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                                    <GridItem colSpan={1}>
                                        <FormControl isRequired>
                                            <FormLabel>Nama Desa / Kelurahan</FormLabel>
                                            <Input name="name" value={data.name} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <FormLabel>Tanggal Berdiri</FormLabel>
                                            <ReactDatePicker dateFormat="dd-MM-yyyy" name="since" selected={data.since} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <FormLabel>Kepala Desa / Lurah</FormLabel>
                                            <Input name="head" value={data.name} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <FormLabel>Sekretaris Desa / Lurah</FormLabel>
                                            <Input name="secretary" value={data.secretary} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Website</FormLabel>
                                            <Input name="website" value={data.website} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Alamat Kelurahan</FormLabel>
                                            <Textarea name="address" value={data.address} onChange={handleOnChange} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl isRequired>
                                            <FormLabel>Luas Wilayah</FormLabel>
                                            <InputGroup>
                                                <Input type='number' name="area" value={data.area} onChange={handleOnChange} />
                                                <InputRightAddon children='km²' />
                                            </InputGroup>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <FormLabel>Provinsi</FormLabel>
                                            <Select defaultValue={data.province} name="province" onChange={handleOnChange}>
                                                {provinces?.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <SimpleGrid columns={3} columnGap={4}>
                                            <GridItem colSpan={1}>
                                                <FormControl isRequired>
                                                    <FormLabel>Jumlah Laki-laki</FormLabel>
                                                    <Input type="number" name="amount_male" value={data.amount_male} onChange={handleOnChange} />
                                                </FormControl>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <FormControl isRequired>
                                                    <FormLabel>Jumlah Perempuan</FormLabel>
                                                    <Input type="number" name="amount_female" value={data.amount_female} onChange={handleOnChange} />
                                                </FormControl>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <FormControl isRequired>
                                                    <FormLabel>Jumlah Usia Produktif</FormLabel>
                                                    <Input type="number" name="amount_productive_age" value={data.amount_productive_age} onChange={handleOnChange} />
                                                    <FormHelperText>Usia 15 - 60 Th</FormHelperText>
                                                </FormControl>
                                            </GridItem>
                                        </SimpleGrid>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Button type="submit" size="lg" w="full" disabled={processing}>
                                            Simpan
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            </VStack>
                        </form>
                    </div>
                </div>
            </div>
            
        </Authenticated>
    );
}
